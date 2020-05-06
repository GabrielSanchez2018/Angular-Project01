import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-service-create',
  templateUrl: './service-create.component.html',
  styleUrls: ['./service-create.component.css']
})
export class ServiceCreateComponent implements OnInit {
  form: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      description: [null, Validators.compose([Validators.required])],
      price: [null, Validators.compose([Validators.required])]
    });
  }

  create() {
    // I add services because in the Services API i have it set up as services
    const description = this.form.controls['description'].value;
    const price = this.form.controls['price'].value;

    this.http.post('/api/services', {
      description: description,
      price: price
    }).subscribe(res =>{
      this.router.navigate(['/service-management']);
    }, err => {
      console.log(err)
    });
  }

  cancel() {
    this.router.navigate(['/service-management'])
  }

}
