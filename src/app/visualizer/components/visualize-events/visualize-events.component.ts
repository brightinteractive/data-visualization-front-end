import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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

  @ViewChild('canvas') canvas: ElementRef;

  events: Event[] = [];
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
    this.callEventService(startDate, endDate)
      .then((events) => {
        this.events = events;
        this.generateChart(startDate, endDate);
      });

  }

  callEventService(startDate, endDate) {
    return this.visualizeEventService.getEventsBetweenDateRange(startDate.getTime(), endDate.getTime())
      .pipe(take(1))
      .toPromise();
  }


  private generateChart(startDate, endDate) {
    const numberOfCategoriesOnChart = this.differenceInDays(startDate, endDate);
    this.plotGraph(
      this.graphData(numberOfCategoriesOnChart, startDate),
      this.graphLabels(numberOfCategoriesOnChart, startDate));
  }

  private graphData(numberOfDays, startDate): number[] {
    const categoryValues = this.initialiseToZeros(numberOfDays);
    for (const event of this.events) {
      categoryValues[this.categoryIndexForDate(startDate, event)]++;
    }
    return categoryValues;
  }

  private initialiseToZeros(length) {
    return Array.apply(null, Array(length)).map(Number.prototype.valueOf, 0);
  }

  private categoryIndexForDate(startdate: any, event: any) {
    const startDate = new Date(startdate);
    const endDate = new Date(event.date);
    return this.differenceInDays(startDate, endDate) - 1;
  }

  private differenceInDays(d1: Date, d2: Date): number {
    const timeDiff = Math.abs(d2.getTime() - d1.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  private graphLabels(numberOfDays, startDate) {
    const dateArray = new Array();
    for (let i = 0; i < numberOfDays; i++) {
      dateArray.push(newDate(startDate, i));
    }
    return dateArray;
  }

  private plotGraph(data, labels) {

    this.chart = new Chart(this.canvas.nativeElement.getContext('2d'), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Events',
          data: data,
          backgroundColor: 'rgb(110, 200, 210)',
          hoverBackgroundColor: 'rgb(42, 176, 190)'
        }]
      },
      options: {
        scales: {
          xAxes: [{
            type: 'time',
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

function newDate(date, days) {
  return moment(date).add(days, 'd').toDate();
}

