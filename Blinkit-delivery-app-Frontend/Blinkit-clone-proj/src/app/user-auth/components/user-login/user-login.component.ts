import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data-service';
import { UserAuthService } from 'src/app/services/user-auth-service';
import { UserHelperService } from 'src/app/services/user-helper.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  userLoginForm= this.fb.group({
    username:['',[Validators.required]],
    password:['',[Validators.required]]
  })


  constructor(private fb:FormBuilder, private userAuthService:UserAuthService, private router:Router,private userHelperService:UserHelperService) { }

  ngOnInit(): void {
  }

  userLoginSubmit():void{
    console.log("submit button clicked");
    if(this.userLoginForm.valid){
      const {username,password} = this.userLoginForm.value;
      this.userAuthService.getUserLoginDetails(username,password).subscribe({
        next:(response:any)=>{
          console.log("user login successful",response);
          localStorage.setItem('user',JSON.stringify(response.user));
          localStorage.removeItem('adminUser');
          this.userHelperService.userData = response.user;
          this.userHelperService.userLoginStatusBehaviorSubject.next(true);

          this.router.navigate(['/catalog/categories']);
        },
        error:(error)=>{
          console.log("user login failed",error);
        }
      });
    }
  }
}


