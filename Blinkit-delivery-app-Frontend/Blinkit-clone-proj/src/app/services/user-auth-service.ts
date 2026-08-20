import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";



@Injectable({
    providedIn: 'root'
})

export class UserAuthService {

    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    addUserRegistrationDetails(userName:string,email:string,password:string,mobile:string,address:string){
    return this.http.post(`${this.apiUrl}auth/user/register`,{
        userName,
        email,
        password,
        mobile,
        address
    })
}

getUserLoginDetails(userName:string,password:string){
    return this.http.post(`${this.apiUrl}auth/user/login`,{
        userName,
        password
    })
}


}