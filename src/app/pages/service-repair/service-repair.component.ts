import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {InvoiceSummaryDialogComponent} from '../../dialogs/invoice-summary-dialog/invoice-summary-dialog.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';
import {SelectionModel} from '@angular/cdk/collections';
import { MatTableDataSource, MatSnackBar } from '@angular/material';



@Component({
  selector: 'app-service-repair',
  templateUrl: './service-repair.component.html',
  styleUrls: ['./service-repair.component.css']
})
export class ServiceRepairComponent implements OnInit {
//services = new MatTableDataSource<ServiceRepairComponent>(this.services);
selection = new SelectionModel<ServiceRepairComponent>(true, []);

  displayedColumns = ['select','id', 'title', 'price', 'extimate'];
  username: string;
  form: FormGroup;
  description: string;
  price: number;
  service: any;
  invoice: any;
  id: any;
 //selection: any;
  position: number;
  dataSource: any;
  services: any;
  show: boolean = true;




  constructor(private http: HttpClient, private cookieService: CookieService, private fb: FormBuilder,
    private dialog: MatDialog, private router: Router, private snackBar: MatSnackBar , private cd: ChangeDetectorRef) {
      this.username = this.cookieService.get('sessionuser');
    // this api wil get the services
    this.http.get('api/services').subscribe(res =>{
      this.services = res;
    }, err => {
      console.log(err);

    })


  }
  isAllSelected() {

    const numSelected = this.selection.selected.length;
    if(numSelected > 1){
      this.show = false
      
    } else {
      this.show = true
      this.cd.detectChanges();
    }

    const numRows = this.services;
    return numSelected === numRows;
  }


  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.services.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: ServiceRepairComponent): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;

  }

  ngOnInit() {
    this.form = this.fb.group({
      value: [null, Validators.compose([Validators.required])],
      //labor: [null, Validators.compose([Validators.required])],
      //alternator: [null, null]

    });

  }
  verdad() {

    var sopas = this.selection.selected.length
    if(sopas > 2)
    console.log('number of selected ids', sopas)


    return true
    //return this.selection.selected.map(t => t.id).reduce((acc, value) => acc + value, 0);
  }


  submit(form) {
  console.log('esto', this.selection.selected)
  console.log('esto',)
    const selectedServiceIds = [];
    for (const [key, value] of Object.entries(this.selection.selected)) {
      if (value) {
        console.log('this value', value.id)
        selectedServiceIds.push({
          id: value.id
        });
      }
    }
console.log('selectedservises', selectedServiceIds)
    const lineItems = [];

    console.log("We are here in items", lineItems)

    console.log('number of selected ids',selectedServiceIds.length)

    // This will prevent the user to select more than 2 items
      var selectedItems = selectedServiceIds.length
      if(selectedItems > 2){
        return this.snackBar.open(
          "Please Select Only Two Items | Por favor solo selecciona dos.",
          "ERROR",
          {
            duration: 7000,
            verticalPosition: "top"
          }
        );
      }
// show the Quantity field
      if(selectedItems <2 ){
        this.show = true
        console.log('this is this.show', this.show)
      }


    /**
     * Build the invoice object
     */
    for (const savedService of this.services) {
      console.log("here is the savedService.id",savedService)
      for (const selectedService of selectedServiceIds) {
        console.log("here is the selectedservicesisisisid",selectedService.id)
        console.log("here is the savedService.id",savedService.id)

        if (savedService.id == selectedService.id) {
          lineItems.push({
            title: savedService.title,
            price: savedService.price,
            extimate: savedService.extimate,
            id: savedService.id

          });
        }
      }
    }
    /**
      * Build the invoice object
     */

    console.log("here we are again in line items two", lineItems);
    const partsAmount = parseFloat(form.parts);
    const laborAmount = form.labor * 50;
    const lineItemTotal = lineItems.reduce((prev, cur) => prev + cur.price, 0);
    const total = partsAmount + laborAmount + lineItemTotal;

    const invoice = {
      lineItems: lineItems,
      partsAmount: partsAmount,
      laborAmount: laborAmount,
      lineItemTotal: lineItemTotal,
      total: total,
      username: this.username,
      orderDate: new Date()
    };
    console.log(invoice);

    const dialogRef = this.dialog.open(InvoiceSummaryDialogComponent, {
      data: {
        invoice: invoice
      },
      disableClose: true,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        console.log('Invoice saved');

        this.http.post('/api/invoices/' + invoice.username, {
          lineItems: invoice.lineItems,
          partsAmount: invoice.partsAmount,
          laborAmount: invoice.laborAmount,
          lineItemTotal: invoice.lineItemTotal,
          total: invoice.total,
          orderDate: invoice.orderDate
        }).subscribe(res => {
          this.router.navigate(['/']);
        }, err => {
          console.log(err);
        });
      }
    });
  }


}


// import { Component, OnInit } from '@angular/core';
// import {InvoiceSummaryDialogComponent} from '../../dialogs/invoice-summary-dialog/invoice-summary-dialog.component';
// import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {Router} from '@angular/router';
// import {MatDialog} from '@angular/material/dialog';
// import {CookieService} from 'ngx-cookie-service';
// import {HttpClient} from '@angular/common/http';

// @Component({
//   selector: 'app-service-repair',
//   templateUrl: './service-repair.component.html',
//   styleUrls: ['./service-repair.component.css']
// })
// export class ServiceRepairComponent implements OnInit {
//   form: FormGroup;
//   username: string;

//   services = [
//     {title: 'Password Reset', price: 39.99, id: '101'},
//     {title: 'Spyware Removal', price: 99.9, id: '102'},
//     {title: 'RAM Upgrade', price: 129.99, id: '103'},
//     {title: 'Software Installation', price: 49.99, id: '104'},
//     {title: 'PC Tune-up', price: 89.99, id: '105'},
//     {title: 'Keyboard Cleaning', price: 45.00, id: '106'},
//     {title: 'Disk Clean-up', price: 149.99, id: '107'}
//   ];

//   constructor(private http: HttpClient, private cookieService: CookieService, private fb: FormBuilder,
//               private dialog: MatDialog, private router: Router) {

//     // get the username
//     this.username = this.cookieService.get('sessionuser');
//   }

//   ngOnInit() {
//     this.form = this.fb.group({
//       parts: [null, Validators.compose([Validators.required])],
//       labor: [null, Validators.compose([Validators.required])],
//       alternator: [null, null]
//     });
//   }

//   submit(form) {
//     console.log(form);
//     console.log("Here we are at form", form)
//     const selectedServiceIds = [];
//     for (const [key, value] of Object.entries(form.checkGroup)) {
//       if (value) {
//         selectedServiceIds.push({
//           id: key
//         });
//       }
//     }

//     const lineItems = [];

//     console.log("Here we are at lineitems", lineItems)

//     /**
//      * Build the invoice object
//      */
//     for (const savedService of this.services) {
//       for (const selectedService of selectedServiceIds) {
//         if (savedService.id === selectedService.id) {
//           lineItems.push({
//             title: savedService.title,
//             price: savedService.price

//           });
//         }
//       }
//     }
//     console.log(lineItems);
//     const partsAmount = parseFloat(form.parts);
//     const laborAmount = form.labor * 50;
//     const lineItemTotal = lineItems.reduce((prev, cur) => prev + cur.price, 0);
//     const total = partsAmount + laborAmount + lineItemTotal;

//     const invoice = {
//       lineItems: lineItems,
//       partsAmount: partsAmount,
//       laborAmount: laborAmount,
//       lineItemTotal: lineItemTotal,
//       total: total,
//       username: this.username,
//       orderDate: new Date()
//     };
//     console.log(invoice);

//     const dialogRef = this.dialog.open(InvoiceSummaryDialogComponent, {
//       data: {
//         invoice: invoice
//       },
//       disableClose: true,
//       width: '800px'
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result === 'confirm') {
//         console.log('Invoice saved');

//         this.http.post('/api/invoices/' + invoice.username, {
//           lineItems: invoice.lineItems,
//           partsAmount: invoice.partsAmount,
//           laborAmount: invoice.laborAmount,
//           lineItemTotal: invoice.lineItemTotal,
//           total: invoice.total,
//           orderDate: invoice.orderDate
//         }).subscribe(res => {
//           this.router.navigate(['/']);
//         }, err => {
//           console.log(err);
//         });
//       }
//     });
//   }
// }
