import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = false;
  token: any;
  sessionuser: boolean;
  username: any;
  cookieservice: any;

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }


  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.clearAuthData();
    this.username = null;
    this.sessionuser = this.sessionuser;
    this.router.navigate(['/session/signin']);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('sessionuser');
  }
}

