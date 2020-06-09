import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import {AuthService} from '../guards/auth.service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {
  show: boolean;
  year: number = Date.now();
  authService: any;
  sessionuser: any;
  username: string;
  isAuthenticated: boolean;
  EmployeeId: string;

  constructor(private http: HttpClient, private cookieService: CookieService, private auth: AuthService)  {

    this.username = this.cookieService.get('sessionuser');
    this.http.get('/api/users/' + this.cookieService.get('sessionuser') + '/role' ).subscribe(res => {
      if (res === "admin") {
          this.show = true;
      } else {
        this.show = false
          }
    });
    // this.username = this.cookieService.get('sessionuser');
    // this.http.get('/api/employees/' + this.cookieService.get('sessionuser') + '/role' ).subscribe(res => {
    //   if (res === "admin") {
    //       this.show = true;
    //   } else {
    //     this.show = false
    //       }
    // });
  }


// this function will logout the user
  onLogout() {
    localStorage.clear();
    localStorage.removeItem(this.sessionuser);
    this.sessionuser = false;
    this.auth.logout();
    //the follogin function will reload the browser when you sign out
    //This clears the cookie
    window.location.reload();
  }

  ngOnInit() {

  }

}
