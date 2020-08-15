// import { Component, OnInit } from '@angular/core';
// import {  FormBuilder, Validators, FormGroup } from '@angular/forms';
// import { MatDatepickerInputEvent } from '@angular/material';
// import { ViewEncapsulation} from '@angular/core';
// import {MatCalendarCellCssClasses} from '@angular/material/datepicker';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-timer',
//   templateUrl: './timer.component.html',
//   styleUrls: ['./timer.component.css'],
// })
// export class TimerComponent implements OnInit {
//   dateClass = (d: Date): MatCalendarCellCssClasses => {
//     const date = d.getDate();

//     // Highlight the 1st and 20th day of each month.
//     return (date === 1 || date === 20) ? 'example-custom-date-class' : '';


//   }


//   public now: Date = new Date();

//   events: string[] = [];
//   form: FormGroup;




//   time: any;
//   show: boolean = true;






//   constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) {

//     console.log('this is the timer',this.events)
//     console.log('this is the date')



//     // setInterval(() => {
//     //   this.now = new Date();
//     // }, 1);
//     // console.log(this.now.getDay())


//   }
//   ngOnInit() {
//     this.form = this.fb.group({
//       text: [null, Validators.compose([Validators.required])]
//     });
//   }


//   create() {
//     const t = this.form.controls['text'].value;

//     this.http.post('/api/time', {
//       text: t
//     }).subscribe(res => {
//       //this.router.navigate(['/admin']);
//     }, err => {
//       console.log(err);
//     });
//   }






// }


import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})

export class TimerComponent implements OnInit {
  form: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      description: [null, Validators.compose([Validators.required])]
    });
  }

  create() {
    const description = this.form.controls['description'].value;

    this.http.post('/api/time', {
      text: description
    }).subscribe(res => {
      this.router.navigate(['/admin']);
    }, err => {
      console.log(err);
    });
  }

  cancel() {
    this.router.navigate(['/admin']);
  }
}
