import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsComponent } from './components/products/products.component';

const displayRoutes = [
  {path:'categories',component:CategoriesComponent},
  {path:'products',component:ProductsComponent},
  {path:'cart',component:CartComponent}
]

@NgModule({
  declarations: [
    CartComponent,
    CategoriesComponent,
    ProductDetailsComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(displayRoutes)
  ]
})
export class DisplayModule { }
