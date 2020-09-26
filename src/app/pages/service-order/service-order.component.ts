import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {InvoiceSummaryDialogComponent} from '../../dialogs/invoice-summary-dialog/invoice-summary-dialog.component';
import {FormBuilder, FormGroup, Validators, CheckboxControlValueAccessor} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';
import {SelectionModel} from '@angular/cdk/collections';
import { MatTableDataSource, MatSnackBar, MAT_CHECKBOX_CLICK_ACTION } from '@angular/material';
interface Item {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-service-order',
  templateUrl: './service-order.component.html',
  styleUrls: ['./service-order.component.css']
})
export class ServiceOrderComponent implements OnInit {
//services = new MatTableDataSource<ServiceRepairComponent>(this.services);
selection = new SelectionModel<ServiceOrderComponent>(true, []);
selectedValue: string;
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
  mySelections: string[];
  //checked: boolean = true;

  items: Item[] = [
    {value: "", viewValue: '1 Box'},
    {value: "Two", viewValue: '2 Boxes'},

  ];








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



    }

    const numRows = this.services;
    return numSelected === numRows;

  }


  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear():
        this.services.forEach(row => this.selection.select(row));

  }

  checkboxLabel(row?: ServiceOrderComponent): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
     `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;


  }


  ngOnInit() {
    this.form = this.fb.group({
      value: [null, Validators.compose([Validators.required])],
      //selectedValue: [null, Validators.compose([Validators.required])],
      alternator: [null, null]
    });
    console.log('this is the test here',)
  }
  verdad() {

    var sopas = this.selection.selected.length
    if(sopas > 2)
    console.log('number of selected ids', sopas)


    return true
    //return this.selection.selected.map(t => t.id).reduce((acc, value) => acc + value, 0);
  }

  submit(form) {

    console.log('this is the form value', form.checkGroup)
console.log('esto', this.selectedValue)
  //console.log('esto',)
    const selectedServiceIds = [];
    for (const [key, value] of Object.entries(this.selection.selected)) {

      if (value) {

        console.log('this value', value.id)
        selectedServiceIds.push({
          id: value.id,
          amount: form.checkGroup

        });
      }
    }

    const lineItems = [];


      var selectedItems = selectedServiceIds.length
      if(selectedItems > 2){
        this.selection.clear();
        return this.snackBar.open(
          "Please Select Only Two Items | Por favor solo selecciona dos.",
          "ERROR",
          {
            duration: 7000,
            verticalPosition: "top"
          }

        );

      }

      

      /**
       * This if statement shows the Quantity area if is true or false.
       */
      if(selectedItems <2 ){
        this.show = true
        console.log('this is this.show', this.show)
      }

      

    /**
     * Build the invoice object
     */
    for (const savedService of this.services) {

      for (const selectedService of selectedServiceIds) {
        if (savedService.id == selectedService.id) {

          /**
           *  This variable is the amount of boxes selected by the user when thy choose 1 item in the table
           *and they want two
           */
          var boxesChosen = this.selectedValue;
          console.log('amount of boxes', boxesChosen )
          /**
           * if the amount of boxes matches two, and additional array will be inserted into the database
           * to have an accourate count of boxes.
           *
           */
      




          if ( boxesChosen == "Two"){
            lineItems.push({
            title: savedService.title,
            price: savedService.price,
            extimate: savedService.extimate,
            id: savedService.id,
            });
            lineItems.push({
              title: savedService.title,
              price: savedService.price,
              extimate: savedService.extimate,
              id: savedService.id,
              })

          } else {
            lineItems.push({
              title: savedService.title,
              price: savedService.price,
              extimate: savedService.extimate,
              id: savedService.id,
            });
          }



        }
      }
    }
    /**
      * Build the invoice object
     */

    console.log("here we are again in line items two", lineItems);
    const lineItemTotal = lineItems.reduce((prev, cur) => prev + cur.extimate, 0);
    const total = lineItemTotal;

    const invoice = {
      lineItems: lineItems,
      lineItemTotal: lineItemTotal,
      total: total,
      username: this.username,
      orderDate: new Date()
    };
   

    
    console.log('invoice line items',invoice.lineItems.length);

    const dialogRef = this.dialog.open(InvoiceSummaryDialogComponent, {
      data: {
        invoice: invoice
      },
      disableClose: true,
      width: '800px'
    });

    if(invoice.lineItems.length > 2){
      dialogRef.close()
      this.selection.clear();
        return this.snackBar.open(
          "You have selected more than 2 Items | Try again",
          "ERROR",
          {
            duration: 7000,
            verticalPosition: "top"
          }

        );
    }

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        console.log('Invoice saved');
        this.http.post('/api/invoices/' + invoice.username.toUpperCase(), {
          lineItems: invoice.lineItems,
          lineItemTotal: invoice.lineItemTotal,
          total: invoice.total,
          orderDate: invoice.orderDate
        }).subscribe(res => {

          this.router.navigate(['/']);

          setTimeout(function(){
            window.location.href = "http://localhost:4200/#/session/sign-in-employee";
            document.cookie = "sessionuser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          },22000);
        }, err => {
          console.log(err);
        });
      }
    });
  }


}

