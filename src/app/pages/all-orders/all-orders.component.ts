import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ServiceCreateDeleteDialogComponent } from 'src/app/dialogs/service-create-delete-dialog/service-create-delete-dialog.component';
import { CookieService } from 'ngx-cookie-service';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {

  services: any;
  displayedColumns = ['id','lineitems','total','date', 'functions'];
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


  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

 
  

  constructor(private http: HttpClient, private dialog: MatDialog, private cookieService: CookieService) {

    this.username = this.cookieService.get('sessionuser');
    this.http.get('api/invoices/' ).subscribe(res =>{
      this.invoices = res;
    }, err => {
      console.log(err);
    })

  }

  
  

ngOnInit(){
  this.invoices.paginator = this.paginator;
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
