import { Component } from '@angular/core';
import { AdminService } from './services/admin-service';
import { UserHelperService } from './services/user-helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Blinkit-clone-proj';

constructor(private adminService:AdminService, private userHelperService:UserHelperService) { }


  ngOnInit(): void {
    const adminUser= localStorage.getItem('adminUser');
    if(adminUser){
      this.adminService.adminLoginBehaviorSubject.next(true);
    }
    const user= localStorage.getItem('user');
    if(user){
      this.userHelperService.userLoginStatusBehaviorSubject.next(true);
    }
  }
}
