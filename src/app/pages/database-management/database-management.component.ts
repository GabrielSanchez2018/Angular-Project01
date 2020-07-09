import { Component, OnInit } from '@angular/core';
import { ServiceCreateDeleteDialogComponent } from 'src/app/dialogs/service-create-delete-dialog/service-create-delete-dialog.component';
import { HttpClient } from '@angular/common/http';
import { ExporterService } from 'src/app/services/exporter/exporter.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-database-management',
  templateUrl: './database-management.component.html',
  styleUrls: ['./database-management.component.css']
})
export class DatabaseManagementComponent implements OnInit {

  barcodes: any;
  invoices: any;


  constructor(private http: HttpClient, private exportService: ExporterService, private dialog: MatDialog ) {
    this.http.get('api/barcodes/').subscribe(res =>{
      this.barcodes = res;
    }), err =>{
      console.log(err)
    }
    this.http.get('api/invoices/').subscribe(res =>{
      this.invoices = res;
    }), err =>{
      console.log(err)
    }


   }




  ngOnInit() {
  }

  delete(alldelete) {
    const dialogRef = this.dialog.open(ServiceCreateDeleteDialogComponent, {
      data: {
        alldelete
      },
      disableClose: true,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result =>{
      if (result === 'confirm'){
        this.http.delete('/api/barcodes/alldelete' ).subscribe(res => {
          console.log('Barcode deleted');

          //this.barcodes = this.barcodes.filter(q => q._id !== barcodeId);
          console.log(this.barcodes);
        });
      }
    });
   }

   deleteInvoice(alldelete) {
    const dialogRef = this.dialog.open(ServiceCreateDeleteDialogComponent, {
      data: {
        alldelete
      },
      disableClose: true,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result =>{
      if (result === 'confirm'){
        this.http.delete('/api/invoices/alldelete' ).subscribe(res => {
          console.log('Barcode deleted');

          //this.barcodes = this.barcodes.filter(q => q._id !== barcodeId);
          console.log(this.barcodes);
        });
      }
    });
   }



}
