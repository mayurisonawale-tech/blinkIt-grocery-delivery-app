
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class UserHelperService {
    userData: any;
    userLoginStatusBehaviorSubject= new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {}

  handleUserLogout(): void {
    localStorage.removeItem('user');
    this.userData = null;
    this.userLoginStatusBehaviorSubject.next(false);
    // The catalog is guarded now, so send signed-out users to the landing page.
    this.router.navigate(['/']);
  }
}  

