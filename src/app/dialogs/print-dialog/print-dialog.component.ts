import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-print-dialog',
  templateUrl: './print-dialog.component.html',
  styleUrls: ['./print-dialog.component.css']
})
export class PrintDialogComponent implements OnInit {
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
  employeeUser: string;
  employees: any;


  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private cookieService: CookieService, private changeDetectorRefs: ChangeDetectorRef, private dialog: MatDialog, private snackBar: MatSnackBar ,private dialogRef: MatDialogRef<PrintDialogComponent>,@Inject(MAT_DIALOG_DATA) data) {
/**
     * This api provides information about the user
     */

    this.employeeUser = this.cookieService.get('paysession');
    this.http.get('/api/employees/' + this.employeeUser).subscribe(res =>{
      this.employees = res
      console.log('employees', this.employees)
    }), err =>{
      console.log(err)

    }


    this.barcode = data.barcode;
    console.log('this is datadata', this.barcode)

    this.username = this.cookieService.get('paysession');
    this.http.get('api/barcodes/' ).subscribe(res =>{
        //THIS FUNCTION WILL FILTHER THE USERNAME | I replaced the filter for map.

        if(Array.isArray(res)){
          this.barcodes = res.filter(q => q.username === this.username);
       }
      //this.barcodes = res.filter(q => q.username === this.username);;

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
