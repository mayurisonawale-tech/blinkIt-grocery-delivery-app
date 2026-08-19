import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddProductComponent } from './add-product/add-product.component';

const adminRoutes=[{
  path: 'login', component:AdminLoginComponent},
{path:'add-category',component:AddCategoryComponent},
{path:'add-product/:categoryId',component:AddProductComponent}
]

@NgModule({
  declarations: [
    AdminLoginComponent,
    AddCategoryComponent,
    AddProductComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(adminRoutes)
  ]
})
export class AdminModule { }
