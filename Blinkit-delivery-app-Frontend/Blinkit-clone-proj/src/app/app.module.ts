import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './shared/components/header/header.component';
import { ModalModule } from 'ngx-bootstrap/modal';

const appRoutes:Routes=[{
  path:'admin', loadChildren:() => import('./admin/admin.module').then(m=>m.AdminModule)},
  {path:'user',loadChildren:()=>import('./user-auth/user-auth.module').then(m=>m.UserAuthModule)},
  {path:'catalog',loadChildren:()=>import('./catalog/catalog.module').then(m=>m.DisplayModule)}
]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
