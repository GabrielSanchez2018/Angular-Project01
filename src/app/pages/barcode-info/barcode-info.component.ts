import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
import { ServiceCreateDeleteDialogComponent } from 'src/app/dialogs/service-create-delete-dialog/service-create-delete-dialog.component';
import { noUndefined } from '@angular/compiler/src/util';
import { error } from 'util';
import { isEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-barcode-info',
  templateUrl: './barcode-info.component.html',
  styleUrls: ['./barcode-info.component.css']
})
export class BarcodeInfoComponent implements OnInit {
  displayedColumns = ['username', 'barcode', 'productcode', 'boxweight','priceperpound','total', 'functions'];
  username: string;
  barcodes: any;
  barcodeId: Object;
  name: string;
  id: number;
  title: string;
  price: number;
  invoices: any;
  sessionuser: string;
  usernameId: string;
  user: string;
  userId: string;
  services: Object;
  find: object;

  constructor(private http: HttpClient, private dialog: MatDialog, private cookieService: CookieService) {

    this.username = this.cookieService.get('sessionuser');
    this.http.get('api/invoices/' + this.username).subscribe(res =>{
      this.invoices = res;
    }, err => {
      console.log(err);
    })
    this.http.get('api/services/').subscribe(res =>{
    this.services = res;
    console.log('here we are in services', this.services)

    // data arrays

    const dataservices = this.services;
    const datainvoices = this.invoices;

      // iteration array
      var test = dataservices.find(function(element){
        return console.log('emement ids',element.id)
      })
      // services
    var serviceCero = dataservices[0].id
    var serviceOne = dataservices[1].id
    var serviceTwo = dataservices[2].id
    var serviceThree = dataservices[3].id


    // Label
    var enteredProductcode = datainvoices[0].barcode[0].barProductCode;

    // equation test
    console.log('this is the first label', serviceCero)
    console.log('this is the second label', serviceOne)
    console.log('this is the product code in the label', enteredProductcode)
    console.log('this is the price', dataservices[0].price)
    console.log('this is the price', dataservices[1].price)
    console.log('this is the price', dataservices[2].price)
    console.log('this is the price', dataservices[3].price)
    console.log('this is the weight', datainvoices[0].barcode[0].barBoxNetWeight)



     //if statements
      function myFunction(){

      if (enteredProductcode === serviceCero){
        return dataservices[0].price * datainvoices[0].barcode[0].barBoxNetWeight
      } else if(enteredProductcode === serviceOne) {
        return dataservices[1].price * datainvoices[0].barcode[0].barBoxNetWeight
      } else if(enteredProductcode === serviceTwo){
        return dataservices[2].price * datainvoices[0].barcode[0].barBoxNetWeight
      } else if (enteredProductcode === serviceThree){
        return dataservices[3].price * datainvoices[0].barcode[0].barBoxNetWeight
      } else if (enteredProductcode === dataservices[4].id){
        return dataservices[4].price * datainvoices[0].barcode[0].barBoxNetWeight
      }


    }

  myFunction();
console.log('results', myFunction())

var tos = myFunction();

var  tet = tos.toFixed()









    // get by id ellements

    document.getElementById("id1").innerHTML = dataservices[0].id;
    document.getElementById("id2").innerHTML = datainvoices[0].barcode[0].barProductCode;
    document.getElementById("demo").innerHTML = tet;

















    // invoicedata new array


      // first barcode
      // the product code is going to iterate throw all the services to find the price
    // var enteredProductcode = datainvoices[0].barcode[0].barProductCode;

    // var serviceCero = dataservices[0].id
    // var serviceOne = dataservices[1].id
    // var serviceTwo = dataservices[2].id
    // var serviceThree = dataservices[3].id

    //var serviceFour = dataservices[4].id
    // var serviceFive = dataservices[5].id
    // var serviceSix = dataservices[6].id
    // var serviceSeven = dataservices[7].id


    // console.log('cero', serviceCero);
    // console.log('one', serviceOne);
    // console.log('two', serviceTwo);
    // console.log('three', serviceThree);
    //console.log('four', serviceFour);
    // console.log('five', serviceFive);
    // console.log('six', serviceSix);
    // console.log('seven', serviceSeven)

    // if (enteredProductcode = serviceCero){
    //   return console.log('here is the price for the first barcode', dataservices[0].price * datainvoices[0].barcode[0].barBoxNetWeight)
    // } else if (enteredProductcode = serviceOne){
    //   return console.log('here is the price for the second barcode', dataservices[1].price * datainvoices[0].barcode[0].barBoxNetWeight)
    // } else {
    //   console.log('no mames')
    // }

  }), err =>{
    console.log(err);
  }

}


ngOnInit(){

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
      this.http.delete('/api/invoices/' + barcodeId).subscribe(res => {
        console.log('Barcode deleted');
        this.invoices = this.invoices.filter(q => q._id !== barcodeId);
        console.log(this.invoices);
      });
    }
  });
 }
}
