import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import {Table} from 'primeng/components/table/table';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ServiceCreateDeleteDialogComponent } from 'src/app/dialogs/service-create-delete-dialog/service-create-delete-dialog.component';


@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {



  form: FormGroup;
  username: string;
  invoices: Object;
  services: Object;
  barcodes: Object;
  displayedColumns = ['username', 'barcode', 'productcode','itemdescription', 'boxweight','priceperpound','total', 'functions'];
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
  datasource: any;


  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private cookieService: CookieService, private changeDetectorRefs: ChangeDetectorRef, private dialog: MatDialog,) {
    this.username = this.cookieService.get('sessionuser');
    this.http.get('api/invoices/' ).subscribe(res =>{
      this.invoices = res;
    }, err => {
      console.log(err);
    })

    this.http.get('api/services/').subscribe(res =>{
      this.services = res;
      console.log('yest',this.services);
      console.log(res)
    }), err => {
      console.log(err);
    }
    this.http.get('api/barcodes/').subscribe(res =>{
      this.barcodes = res;
    }), err =>{
      console.log(err)
    }
  }


  ngOnInit() {


    this.form = this.fb.group({
      barcode: [null, Validators.compose([Validators.required])]

    });
  }

  delete(barcodeId) {
    const dialogRef = this.dialog.open(ServiceCreateDeleteDialogComponent, {
      data: {
        barcodeId
      },
      disableClose: true,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result =>{
      if (result === 'confirm'){
        this.http.delete('/api/barcodes/' + barcodeId).subscribe(res => {
          console.log('Barcode deleted');
          this.barcodes = this.barcodes.filter(q => q._id !== barcodeId);
          console.log(this.barcodes);
        });
      }
    });
   }



  create(){
    this.http.get('api/services').subscribe(res =>{
      this.services = res;

      const dataservices = this.services;
      const enteredProductcode = this.form.controls.barcode.value;

      //Product Code label
   var productCode = Array.from(enteredProductcode.slice(10,15));
   var labelproductCode = productCode.join('');
   //Box Weight
   var boxWeight = Array.from(enteredProductcode.slice(20,26));
    var labelWeight = boxWeight.join('')/10;

   console.log('hre is ', labelproductCode)
   console.log('weight', labelWeight)
   console.log('1', dataservices[0].id)
   console.log('price', dataservices[0].price)

// this function gets the price of the item
function myFunction(){
    if (labelproductCode == dataservices[0].id){
      return dataservices[0].price

    } else if(labelproductCode == dataservices[1].id) {
      return dataservices[1].price

    } else if(labelproductCode == dataservices[2].id){
      return dataservices[2].price

    } else if (labelproductCode == dataservices[3].id){
      return dataservices[3].price

    } else if (labelproductCode == dataservices[4].id){
      return dataservices[4].price

    } else if (labelproductCode == dataservices[5].id){
      return dataservices[5].price
    }


  }
// this function returns the total prices
  function totalPrice(){
    if (labelproductCode == dataservices[0].id){
      return dataservices[0].price * labelWeight

    } else if(labelproductCode == dataservices[1].id) {
      return dataservices[1].price * labelWeight

    } else if(labelproductCode == dataservices[2].id){
      return dataservices[2].price * labelWeight

    } else if (labelproductCode == dataservices[3].id){
      return dataservices[3].price * labelWeight

    } else if (labelproductCode == dataservices[4].id){
      return dataservices[4].price * labelWeight

    } else if (labelproductCode == dataservices[5].id){
      return dataservices[5].price * labelWeight
    }


  }

  function descriptionFunction(){
    if (labelproductCode == dataservices[0].id){
      return dataservices[0].title

    } else if(labelproductCode == dataservices[1].id) {
      return dataservices[1].title

    } else if(labelproductCode == dataservices[2].id){
      return dataservices[2].title

    } else if (labelproductCode == dataservices[3].id){
      return dataservices[3].title

    } else if (labelproductCode == dataservices[4].id){
      return dataservices[4].title

    } else if (labelproductCode == dataservices[5].id){
      return dataservices[5].title
    }


  }

var totalpriceResult = totalPrice();
var totalprice = totalpriceResult.toFixed(1);
var itemdescription = descriptionFunction();


var price = myFunction();


console.log('here is the price', price);
console.log('here is the total price', totalprice);
console.log('here is the total description', itemdescription);




    this.http.post('/api/barcodes/', {
      price: price,
      totalprice: totalprice,
      itemdescription: itemdescription,
      username: this.username,
      barcode: this.form.controls.barcode.value,
    }).subscribe(res =>{
      this.router.navigate(['/sell']);
      // this will reset the form


      this.form.reset();
      this.changeDetectorRefs.detectChanges();
    })
  })
  }



}
