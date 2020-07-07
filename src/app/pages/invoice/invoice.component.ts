import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  //form: FormGroup;
  username: string;
  invoices: Object;
  services: Object;
  barcodes: Object;
  displayedColumns = ['username',
  'barcode', 'productcode','itemdescription', 'boxweight','priceperpound','total', 'functions'];
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

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private cookieService: CookieService, private changeDetectorRefs: ChangeDetectorRef, private dialog: MatDialog, private snackBar: MatSnackBar) {

    // this.username = this.cookieService.get('paysession');
    // this.http.get('api/barcodes/' ).subscribe(res =>{
    //     //THIS FUNCTION WILL FILTHER THE USERNAME
    //   if(Array.isArray(res)){
    //     this.barcodes = res.filter(q => q.username === this.username);;
    //   }
    //   console.log('noiniewnfis', this.barcodes)
    // }), err =>{
    //   console.log(err)
    // }

   }

  ngOnInit() {
  }

}
