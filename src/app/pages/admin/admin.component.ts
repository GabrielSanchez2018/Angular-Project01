import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExporterService } from 'src/app/services/exporter/exporter.service';
import { MatDialog } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  barcodes: any;
  ventas: any;
  leftover: any;

  constructor(private http: HttpClient, private exportService: ExporterService, private dialog: MatDialog , private cookieService: CookieService) {
    this.http.get('api/barcodes/').subscribe(res =>{
      this.barcodes = res;
    }), err =>{
      console.log(err)
    }

    this.http.get('api/barcodes/barcodes-graph').subscribe(res =>{
      this.ventas = res;
      console.log('here are the hr', this.ventas)
    }), err =>{
      console.log(err)
    }

    this.http.get('/api/leftover/leftover-report' ).subscribe(res =>{
      this.leftover = res
      console.log('leftover', this.leftover)
    }), err =>{
      console.log(err)

    }


   }

  ngOnInit() {
  }
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




}
