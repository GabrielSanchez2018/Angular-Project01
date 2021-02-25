import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-service-create-edit',
  templateUrl: './service-create-edit.component.html',
  styleUrls: ['./service-create-edit.component.css']
})
export class ServiceCreateEditComponent implements OnInit {
  service: any;
  serviceId: any;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private router: Router) {
    this.serviceId = this.route.snapshot.paramMap.get('serviceId');

    this.http.get('api/services/' + this.serviceId).subscribe(res => {
      this.service = res;
    }, err => {
      console.log(err);
    }, () => {
      this.form.controls.title.setValue(this.service.title);
      this.form.controls.price.setValue(this.service.price);
      this.form.controls.extimate.setValue(this.service.extimate);
      this.form.controls.id.setValue(this.service.id)
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: [null, Validators.compose([Validators.required])],
      price: [null, Validators.compose([Validators.required])],
      extimate: [null, Validators.compose([Validators.required])],
      id: [null, Validators.compose([Validators.required])],
    });
  }

  saveService() {
    var id = this.form.controls['id'].value;
    var newid = id.toString()

    if( newid.length > 5){
     var newid = newid.slice(1,6)
    }

    this.http.put('/api/services/' + this.serviceId, {
      title: this.form.controls.title.value,
      price: this.form.controls.price.value,
      extimate: this.form.controls.extimate.value,
      id: newid
    }).subscribe(res => {
      this.router.navigate(['/service-management']);
    });
  }

  cancel() {
    this.router.navigate(['/service-management']);
  }

}
