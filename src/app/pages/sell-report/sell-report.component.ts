import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataSource } from '@angular/cdk/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatDialog} from '@angular/material';
import * as XLSX from "xlsx";
import {ExporterService} from '../../services/exporter/exporter.service';
import { ServiceCreateDeleteDialogComponent } from 'src/app/dialogs/service-create-delete-dialog/service-create-delete-dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sell-report',
  templateUrl: './sell-report.component.html',
  styleUrls: ['./sell-report.component.css']
})
export class SellReportComponent implements OnInit {
  displayedColumns = ['code','itemdescription', 'totalboxes','totalweight', 'totalprice'];
  displayedColumnsOne = ['username', 'barcode', 'productcode','itemdescription', 'boxweight','priceperpound','total', 'functions'];
  displayedColumnsTwo = ['username','total', 'functions'];
  ventas: any;
    data: any;
    itemCount = [];
    labels = [];
  barcodes: any;
  orderssum: any;

  dataSource = new MatTableDataSource(this.barcodes);
  username: string;
  employees: Object;
  leftover: any;


   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log('filter', this.dataSource.filter)
  }





    constructor(private http: HttpClient, private exportService: ExporterService, private dialog: MatDialog , private cookieService: CookieService ) {

      this.username = this.cookieService.get('paysession');
      this.http.get('/api/employees/' + this.username).subscribe(res =>{
        this.employees = res
        console.log('employees', this.employees)
      }), err =>{
        console.log(err)

      }
/***
 * Left Over report
 */
      this.http.get('/api/leftover/leftover-report' ).subscribe(res =>{
        this.leftover = res
        console.log('leftover', this.leftover)
      }), err =>{
        console.log(err)

      }

      this.http.get('api/barcodes/').subscribe(res =>{
        this.barcodes = res;
      }), err =>{
        console.log(err)
      }

      this.http.get('api/barcodes/order-sum').subscribe(res =>{
        this.orderssum = res;
        console.log('here are the hr', this.orderssum)
      }), err =>{
        console.log(err)
      }
        // Call the purchases-graph API
        this.http.get('api/barcodes/barcodes-graph').subscribe(res => {
            // map the response data to the purchases variable
            this.ventas = res;
            console.log(this.ventas)
            // Loop over the purchases to split out the services and item count
            for (const item of this.ventas) {
                this.labels.push(item._id);
                this.itemCount.push(item.count);
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
                            "#66ffcc",



                        ],
                        data: this.itemCount
                    },
                ]
            };
            // Verify the data objects structure matches primeNG's expected format
            console.log('Date object');
            console.log(this.data);
        }, err => {
            console.log(err);
        });
    }
    ngOnInit() {

    }


    exportAsXLSX(): void{
      this.exportService.exportToExcel(this.ventas , 'Credit_Report');
    }

    exportAsXLSXThird(): void{
      this.exportService.exportToExcel(this.orderssum , 'Scanned_Items');
    }

    exportAsXLSXAll(): void{
      this.exportService.exportToExcel(this.barcodes , 'Scanned_Items');
    }


    /***
     * Filter Functions
     */

    getTotalCost() {

      return this.barcodes.map(t => t.totalprice).reduce((acc, value) => acc + value, 0);
    }

    getTotalWeight(){
      var weight =  this.ventas.map(t => t.totalweight).reduce((acc, value) => acc + value, 0 );
      return weight.toFixed(2)


    }

    getTotalBoxes(){
      return this.ventas.map(t => t.count).reduce((acc, value) => acc + value, 0);
    }

    regularNumber(){
      var x = x.lenght();
      return x
    }
/***
 * Filter Funtions for the leftover data table
 */
    getLeftoverTotalBoxes(){
          return this.leftover.map(t => t.count).reduce((acc, value) => acc + value, 0);
        }

    getLeftoverTotalWeight(){
      var weight =  this.leftover.map(t => t.totalweight).reduce((acc, value) => acc + value, 0 );
      return weight.toFixed(2)
    }
    getLeftoverTotalCost(){
      var weight =  this.leftover.map(t => t.totalprice).reduce((acc, value) => acc + value, 0 );
      return weight.toFixed(2)


    }


    //Delete function
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
            if(Array.isArray(this.barcodes)){
              this.barcodes = this.barcodes.filter(q => q._id !== barcodeId);
            }
            //this.barcodes = this.barcodes.filter(q => q._id !== barcodeId);
            console.log(this.barcodes);
          });
        }
      });
     }



}
