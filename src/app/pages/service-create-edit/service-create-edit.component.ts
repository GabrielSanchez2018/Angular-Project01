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

    this.http.get('api/service' + this.serviceId).subscribe(res =>{
      this.serviceId = res;
    }, err => {
      console.log(err);
    }, () =>{
      this.form.controls.description.setValue(this.service.description);
      this.form.controls.price.setValue(this.service.price);
    });
  }


  ngOnInit() {
    this.form = this.fb.group({
      description: [null, Validators.compose([Validators.required])],
      price: [null, Validators.compose([Validators.required])]
    })
  }

  saveService(){
    this.http.put('/api/service/' + this.serviceId, {
      description: this.form.controls.description.value,
      price: this.form.controls.price.value
    })
  }

  cancel(){
    this.router.navigate(['/services'])
  }

}
