import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sell-report',
  templateUrl: './sell-report.component.html',
  styleUrls: ['./sell-report.component.css']
})
export class SellReportComponent implements OnInit {

  ventas: any;
    data: any;
    itemCount = [];
    labels = [];

    constructor(private http: HttpClient) {
        // Call the purchases-graph API
        this.http.get('api/barcodes/barcodes-graph').subscribe(res => {
            // map the response data to the purchases variable
            this.ventas = res;
            console.log(this.ventas)
            // Loop over the purchases to split out the services and item count
            for (const item of this.ventas) {
                this.labels.push(item._id.title);
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
}
