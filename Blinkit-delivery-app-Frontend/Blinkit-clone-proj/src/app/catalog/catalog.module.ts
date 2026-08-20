import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsComponent } from './components/products/products.component';
import { AuthGuard } from '../services/auth.guard';

// Shopping requires an account: the cart is keyed by user id, so a signed-out
// visitor has nothing to add to.
const displayRoutes = [
  {path:'categories',component:CategoriesComponent, canActivate:[AuthGuard]},
  {path:'products',component:ProductsComponent, canActivate:[AuthGuard]},
  {path:'cart',component:CartComponent, canActivate:[AuthGuard]}
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
