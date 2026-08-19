import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin-service';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
loginForm= this.fb.group({
  username:['',[Validators.required]],
  password:['',[Validators.required]]
})

  constructor(private fb: FormBuilder, private dataService:DataService, private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
  }
onSubmit():void{
  if (this.loginForm.valid) {
    const { username, password } = this.loginForm.value;
    this.dataService.AdminLogin(username, password).subscribe({
      next: (response) =>{
        console.log('Admin login successful:', response);
        localStorage.removeItem('user');
        localStorage.setItem('adminUser', JSON.stringify(response));
        this.adminService.adminUserData = response;
        this.adminService.adminLoginBehaviorSubject.next(true);
        this.router.navigate(['/admin/add-category']);
      },
      error: (error) => {
        console.error('Admin login failed:', error);
      }
      });
    }
}

}
