import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ServiceCreateDeleteDialogComponent } from 'src/app/dialogs/service-create-delete-dialog/service-create-delete-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'app-purchases-by-service',
    templateUrl: './purchases-by-service.component.html',
    styleUrls: ['./purchases-by-service.component.css']
})
export class PurchasesByServiceComponent implements OnInit {
    purchases: any;
    data: any;
    itemCount = [];
    labels = [];
    code = [];
    displayedColumns = ['code','description','count'];
    displayedColumns01 = ['FirstName','LastName', 'Department','id','lineitems','total','date', 'functions'];
    username: any;
    invoices: any;

    constructor(private http: HttpClient,  private cookieService: CookieService, private dialog: MatDialog) {
        
        this.username = this.cookieService.get('sessionuser');
        this.http.get('api/invoices/' ).subscribe(res =>{
          this.invoices = res;
          console.log("this is the the invoices", this.invoices)
        }, err => {
          console.log(err);
        })
        // Call the purchases-graph API
        this.http.get('api/invoices/purchases-graph').subscribe(res => {
            // map the response data to the purchases variable
            this.purchases = res;
            console.log('this are the purchases',this.purchases)

            // Loop over the purchases to split out the services and item count
            for (const item of this.purchases) {
                this.labels.push(item._id.title);
                this.itemCount.push(item.count);
                this.code.push(item._id.code)
            }

            // Build the object literal for the primeNG bar graph

            this.data = {
                labels: this.labels, // label for services
                datasets: [
                    // Graph object
                    {
                        backgroundColor: [
                          '#ED0A3F',
                          '#FF8833',
                          '#5FA777',
                          '#0066CC',
                          '#6B3FA0',
                          '#AF593E',
                          '#6CDAE7',
                          '#00FFFF',
                          '#FF00FF',
                          '#FAEBD7',
                          '#CD853F',
                          "#e6ecff",
                          "#99b3ff",
                          "#3366ff",
                          "#660000"
                        ],
                        hoverBackgroundColor: [

                            '#0066CC',

                        ],
                        data: this.itemCount

                    },
                ]
            };
            // Verify the data objects structure matches primeNG's expected format
            console.log('Date object');
            console.log('this data',this.data);
        }, err => {
            console.log(err);
        });
    }
    ngOnInit() {
    }

    getTotalBoxes(){
      return this.purchases.map(t => t.count).reduce((acc, value) => acc + value, 0 );
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
