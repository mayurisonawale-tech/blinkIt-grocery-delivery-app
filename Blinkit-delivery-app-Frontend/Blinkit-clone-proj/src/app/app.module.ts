import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './shared/components/header/header.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HomeComponent } from './home/home.component';

const appRoutes:Routes=[
  {path:'', component:HomeComponent, pathMatch:'full'},
  {path:'admin', loadChildren:() => import('./admin/admin.module').then(m=>m.AdminModule)},
  {path:'user',loadChildren:()=>import('./user-auth/user-auth.module').then(m=>m.UserAuthModule)},
  {path:'catalog',loadChildren:()=>import('./catalog/catalog.module').then(m=>m.DisplayModule)},
  // Unknown URLs fall back to the landing page rather than a blank screen.
  {path:'**', redirectTo:''}
]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent
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
