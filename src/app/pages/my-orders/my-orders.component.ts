import { Component, OnInit } from '@angular/core';
import { ServiceCreateDeleteDialogComponent } from 'src/app/dialogs/service-create-delete-dialog/service-create-delete-dialog.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  services: any;
  displayedColumns = ['id','lineitems', 'partsamount','laboramount','total','date', 'functions'];
  name: string;
  id: number;
  title: string;
  price: number;
  invoices: Object;
  sessionuser: string;
  username: string;


  constructor(private http: HttpClient, private dialog: MatDialog, private cookieService: CookieService) {

    this.username = this.cookieService.get('sessionuser');
    this.http.get('api/invoices/' + this.username ).subscribe(res =>{
      this.invoices = res;
    }, err => {
      console.log(err);
    })
  }
invoicePipe(){
  this.invoices
  console.log(this.invoices)
}

ngOnInit(){

}

delete(serviceId) {
  const dialogRef = this.dialog.open(ServiceCreateDeleteDialogComponent, {
    data: {
      serviceId
    },
    disableClose: true,
    width: '800px'
  });

  dialogRef.afterClosed().subscribe(result =>{
    if (result === 'confirm'){
      this.http.delete('/api/services/' + serviceId).subscribe(res => {
        console.log('Service deleted');
        this.services = this.services.filter(q => q._id !== serviceId);
        console.log(this.services);
      });
    }
  });
}
}
