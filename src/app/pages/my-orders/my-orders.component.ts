import { Component, OnInit } from '@angular/core';
import { ServiceCreateDeleteDialogComponent } from 'src/app/dialogs/service-create-delete-dialog/service-create-delete-dialog.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  services: any;
  displayedColumns = ['id','lineitems', 'partsamount','laboramount','linetotal','total','date', 'functions'];
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



  constructor(private http: HttpClient, private dialog: MatDialog, private cookieService: CookieService) {

    this.username = this.cookieService.get('sessionuser');
    this.http.get('api/invoices/' + this.username ).subscribe(res =>{
      this.invoices = res;
    }, err => {
      console.log(err);
    })
  }



ngOnInit(){

}

delete(invoiceId) {
  const dialogRef = this.dialog.open(ServiceCreateDeleteDialogComponent, {
    data: {
      invoiceId
    },
    disableClose: true,
    width: '800px'
  });

  dialogRef.afterClosed().subscribe(result =>{
    if (result === 'confirm'){
      this.http.delete('/api/invoices/' + invoiceId).subscribe(res => {
        console.log('Invoice deleted');
        this.invoices = this.invoices.filter(q => q._id !== invoiceId);
        console.log(this.invoices);
      });
    }
  });
}
}
