import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'console';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/services/admin-service';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

categories: any[]=[]
editCategoryId: string | null=null;
modalRef!: BsModalRef;




addCategoryForm= this.fb.group({
  categoryName:['',Validators.required],
  categoryDescription:['',Validators.required],
  categoryImage:['',Validators.required]}
)
editCategoryForm=this.fb.group({
categoryName:['',Validators.required],
  categoryDescription:['',Validators.required],
  categoryImage:['',Validators.required]

})

  constructor(private fb:FormBuilder, private dataService:DataService, private modalService: BsModalService,private router: Router, private adminService: AdminService ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories():void{
    this.dataService. getCategories().subscribe({
      next: (response:any)=>{
        this.categories = response.categories;
        console.log(response);
        
      },
      error:(error)=>{
        console.error('Failed to load categories:', error);
      }
    })

  }

  handleEditCategory(category:any, template:TemplateRef<any>,event:any):void{
    event.stopPropagation();
    console.log('edited category',category);
    this.editCategoryId=category._id;
this.editCategoryForm.patchValue({
  categoryName: category.categoryName,
      categoryDescription: category.Description,
      categoryImage: category.ImageURL
    });
    this.modalRef=this.modalService.show(template,{
  class:'modal-lg modal-dialog-centered',
      backdrop: 'static',
      keyboard: false
})
  }

  onSubmit(){
   if (this.addCategoryForm.valid) {
      const { categoryName, categoryDescription, categoryImage } = this.addCategoryForm.value;

      this.dataService.addCategory(categoryName, categoryDescription, categoryImage).subscribe({
        next: (response : any) => {
          console.log('Category added successfully:', response);
          this.loadCategories();
          this.addCategoryForm.reset();
        },
        error: (error) => {
          console.error('Failed to add category:', error);
        }
      });

    }
}

  onEditSubmit():void{
  console.log('edit form submitted');
  if (this.editCategoryForm.valid) {
      const { categoryName, categoryDescription, categoryImage } = this.editCategoryForm.value;

      if (this.editCategoryId) {
        this.dataService.editCategory(this.editCategoryId, categoryName, categoryDescription, categoryImage).subscribe({
          next: (response : any) => {
            console.log('Category updated successfully:', response);
            this.loadCategories();
            this.editCategoryForm.reset();
            this.modalRef?.hide();
          },
          error: (error) => {
            console.error('Failed to update category:', error);
          }
        });
      }
    }
}

  handleNavigateToProductList(category: any): void {
    console.log('Navigating to product list for category ID:', category._id);
    this.adminService.selectedCategory = category;
    this.router.navigate(['/admin','add-product', category._id]);
  }




}
