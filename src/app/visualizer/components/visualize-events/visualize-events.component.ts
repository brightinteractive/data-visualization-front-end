import {Component, OnInit} from '@angular/core';
import {VisualizeEventsService} from '../../services/visualize-events.service';
import {take} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../../shared/validators/customValidators';
import {Chart} from 'chart.js';


@Component({
  selector: 'app-visualize-events',
  templateUrl: './visualize-events.component.html',
  styleUrls: ['./visualize-events.component.css']
})
export class VisualizeEventsComponent implements OnInit {

  events: Event[];
  eventForm: FormGroup;


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
    this.generateChart();
  }




  private generateChart() {
    var canvas = <HTMLCanvasElement> document.getElementById("myChart");
    var ctx = canvas.getContext("2d");

    var chart = new Chart(ctx, {
      type: 'bar',

      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
          label: "Upload",
          backgroundColor: 'rgb(184, 226, 230)',
          hoverBackgroundColor: 'rgb(42,176,190)',
          data: [0, 10, 5, 2, 20, 30, 45],
        }]
      },
      options: {
        scales: {
          xAxes: [{
            time: {
              unit: 'day'
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
