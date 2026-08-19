import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AdminService{
   
    selectedCategory: any;

    adminLoginBehaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    adminUserData: any;
    constructor(private router: Router) { }

    handleAdminLogout(): void {
      this.adminUserData = null;
      localStorage.removeItem('adminUser');
      this.adminLoginBehaviorSubject.next(false);
      this.router.navigate(['/catalog/categories']);
    }
}

