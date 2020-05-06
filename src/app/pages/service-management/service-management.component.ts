
import { Component, OnInit } from '@angular/core';
import {InvoiceSummaryDialogComponent} from '../../dialogs/invoice-summary-dialog/invoice-summary-dialog.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';
import { ServiceCreateDeleteDialogComponent } from 'src/app/dialogs/service-create-delete-dialog/service-create-delete-dialog.component';


@Component({
  selector: 'app-service-management',
  templateUrl: './service-management.component.html',
  styleUrls: ['./service-management.component.css']
})
export class ServiceManagementComponent implements OnInit {
  services: any;
  displayedColumns = ['description', 'functions']

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.http.get('api/services').subscribe(res =>{
      this.services = res;
      console.log(this.services);
    }, err => {
      console.log(err);
    })
  }

ngOnInit(){

}

delete(serviceId) {
  const dialogRef = this.dialog.open(ServiceCreateDeleteDialogComponent, {
    data: {
      serviceId
    },
    disableClose: true,
    width: '800px'
  });

  dialogRef.afterClosed().subscribe(result =>{
    if (result === 'confirm'){
      this.http.delete('/api/services/' + serviceId).subscribe(res => {
        console.log('Service deleted');
        this.services = this.services.filter(q => q._id !== serviceId);
        console.log(this.services);
      });
    }
  });
}
}
