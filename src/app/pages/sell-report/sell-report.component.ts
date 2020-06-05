import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataSource } from '@angular/cdk/table';
import {MatTableDataSource} from '@angular/material';
import * as XLSX from "xlsx";
import {ExporterService} from '../../services/exporter/exporter.service';

@Component({
  selector: 'app-sell-report',
  templateUrl: './sell-report.component.html',
  styleUrls: ['./sell-report.component.css']
})
export class SellReportComponent implements OnInit {
  displayedColumns = ['code','itemdescription', 'totalboxes','totalweight', 'totalprice']
  ventas: any;
    data: any;
    itemCount = [];
    labels = [];
  dataSource: any;
  barcodes: Object;





    constructor(private http: HttpClient, private exportService: ExporterService  ) {

      this.http.get('api/barcodes/').subscribe(res =>{
        this.barcodes = res;
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
                this.labels.push(item.itemdescription);
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
                        ],
                        hoverBackgroundColor: [
                            '#ED0A3F',
                            '#FF8833',
                            '#5FA777',
                            '#0066CC',
                            '#6B3FA0',
                            '#AF593E',
                            '#6CDAE7',
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
      this.exportService.exportToExcel(this.ventas , 'Total_Items');
    }

}
