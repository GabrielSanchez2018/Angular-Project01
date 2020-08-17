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
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { time } from 'console';
import { ServiceCreateDeleteDialogComponent } from 'src/app/dialogs/service-create-delete-dialog/service-create-delete-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})

export class TimerComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  form: FormGroup;
  time: any;
  // displayedColumns = ['id','description', 'time','functions'];
  displayedColumns = [ 'time','functions'];

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private dialog: MatDialog) {
       // Set the minimum to January 1st 20 years in the past and December 31st a year in the future.
       const currentYear = new Date().getFullYear();
       this.minDate = new Date(currentYear - 20, 0, 1);
       this.maxDate = new Date(currentYear + 1, 11, 31);


       this.http.get('api/time').subscribe(res =>{
        this.time = res;
        console.log(this.time);
      }, err => {
        console.log(err);
      })


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
    console.log('date', date)

    const day = date.getUTCDate()
    const year = date.getUTCFullYear()
    const month = date.getMonth()




    console.log('this is the date', day + year + month )

    this.http.post('/api/time', {
      text: description,
      time: day + year + month,
      time1: date
    }).subscribe(res => {
      this.time = this.time.concat([res]);

    }, err => {
      console.log(err);
    });
  }

  cancel() {
    this.router.navigate(['/admin']);
  }
  delete(timeId) {
    const dialogRef = this.dialog.open(ServiceCreateDeleteDialogComponent, {
      data: {
        timeId
      },
      disableClose: true,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result =>{
      if (result === 'confirm'){
        this.http.delete('/api/time/' + timeId).subscribe(res => {
          console.log('Time deleted');
          if(Array.isArray(this.time)){
            this.time = this.time.filter(q => q._id !== timeId);
          }

          console.log(this.time);
        });
      }
    });
   }


}

