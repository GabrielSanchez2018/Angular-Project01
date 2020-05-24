import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {

  form: FormGroup;
  username: string;
  cookieService: any;
  invoices: Object;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) {



  }


  ngOnInit() {
    this.form = this.fb.group({
      barcode: [null, Validators.compose([Validators.required])]
    });
  }

  create(){
    this.http.post('/api/invoices/' + this.username +'/barcode', {
      barcode: this.form.controls.barcode.value,
    }).subscribe(res =>{
      this.router.navigate(['/barcode-info']);
    })
  }

}
