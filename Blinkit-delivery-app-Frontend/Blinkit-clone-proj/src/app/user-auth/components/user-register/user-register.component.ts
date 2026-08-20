import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth-service';
import { UserHelperService } from 'src/app/services/user-helper.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

 userRegisterForm= this.fb.group({
  userName: ['',[Validators.required]],
  email: ['',[Validators.required]],
  password: ['',[Validators.required]],
  mobileNo: ['',[Validators.required]],
  address: ['',[Validators.required]]
})

  // Carried through from the guard so a new account lands where the visitor
  // was originally headed.
  private returnUrl = '/catalog/categories';

  registerError = '';

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

  onRegistrationSubmit():void{
    if(this.userRegisterForm.valid){
      const {userName,email, password,mobileNo,address}= this.userRegisterForm.value;
      this.userAuthService.addUserRegistrationDetails(userName,email, password,mobileNo,address).subscribe({
        next: (response: any)=>{
          // Registering signs the user straight in, so they go shopping
          // instead of retyping the credentials they just chose.
          localStorage.setItem('user',JSON.stringify(response.user));
          localStorage.removeItem('adminUser');
          this.userHelperService.userData = response.user;
          this.userHelperService.userLoginStatusBehaviorSubject.next(true);

          this.router.navigateByUrl(this.returnUrl);
        },
        error:(error)=>{
          console.log('user register failed',error);
          this.registerError = 'Could not create your account. Please try again.';
        }
      })
    }
  }
}
