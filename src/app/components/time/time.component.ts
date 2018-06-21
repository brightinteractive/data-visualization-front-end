import { Component, OnInit } from '@angular/core';
import { TimeService } from '../../services/time/time.service';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {

  public currentTime;

  constructor(private _timeService: TimeService) { }

  ngOnInit() {}

  getTime(){
    this._timeService.getTime()
    .subscribe(data => {
      this.currentTime = data;
      // Hold the correct value.
      console.log(this.currentTime);
    });
    //Value of time is undefined.
    console.log(this.currentTime);
  }

}
