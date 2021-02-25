import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-invoice-history',
  templateUrl: './invoice-history.component.html',
  styleUrls: ['./invoice-history.component.css']
})
export class InvoiceHistoryComponent implements OnInit {
  services: any;
  displayedColumns = ['username', 'barcode', 'productcode','itemdescription', 'boxweight','priceperpound','total','orderDate', ];
  name: string;
  id: number;
  title: string;
  price: number;
  invoices: any;
  sessionuser: string;
  username: string;
  usernameId: string;
  user: string;
  userId: string;
  show: boolean = true;
  history: any;


  constructor(private http: HttpClient, private dialog: MatDialog, private cookieService: CookieService) { 
//     this.username = this.cookieService.get('sessionuser');
//     this.http.get('/api/history/history-unwind/' + this.username.toUpperCase() ).subscribe(res =>{
//       this.history = res;
// console.log('History API', this.history)
//       var invoiceCounter = this.history.length
//       console.log('This counts the invoice length',invoiceCounter)
//      /**
//       * If the invoice is bigger than 1, the user would not be able to imput another order.
//       *
//       */
//     if(invoiceCounter > 0){
//       console.log('true')
//       this.show = true
//     } else {
//       console.log('false')
//       this.show = false
//     }
//     }, err => {
//       console.log(err);
//     })
this.username = this.cookieService.get('sessionuser');
    this.http.get('/api/history/history-unwind').subscribe(res =>{
      this.history = res
      console.log('history', this.history)
      if(Array.isArray(this.history)){
        this.history = this.history.filter(element => element._id.username === this.username.toUpperCase() );
         console.log('Filted History API',this.history)
     
       }
    }), err =>{
      console.log(err)

      
  

    }
  }

  ngOnInit() {
  }

}
