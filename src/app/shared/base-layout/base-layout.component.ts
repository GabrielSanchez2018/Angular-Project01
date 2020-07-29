import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import {AuthService} from '../guards/auth.service';
import { Router } from '@angular/router';
import { ElementFinder } from 'protractor';

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
  paysession: any;
  username: string;
  isAuthenticated: boolean;
  EmployeeId: string;
  empinfo: Object;


  constructor(private http: HttpClient, private cookieService: CookieService, private auth: AuthService, private router: Router)  {
    this.http.get('api/employees').subscribe(res =>{
      this.empinfo = res;
    }, err => {
      console.log(err);
      console.log('from here',this.empinfo)

    })
    // this.username = this.cookieService.get('sessionuser');
    // this.http.get('/api/users/' + this.cookieService.get('sessionuser') + '/role' ).subscribe(res => {
    //   if (res === 'admin'){
    //     this.show = true
    //   } else if(res === false) {
    //     this.username = this.cookieService.get('sessionuser');
    //     this.http.get('/api/employees/' + this.cookieService.get('sessionuser') + '/role').subscribe(res =>{
    //       if(res === 'standard'){
    //         this.show = true
    //       } else {
    //         this.show = false
    //       }
    //     })
    //   }
    // })


      // if(res === 'admin'){
      //   this.show = true
      // } else {
      //   this.show = false
      // } if( res === 'standard'){
      //   this.username = this.cookieService.get('sessionuser');
      //   this.http.get('/api/employees/' + this.cookieService.get('sessionuser') + '/role').subscribe(res =>{
      //     if(res === 'standard'){
      //       this.show = true
      //     } else {
      //       this.show = false
      //     }
      //   })
      //   }



      // if (res === "admin") {
      //     this.show = true;
      // } else {
      //   this.show = false
      //     }
   // });

    this.username = this.cookieService.get('sessionuser');
    console.log('this is the employees', this.username.toUpperCase())


    this.http.get('/api/employees/' + this.username.toUpperCase + '/role' ).subscribe(res => {
     var compare = res + this.username


     /**
      * test account is the only admin account
      */

    console.log('this is res', compare)


      if (compare == 'standardtest02') {
          this.show = true;
          console.log('false')
      } else {
        this.show = false
        console.log('false')
          }
    });
   }



// this function will logout the user
  onLogout() {
    localStorage.clear();
    localStorage.removeItem(this.sessionuser);
    localStorage.removeItem(this.paysession);
    this.cookieService.delete('sessionuser')
    this.cookieService.delete('paysession')
    this.router.navigate(['/session/sign-in-employee']);
    //the follogin function will reload the browser when you sign out
    //This clears the cookie
   // window.location.reload();
  }


  ngOnInit() {

  }

}
