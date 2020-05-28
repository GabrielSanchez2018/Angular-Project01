import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {

  form: FormGroup;
  username: string;
  invoices: Object;
  services: Object;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private cookieService: CookieService) {
    this.username = this.cookieService.get('sessionuser');
    this.http.get('api/invoices/' ).subscribe(res =>{
      this.invoices = res;
    }, err => {
      console.log(err);
    })

    this.http.get('api/services/').subscribe(res =>{
      this.services = res;
      console.log('yest',this.services);
      console.log(res)
    }), err => {
      console.log(err);
    }
  }


  ngOnInit() {
    this.form = this.fb.group({
      barcode: [null, Validators.compose([Validators.required])]
    });
  }


  create(){
    this.http.post('/api/barcodes/' + this.username + '/barcode', {
      barcode: this.form.controls.barcode.value,
    }).subscribe(res =>{
      this.router.navigate(['/barcode-info']);
    })
  }

}
