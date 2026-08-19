import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error, group } from 'console';
import { DataService } from 'src/app/services/data-service';
import { UserAuthService } from 'src/app/services/user-auth-service';

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

  constructor( private fb:FormBuilder, private userAuthService:UserAuthService, private router:Router) { }

  ngOnInit(): void {
  }
onRegistrationSubmit():void{
  console.log("submit clicked")
  if(this.userRegisterForm.valid){
    const {userName,email, password,mobileNo,address}= this.userRegisterForm.value
this.userAuthService.addUserRegistrationDetails(userName,email, password,mobileNo,address).subscribe({
  next: (response: any)=>{
     console.log('user register successful:',response);
     this.router.navigate(['/user/login'])
   },
  error:(error)=>{
    console.log('user register failed',error)
  } 
})
}}

}
