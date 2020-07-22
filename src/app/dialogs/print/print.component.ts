import { Component, OnInit,Inject, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PrintDialogComponent } from '../print-dialog/print-dialog.component';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {
  public now: Date = new Date();
  invoice: any;
  barcode: any;
  //form: FormGroup;
  username: string;
  invoices: Object;
  services: Object;
  barcodes: any;
  displayedColumns = ['username', 'productcode','itemdescription', 'boxweight','priceperpound','total'];
  barcodeId: Object;
  name: string;
  id: number;
  title: string;
  price: number;
  sessionuser: string;
  usernameId: string;
  user: string;
  userId: string;
  find: object;
  bar: any;
  map: any;
  matInput: any;
  time: any;
  test: string;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private cookieService: CookieService, private changeDetectorRefs: ChangeDetectorRef, private dialog: MatDialog) {
  //this.barcode = data.barcode;
  console.log('this is datadata', this.barcode)

  this.username = this.cookieService.get('paysession');
  this.http.get('api/barcodes/' ).subscribe(res =>{
      //THIS FUNCTION WILL FILTHER THE USERNAME | I replaced the filter for map.

      if(Array.isArray(res)){
        this.barcodes = res.filter(q => q.username === this.username);
     }
    //this.barcodes = res.filter(q => q.username === this.username);;
    console.log('noiniewnfis', this.barcodes)
  }), err =>{
    console.log(err)
  }

  setInterval(() => {
    this.now = new Date();
  }, 1);

}


getTotalCost() {
  //this.barcodes.map(t => t.totalprice).reduce((acc, value) => acc + value, 0);
  if(Array.isArray(this.barcodes)){
   return this.barcodes.map(t => t.totalprice).reduce((acc, value) => acc + value, 0);
  }

}
getTime() {
  //this.barcodes.map(t => t.totalprice).reduce((acc, value) => acc + value, 0);
  if(Array.isArray(this.barcodes)){
   return this.barcodes.map(t => t.oderDate).reduce((acc, value) => acc + value, 0);
  }

}







  ngOnInit() {
  }

}
