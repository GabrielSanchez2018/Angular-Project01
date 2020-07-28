import { ViewChild, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { MatTableDataSource, MatTable, MatTableModule } from '@angular/material/table';
import {ObserversModule} from '@angular/cdk/observers';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ServiceCreateDeleteDialogComponent } from 'src/app/dialogs/service-create-delete-dialog/service-create-delete-dialog.component';
import { MatSnackBar } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { toArray } from 'rxjs/operators';
import { PrintDialogComponent } from 'src/app/dialogs/print-dialog/print-dialog.component';
import { error } from 'util';




@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {


  form: FormGroup;
  username: string;
  invoices: any;
  services: Object;
  barcodes: Object;
  displayedColumnsOne = ['id','code','lineitems','total','date', 'functions'];
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
  showbarcodes: Object;
  payuser: string;
  labelWeight: any;
  show: boolean = true;
  employeeUser: string;
  employees: Object;







  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private cookieService: CookieService, private changeDetectorRefs: ChangeDetectorRef, private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.employeeUser = this.cookieService.get('paysession');
    this.http.get('/api/employees/' + this.employeeUser).subscribe(res =>{
      this.employees = res
      console.log('employees', this.employees)
    }), err =>{
      console.log(err)

    }
     this.username = this.cookieService.get('paysession');
    this.http.get('api/invoices/' + this.username).subscribe(res =>{
      this.invoices = res;
      console.log('this ivocices', this.invoices)
      var invoiceCounter = this.invoices.length
    console.log('This counts the invoice length',invoiceCounter)
     /**
      * If the invoice is bigger than 1, the user would not be able to imput another order.
      *
      */
    if(invoiceCounter > 0){
      console.log('true')
      this.show = true
    } else {
      console.log('false')
      this.show = false
    }
    }, err => {
      console.log(err);
    })


// Kepp worknig on this api from json object to array, we need an array.
    this.http.get('api/barcodes/').subscribe(res =>{
      this.barcodes = res;
      console.log('this barcodes', this.barcodes)
    }), err =>{
      console.log(err)
    }

    this.http.get('api/services/').subscribe(res =>{
      this.services = res;
      console.log('yest',this.services);
      console.log(res)
    }), err => {
      console.log(err);
    }
  }

  getTotalCost() {
    if(Array.isArray(this.barcodes)){
    return this.barcodes.map(t => t.totalprice).reduce((acc, value) => acc + value, 0);
    }
  }
  //Snackbar success message
successSnackbar(){
  this.snackBar.open(
    "Item Scaned.",
    "SUCCESS",
    {
      duration: 2000,
      verticalPosition: "top"
    }
  );
}

print(){
  this.http.get('api/barcodes/').subscribe(res =>{
    this.barcodes = res;
    console.log('this barcodes', this.barcodes)
  }), err =>{
    console.log(err)
  }
  const barcode = {

  }
  const dialogRef = this.dialog.open(PrintDialogComponent,{

    data: {
      barcode: barcode
    },
    disableClose: true,
    width: '1200px',




  });
  dialogRef.afterClosed().subscribe(result =>{
    // if(result === 'confirm'){
    //   window.print();
    // }
    this.cookieService.delete('paysession')
    this.router.navigate(['/find-employee']);

  })

}

rerender(){
  this.barcodes
  this.changeDetectorRefs.detectChanges();
}

  ngOnInit() {
    this.form = this.fb.group({
      barcode: [null, Validators.compose([Validators.required])]
    });
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
          if(Array.isArray(this.invoices)){
            this.invoices = this.invoices.filter(q => q._id !== invoiceId);

          }

          console.log(this.invoices);
        });
      }
    });
  }


  create(){
    this.http.get('api/services').subscribe(res =>{
      this.services = res;

      const dataservices = this.services;
      const enteredProductcode = this.form.controls.barcode.value;

      /***
       * This Function will throw an error when the barcode is less than and longer than 46 digits.
       */
      console.log('this is the barcode', enteredProductcode.length)

      if (enteredProductcode.length > 46){
        this.snackBar.open(
          "Item Scaned has more than 46 digits.",
          "error",
          {
            duration: 4000,
            verticalPosition: "top"
          }
        )
        throw error
      } else if(enteredProductcode.length < 46){

        this.snackBar.open(
          "Item Scaned has Less than 46 digits.",
          "error",
          {
            duration: 4000,
            verticalPosition: "top"
          }


        )
        throw error


      }



      console.log('barcode', enteredProductcode.length)
      if(enteredProductcode.length > 46){
        this.snackBar.open(
          "Barcode has more than 46 digits.",
          "ERROR",
          {
            duration: 4000,
            verticalPosition: "top"
          }
        );
      }

  //Product Code label
   var productCode = Array.from(enteredProductcode.slice(10,15));
   var labelproductCode = productCode.join('');
   //Box Weight
   var boxWeight = Array.from(enteredProductcode.slice(20,26));
  var labelWeight = boxWeight.join('');

// Passing the labelWeight variable to a function so we get rid of the anoying error
  function mult(x, ) {
    return x ;
}


   console.log('hre is ', labelproductCode)
   console.log('weight test',mult(labelWeight)/10 )
   console.log('1', dataservices[0].id)
   console.log('price', dataservices[0].price)

   var newError = new Error('plaease check')
// this function gets the price of the item
function myFunction(){
    if (labelproductCode == dataservices[0].id){
      return dataservices[0].price

    } else if(labelproductCode == dataservices[1].id){
      return dataservices[1].price


    } else if(labelproductCode == dataservices[2].id){
      return dataservices[2].price

    } else if (labelproductCode == dataservices[3].id){
      return dataservices[3].price

    } else if (labelproductCode == dataservices[4].id){
      return dataservices[4].price

    }else if (labelproductCode == dataservices[5].id){
      return dataservices[5].price

    } else if (labelproductCode == dataservices[6].id){
      return dataservices[6].price

    } else if (labelproductCode == dataservices[7].id){
      return dataservices[7].price

    } else if (labelproductCode == dataservices[8].id){
      return dataservices[8].price

    } else if (labelproductCode == dataservices[9].id){
      return dataservices[9].price

    } else if (labelproductCode == dataservices[10].id){
     return dataservices[10].price

    } else if (labelproductCode == dataservices[11].id){
      return dataservices[11].price

    } else if (labelproductCode == dataservices[12].id){
      return dataservices[12].price

    } else if (labelproductCode == dataservices[13].id){
      return dataservices[13].price

    } else if (labelproductCode == dataservices[14].id){
      return dataservices[14].price

    } else if (labelproductCode == dataservices[15].id){
      return dataservices[15].price

    } else if (labelproductCode == dataservices[16].id){
      return dataservices[16].price

    } else if (labelproductCode == dataservices[17].id){
      return dataservices[17].price

    } else if (labelproductCode == dataservices[19].id){
      return dataservices[19].price

    } else if (labelproductCode == dataservices[20].id){
      return dataservices[20].price

    } else if (labelproductCode == dataservices[21].id){
      return dataservices[21].price

    } else if (labelproductCode == dataservices[22].id){
      return dataservices[22].price

    } else if (labelproductCode == dataservices[23].id){
      return dataservices[23].price

    } else if (labelproductCode == dataservices[24].id){
      return dataservices[24].price

    } else if (labelproductCode == dataservices[25].id){
      return dataservices[25].price

    } else if (labelproductCode == dataservices[26].id){
      return dataservices[26].price

  }






      }
// this function returns the total prices
  function totalPrice(){
    if (labelproductCode == dataservices[0].id){
      return dataservices[0].price * mult(labelWeight)/10

    } else if(labelproductCode == dataservices[1].id) {
      return dataservices[1].price * mult(labelWeight)/10

    } else if(labelproductCode == dataservices[2].id){
      return dataservices[2].price * mult(labelWeight)/10

    } else if (labelproductCode == dataservices[3].id){
      return dataservices[3].price * mult(labelWeight)/10

    } else if (labelproductCode == dataservices[4].id){
      return dataservices[4].price * mult(labelWeight)/10

    } else if (labelproductCode == dataservices[5].id){
      return dataservices[5].price * mult(labelWeight)/10

    } else if(labelproductCode == dataservices[6].id) {
      return dataservices[6].price * mult(labelWeight)/10

    } else if(labelproductCode == dataservices[7].id){
      return dataservices[7].price * mult(labelWeight)/10

    } else if (labelproductCode == dataservices[8].id){
      return dataservices[8].price * mult(labelWeight)/10

    } else if (labelproductCode == dataservices[9].id){
      return dataservices[9].price * mult(labelWeight)/10

    } else if (labelproductCode == dataservices[10].id){
      return dataservices[10].price * mult(labelWeight)/10

    } else if(labelproductCode == dataservices[11].id) {
      return dataservices[11].price * mult(labelWeight)/10

    } else if(labelproductCode == dataservices[12].id){
      return dataservices[12].price * mult(labelWeight)/10

    } else if (labelproductCode == dataservices[13].id){
      return dataservices[13].price * mult(labelWeight)/10

    } else if (labelproductCode == dataservices[14].id){
      return dataservices[14].price * mult(labelWeight)/10

    } else if (labelproductCode == dataservices[15].id){
      return dataservices[15].price * mult(labelWeight)/10

    } else if(labelproductCode == dataservices[16].id) {
      return dataservices[16].price * mult(labelWeight)/10

    } else if(labelproductCode == dataservices[17].id){
      return dataservices[17].price * mult(labelWeight)/10

    } else if (labelproductCode == dataservices[18].id){
      return dataservices[18].price * mult(labelWeight)/10

    } else if (labelproductCode == dataservices[19].id){
      return dataservices[19].price * mult(labelWeight)/10

    } else if (labelproductCode == dataservices[20].id){
      return dataservices[20].price * mult(labelWeight)/10

    } else if(labelproductCode == dataservices[21].id) {
      return dataservices[21].price * mult(labelWeight)/10

    } else if(labelproductCode == dataservices[22].id){
      return dataservices[22].price * mult(labelWeight)/10

    } else if (labelproductCode == dataservices[23].id){
      return dataservices[23].price * mult(labelWeight)/10

    } else if (labelproductCode == dataservices[24].id){
      return dataservices[24].price * mult(labelWeight)/10

    } else if (labelproductCode == dataservices[25].id){
      return dataservices[25].price * mult(labelWeight)/10

    } else if(labelproductCode == dataservices[26].id) {
      return dataservices[26].price * mult(labelWeight)/10

    } else if(labelproductCode == dataservices[27].id){
      return dataservices[27].price * mult(labelWeight)/10

    } else if (labelproductCode == dataservices[28].id){
      return dataservices[28].price * mult(labelWeight)/10

    } else if (labelproductCode == dataservices[29].id){
      return dataservices[29].price * mult(labelWeight)/10

    } else if (labelproductCode == dataservices[30].id){
      return dataservices[30].price * mult(labelWeight)/10
    }

  }
// this function get the description of the barcode



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

    } else if(labelproductCode == dataservices[6].id) {
      return dataservices[6].title

    } else if(labelproductCode == dataservices[7].id){
      return dataservices[7].title

    } else if (labelproductCode == dataservices[8].id){
      return dataservices[8].title

    } else if (labelproductCode == dataservices[9].id){
      return dataservices[9].title

    } else if (labelproductCode == dataservices[10].id){
      return dataservices[10].title

    } else if(labelproductCode == dataservices[11].id) {
      return dataservices[11].title

    } else if(labelproductCode == dataservices[12].id){
      return dataservices[12].title

    } else if (labelproductCode == dataservices[13].id){
      return dataservices[13].title

    } else if (labelproductCode == dataservices[14].id){
      return dataservices[14].title

    } else if (labelproductCode == dataservices[15].id){
      return dataservices[15].title

    } else if(labelproductCode == dataservices[16].id) {
      return dataservices[16].title

    } else if(labelproductCode == dataservices[17].id){
      return dataservices[17].title

    } else if (labelproductCode == dataservices[18].id){
      return dataservices[18].title

    } else if (labelproductCode == dataservices[19].id){
      return dataservices[19].title

    } else if (labelproductCode == dataservices[20].id){
      return dataservices[20].title
    }


  }

// passing the functions to variables to inject them in the http.post method
var totalpriceResult = totalPrice();
var totalprice = totalpriceResult.toFixed(1);
var itemdescription = descriptionFunction();


var price = myFunction();


console.log('here is the price', price);
console.log('here is the total price', totalprice);
console.log('here is the total description', itemdescription);

this.changeDetectorRefs.detectChanges();



    this.http.post('/api/barcodes/', {
      price: price,
      totalprice: totalprice,
      itemdescription: itemdescription,
      username: this.username,
      barcode: this.form.controls.barcode.value,
      orderDate: new Date()

    }).subscribe(res =>{

      if (res){
        console.log('this is res inthe sell component', res)
        this.changeDetectorRefs.detectChanges();
        console.log(this.barcodes);
        this.router.navigate(['/barcode-info']);
        // this will reset the form

        this.successSnackbar();

        this.form.reset();
        this.rerender();
      } else {
        this.snackBar.open(
          "The employee ID you entered is invalid, please try again.",
          "ERROR",

          {
            duration: 4000,
            verticalPosition: "top"
          }

        );
      }


    })
  })

  }

  // print(){
  //   this.http.get('api/barcodes/').subscribe(res =>{
  //     this.barcodes = res;
  //     console.log('this barcodes', this.barcodes)
  //   }), err =>{
  //     console.log(err)
  //   }
  //   const barcode = {

  //   }
  //   const dialogRef = this.dialog.open(PrintDialogComponent,{
  //     data: {
  //       barcode: barcode
  //     },
  //     disableClose: true,
  //     width: '800'
  //   });
  //   dialogRef.afterClosed().subscribe(result =>{

  //   })

  // }



}
