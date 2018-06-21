import { Component, OnInit } from '@angular/core';
import { TimeService } from '../../services/time/time.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {

  currentTime$: Object;

  constructor(private data: TimeService) { }

  ngOnInit() {
    this.data.getTime().subscribe(
      data => this.currentTime$ = data
    );
  }
  
}
