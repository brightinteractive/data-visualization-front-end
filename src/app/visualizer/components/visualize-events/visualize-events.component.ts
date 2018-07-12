import {Component, OnInit} from '@angular/core';
import {VisualizeEventsService} from '../../services/visualize-events.service';
import {take} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../../shared/validators/customValidators';
import {Chart} from 'chart.js';
import * as moment from 'moment';

@Component({
  selector: 'app-visualize-events',
  templateUrl: './visualize-events.component.html',
  styleUrls: ['./visualize-events.component.css']
})
export class VisualizeEventsComponent implements OnInit {

  events: Event[];
  eventForm: FormGroup;
  chart = [];

  constructor(private visualizeEventService: VisualizeEventsService, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.eventForm = this.fb.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]]
    }, {
      validator: Validators.compose([
        CustomValidators.dateLessThan('startDate', 'endDate', {'endDateIsBeforeStartDate': true}),
      ])
    });
  }

  onSubmit() {
    const startDate = new Date(this.eventForm.get('startDate').value);
    const endDate = new Date(this.eventForm.get('endDate').value);
    endDate.setDate(endDate.getDate() + 1);
    this.visualizeEventService.getEventsBetweenDateRange(startDate.getTime(), endDate.getTime())
      .pipe(take(1))
      .subscribe(value => this.events = value);
    this.generateChart(startDate, endDate);
  }


  private generateChart(startDate, endDate) {
    // const labels = this.calculateXAxis(startDate, endDate);
    // const data = this.calculateYAxis(labels.length, startDate);

    const labels = [moment(), moment().add(1), moment().add(2)];
    const data = [1, 2, 3];

    this.plotGraph(data, labels);
  }

  private calculateYAxis(length, startDate): number[] {
    let eventCount = Array.apply(null, Array(length)).map(Number.prototype.valueOf, 0);
    for (let event in this.events) {
      let indexToIncrement = this.calculateIndexToIncrement(startDate, event);
      eventCount[indexToIncrement]++;
    }
    return eventCount;
  }

  private calculateIndexToIncrement(startdate: any, event: any) {
    const startDate = new Date(startdate);
    const endDate = new Date(event.date);
    return this.calculateDifferenceInDays(startDate, endDate) + 1;
  }

  calculateDifferenceInDays(d1: Date, d2: Date): number {
    const timeDiff = Math.abs(d2.getTime() - d1.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  private calculateXAxis(startDate, endDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate < endDate) {
      dateArray.push(new Date(currentDate).toLocaleString("en-GB"));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  }

  private plotGraph(data, labels) {

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: [newDate(-5), newDate(-4), newDate(-3), newDate(-2), newDate(-1), newDate(0)],
        datasets: [{
          label: "Event",
          data: [2, 5, 3, 4, 7, 3],
          backgroundColor: 'rgb(184, 226, 230)',
          hoverBackgroundColor: 'rgb(42, 176, 190)'
        }]
      },
      options: {
        scales: {
          xAxes: [{
            type: "time",
            time: {
              unit: 'day',
              round: 'day',
              displayFormats: {
                day: 'MMM D'
              }
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

  }

  shouldShowFieldValidationMessage(fieldname: string): boolean {
    return !(this.eventForm.get(fieldname).valid || !this.eventForm.get(fieldname).dirty);
  }


}

function newDate(days) {
  return moment().add(days, 'd').toDate();
}

