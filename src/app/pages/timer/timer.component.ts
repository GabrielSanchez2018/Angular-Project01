import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  public now: Date = new Date();

  events: string[] = [];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }


  time: any;
  show: boolean = true;






  constructor() {
    console.log('this is the timer',this.events)
    console.log('this is the date')


    setInterval(() => {
      this.now = new Date();
    }, 1);
    console.log(this.now.getDay())


  }

  ngOnInit() {

    console.log('events',this.events)
  }

}
