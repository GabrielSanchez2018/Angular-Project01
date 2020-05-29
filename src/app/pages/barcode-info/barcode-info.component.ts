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
  displayedColumns = ['username', 'barcode', 'productcode','itemdescription', 'boxweight','priceperpound','total', 'functions'];
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
    this.username = this.cookieService.get('sessionuser');
    this.http.get('api/barcodes/').subscribe(res =>{
      this.barcodes = res;
      console.log(this.barcodes)
    }, err => {
      console.log(err);
    })

    this.http.get('api/services/').subscribe(res =>{
    this.services = res;
    console.log('here we are in services', this.services);
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
      this.http.delete('/api/barcodes/' + barcodeId).subscribe(res => {
        console.log('Barcode deleted');
        this.barcodes = this.barcodes.filter(q => q._id !== barcodeId);
        console.log(this.barcodes);
      });
    }
  });
 }
}
