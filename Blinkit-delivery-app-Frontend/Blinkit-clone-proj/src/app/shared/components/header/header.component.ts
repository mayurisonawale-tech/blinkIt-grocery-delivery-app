import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin-service';
import { UserHelperService } from 'src/app/services/user-helper.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

 showCartIcon: boolean = false;

  showUserLogin : boolean = true;
  showUserRegister : boolean = true;
  showUserLogout : boolean = false;

  showAdminLogin : boolean = false;
  showAdminLogout : boolean = false;

  constructor(private adminService: AdminService, private router: Router, private userHelperService: UserHelperService) { }

  ngOnInit(): void {
    this.adminService.adminLoginBehaviorSubject.subscribe((isAdminLoggedIn) => {
      console.log('Admin login status:', isAdminLoggedIn);
      if(isAdminLoggedIn){
        localStorage.removeItem('user');
        this.showAdminLogin = false;
        this.showAdminLogout = true;
        this.showUserLogin = false;
        this.showUserRegister = false;
        this.showCartIcon = false;
        this.showUserLogout = false;
      }else {
        this.showAdminLogin = true;
        this.showAdminLogout = false;
        this.showUserLogin = true;
        this.showUserRegister = true;
        this.showCartIcon = false;
        this.showUserLogout = false;
      }
    });

    this.userHelperService.userLoginStatusBehaviorSubject.subscribe((isUserLoggedIn) => {
      console.log('User login status:', isUserLoggedIn);
      if (isUserLoggedIn) {
        this.showUserLogin = false;
        this.showUserRegister = false;
        this.showCartIcon = true;
        this.showUserLogout = true;
        this.showAdminLogin = false;
        this.showAdminLogout = false;
      } else {
        this.showUserLogin = true;
        this.showUserRegister = true;
        this.showCartIcon = false;
        this.showUserLogout = false;
        this.showAdminLogin = true;
        this.showAdminLogout = false;
      }
    });



  }

  handleAdminLogout(): void {
    this.adminService.handleAdminLogout();
  }

  handleUserLogout(): void {
    this.userHelperService.handleUserLogout();
  }
}
}