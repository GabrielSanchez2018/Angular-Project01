import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';



@Component({
  selector: 'app-time-edit',
  templateUrl: './time-edit.component.html',
  styleUrls: ['./time-edit.component.css']
})
export class TimeEditComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  form: FormGroup;
  time: any;
  timeId: any;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    // Set the minimum to January 1st 20 years in the past and December 31st a year in the future.
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);

    this.timeId = this.route.snapshot.paramMap.get('timeId');

    this.http.get('api/time').subscribe(res =>{
     this.time = res;
     console.log(this.time);
   }, err => {
     console.log(err);
   })
  // this.form.controls.description.setValue(this.time.description);
   //this.form.controls.time.setValue(this.time.time);

}


ngOnInit() {
 this.form = this.fb.group({
   description: [null, Validators.compose([Validators.required])],
   to:  new FormControl('', Validators.required)

 });

}

create() {
 const description = this.form.controls['description'].value;
 const date = this.form.controls['to'].value;

 const day = date.getUTCDate()
 const year = date.getUTCFullYear()
 const month = date.getMonth()




 console.log('this is the date', day + year + month )

 this.http.put('/api/time', {
   text: description,
   time: day + year + month
 }).subscribe(res => {
   this.router.navigate(['/timer']);
 }, err => {
   console.log(err);
 });
}

cancel() {
 this.router.navigate(['/admin']);
}
}
