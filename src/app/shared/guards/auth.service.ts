import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { flatMap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = false;
  token: any;
  sessionuser: boolean;
  username: any;
  cookieservice: any;

  constructor(private http: HttpClient, private router: Router, private cookie:CookieService ) {}

  getToken() {
    return this.token;
  }


  logout() {
    console.log("You have logout")
    this.cookie.delete;
    this.cookie.delete('isAuthenticated');
    this.token = false;
    this.isAuthenticated = false;

    this.username = false;
    this.sessionuser = false;
    this.router.navigate(['/session/signin']);

  }
}

