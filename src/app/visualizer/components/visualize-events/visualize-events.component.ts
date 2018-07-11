import {Component, OnInit} from '@angular/core';
import {VisualizeEventsService} from '../../services/visualize-events.service';
// import "rxjs/add/operator/take";
import {take, tap} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../../shared/validators/customValidators';


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
    this.visualizeEventService.getEventsBetweenDateRange(startDate.getTime(), endDate.getTime()).pipe(take(1)).subscribe(value => this.events = value);
  }

  shouldShowFieldValidationMessage(fieldname: string): boolean {
    return !(this.eventForm.get(fieldname).valid || !this.eventForm.get(fieldname).dirty);
  }




}
