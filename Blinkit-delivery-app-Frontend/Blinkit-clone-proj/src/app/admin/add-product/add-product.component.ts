import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { BsModalService,BsModalRef } from 'ngx-bootstrap/modal';
import { AdminService } from 'src/app/services/admin-service';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
addProductForm= this.fb.group({
  productName:['',[Validators.required]],
  productDescription:['',[Validators.required]],
  productImage:['',[Validators.required]],
  productPrice:['',[Validators.required]]
})

editProductForm= this.fb.group({
  productName:['',[Validators.required]],
  productDescription:['',[Validators.required]],
  productImage:['',[Validators.required]],
  productPrice:['',[Validators.required]]
})

modalRef?:BsModalRef

categoryId: string | null=null;
 categoryName: string | null = null;

  allProducts: any[] = [];

  editProductId: string | null= null;

  constructor(private fb:FormBuilder, private dataService:DataService,private adminService:AdminService,private route :ActivatedRoute,private modalService: BsModalService, private router:Router) { }

  ngOnInit(): void {
    this.categoryName = this.adminService.selectedCategory?.categoryName || null;
    this.route.params.subscribe(params=>{
      this.categoryId= params['categoryId']
      this.loadProductsByCategory(this.categoryId);
    })
  }

  HandleAddProduct():void{
  if(this.addProductForm.valid){
    const {productName,productImage,productDescription,productPrice}= this.addProductForm.value;

    if(this.categoryId){
     this.dataService.addProduct( this.categoryId,productName,productImage,productDescription,productPrice).subscribe({
      next:(response)=>{
        console.log(response)
      },error:(error)=>{
        console.log("throwing error",error)
      }
     })
    }

  }
}


  loadProductsByCategory(categoryId: string | null): void {
    if (categoryId) {
      this.dataService.getProductsByCategory(categoryId)
        .subscribe({
          next: (response: any) => {
            console.log("Products after reload:", response.products);
            this.allProducts = response.products || [];
          },
          error: (error) => {
          }
        });
    }
  }

  handleProductEdit(product:any,template:TemplateRef<any> ):void{
    console.log("editing product",product);
    this.editProductId=product._id;
    console.log("productID",product);
  this.editProductForm.patchValue({
    productName: product.productName,
    productDescription: product.description,
    productImage: product.imageURL,
    productPrice: product.price
  });
  this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
      backdrop: 'static',
      keyboard: false
    });
}





ProductEditSubmit():void{
  console.log("edit form submitted");
  if(this.editProductForm.valid){
    const {productName,productDescription,productImage,productPrice}=this.editProductForm.value;
    console.log(this.editProductForm.value)

    if(this.editProductId){
      this.dataService.editProduct(this.editProductId, productName,productDescription,productImage,productPrice).subscribe({
        next: (response : any) =>{
          console.log("product updated succesfully",response);
          this.loadProductsByCategory(this.categoryId);
          this.editProductForm.reset();
          this.modalRef?.hide();

        },
        error:(error) => {
            console.error('Failed to update product:', error);
          }
      })
    }

  }
}
gobackToCategories():void{
  this.router.navigate(['/admin/add-category']);
}

}

