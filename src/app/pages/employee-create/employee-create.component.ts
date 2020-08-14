import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  form: any;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      data: [null, Validators.compose([Validators.required])]
    });
  }

  create() {
    const texts = this.form.controls['data'].value;

    console.log('Employee Create page: ',texts)

    this.http.post('/api/employees', {
    data: texts
    }).subscribe(res => {
      //this.router.navigate(['/admin']);
    }, err => {
      console.log(err);
    });
  }


}
