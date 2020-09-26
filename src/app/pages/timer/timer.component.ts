/***
 * 
 * Author: Gabriel Sanchez 
 * Date: 9/26/2020
 * Description: This component will get a day number from the year (0-365 | 366). 
 * The ordering service will desapear after the last date is set up, this is 
 * to stop employees from placing orders after the last date. 
 * 
 */

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

import { ServiceCreateDeleteDialogComponent } from 'src/app/dialogs/service-create-delete-dialog/service-create-delete-dialog.component';
import { MatDialog } from '@angular/material';
import { Time } from '@angular/common';

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
  displayedColumns1 = [ 'time','functions'];

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


    console.log('this is the date we want to edit', date)

    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    let diff = Math.abs( now.valueOf() - start.valueOf());
    var oneday = 1000 * 60 * 60* 24;

    var dayy = Math.floor(  oneday / diff);
    console.log('this is the differnce 0000', dayy)



    var diffe = Math.abs( start.valueOf()- date.valueOf());
    var lastdate = Math.floor(diffe / (1000 * 3600 * 24));

    console.log('last day set up', lastdate)
    var setOnemoreday =  1;
    console.log('this is one more day', setOnemoreday)





    console.log('this is the date', day + year + month )

    this.http.post('/api/time', {
      text: description,
      time: lastdate + setOnemoreday,
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

