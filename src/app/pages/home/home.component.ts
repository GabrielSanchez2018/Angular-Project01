import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { truncate } from 'fs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  employees: Object;
  username: any;
  user: any;
  invoice: any;
  hidden = false;
   
  // toggleBadgeVisibility() {
  //   this.hidden = !this.hidden;
  // }
  show: boolean = true;


  constructor(private http: HttpClient, private cookieService: CookieService) {

    this.user = this.cookieService.get('sessionuser');
    this.http.get('api/employees/' + this.user.toUpperCase() ).subscribe(res =>{
      this.user = res;
    //   if(Array.isArray(res)){
    //     this.employees = res.filter(q => q.username === this.username);
    //  }
      console.log('super duper',this.user)
    }, err => {
      console.log(err);
    })

    this.user = this.cookieService.get('sessionuser');
    this.http.get('/api/invoices/' + this.user.toUpperCase()).subscribe(res =>{
      this.invoice = res

      console.log( 'invoce',this.invoice)
      console.log( 'invoce',this.invoice.length)
      var invoiceCounter = this.invoice.length
    console.log('This counts the invoice length',invoiceCounter)
     /**
      * If the invoice is bigger than 1, the user would not be able to imput another order. 
      * 
      */
    if(invoiceCounter > 0){
      console.log('true')
      this.show = false
    } else {
      console.log('false')
      this.show = true
    }
    }, err => {
      console.log(err)
    })
    
  }



  ngOnInit() {
  }

}
