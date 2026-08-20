import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  // Where the guard turned the visitor away from, if anywhere.
  private returnUrl = '/catalog/categories';

  loginError = '';

  constructor(
    private fb:FormBuilder,
    private userAuthService:UserAuthService,
    private router:Router,
    private route:ActivatedRoute,
    private userHelperService:UserHelperService
  ) { }

  ngOnInit(): void {
    const requested = this.route.snapshot.queryParamMap.get('returnUrl');
    if (requested) {
      this.returnUrl = requested;
    }
  }

  userLoginSubmit():void{
    if(this.userLoginForm.valid){
      const {username,password} = this.userLoginForm.value;
      this.userAuthService.getUserLoginDetails(username,password).subscribe({
        next:(response:any)=>{
          localStorage.setItem('user',JSON.stringify(response.user));
          localStorage.removeItem('adminUser');
          this.userHelperService.userData = response.user;
          this.userHelperService.userLoginStatusBehaviorSubject.next(true);

          this.router.navigateByUrl(this.returnUrl);
        },
        error:(error)=>{
          console.log("user login failed",error);
          this.loginError = error?.status === 401
            ? 'Invalid username or password.'
            : 'Could not sign you in. Please try again.';
        }
      });
    }
  }
}
