
import { Component, OnInit } from '@angular/core';
import {InvoiceSummaryDialogComponent} from '../../dialogs/invoice-summary-dialog/invoice-summary-dialog.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';



@Component({
  selector: 'app-service-repair',
  templateUrl: './service-repair.component.html',
  styleUrls: ['./service-repair.component.css']
})
export class ServiceRepairComponent implements OnInit {
  displayedColumns = ['description', 'functions'];
  username: string;
  form: FormGroup;
  description: string;
  price: number;
  services: any;





  constructor(private http: HttpClient, private cookieService: CookieService, private fb: FormBuilder,
    private dialog: MatDialog, private router: Router) {
      this.username = this.cookieService.get('sessionuser');
    // this api wil get the services
    this.http.get('api/services').subscribe(res =>{
      this.services = res,

      console.log(this.services);
    }, err => {
      console.log(err);

    })
  }

  ngOnInit() {
    this.form = this.fb.group({
      description: [null, Validators.compose([Validators.required])],
      price: [null, Validators.compose([Validators.required])],
      parts: [null, Validators.compose([Validators.required])],
      labor: [null, Validators.compose([Validators.required])],
      alternator: [null, null]
    });
  }

  submit(form) {
    console.log(form);
    const selectedServiceIds = [];
    for (const [key, value] of Object.entries(form.checkGroup)) {
      if (value) {
        selectedServiceIds.push({
          id: key
        });
      }
    }

    const lineItems = [];

    /**
     * Build the invoice object
     */
    for (const savedService of this.services) {
      for (const selectedService of selectedServiceIds) {
        if (savedService.id === selectedService.id) {
          lineItems.push({
            title: savedService.title,
            price: savedService.price
          });
        }
      }
    }
    console.log(lineItems);
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
