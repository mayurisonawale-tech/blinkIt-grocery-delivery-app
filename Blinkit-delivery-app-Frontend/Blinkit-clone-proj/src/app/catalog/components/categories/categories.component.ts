import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogDataService } from 'src/app/services/catalog-data.service';
import { CatalogHelperService } from 'src/app/services/catalog-helper.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(private catalogDataService: CatalogDataService,private catalogHelperService:CatalogHelperService, private router:Router) { }

  categories: any[] = [];

  ngOnInit(): void {
    this.catalogHelperService.clearSelectedCategory();
    this.catalogDataService.getCategories().subscribe((data:any)=>{
      this.categories = data.categories;
    });
  }

  navigateToProducts(category: any){
    this.catalogHelperService.userSelectedCategory = category;
    localStorage.setItem('selectedCategory', JSON.stringify(category));
    this.router.navigate(['/catalog/products']);
  }

}
