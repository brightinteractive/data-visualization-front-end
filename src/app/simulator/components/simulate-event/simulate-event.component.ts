import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {SimulateEventService} from '../../services/simulate-event/simulate-event.service';
import {Event} from '../../../shared/models/event';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../../shared/validators/customValidators';

@Component({
  selector: 'app-simulate-event',
  templateUrl: './simulate-event.component.html',
  styleUrls: ['./simulate-event.component.css']
})
export class SimulateEventComponent implements OnInit {

  eventForm: FormGroup;

  @ViewChild('userIdInput') userIdInput: ElementRef;

  constructor(private simulateEventService: SimulateEventService, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.eventForm = this.fb.group({
      userId: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      group: ['', [Validators.required]],
      assetId: ['', [Validators.required, Validators.min(0)]],
      assetTitle: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      minEvents: ['', [Validators.required, Validators.min(0), Validators.max(200)]],
      maxEvents: ['', [Validators.required, Validators.min(0), Validators.max(200)]]
    }, {
      validator: Validators.compose([
        CustomValidators.dateLessThan('startDate', 'endDate', {'endDateIsBeforeStartDate': true}),
        CustomValidators.numberLessThan('minEvents', 'maxEvents', {'invalidValue': true})
      ])
    });
  }

  onSubmit() {
    const startDate = new Date(this.eventForm.get('startDate').value);
    const endDate = new Date(this.eventForm.get('endDate').value);
    const differenceInDays = this.calculateDifferenceInDays(startDate, endDate) + 1;

    for (let days = 0; days < differenceInDays; days++) {

      const noOfEvents = this.randomEventRange(this.eventForm.get('minEvents').value, this.eventForm.get('maxEvents').value);

      for (let events = 0; events < noOfEvents; events++) {
        const eventDate = this.calculateRandomEventTime(startDate, days);
        const eventToSimulate = this.createSimulateEvent(this.eventForm.value, eventDate);

        this.simulateEventService.postEvent(eventToSimulate).subscribe();
      }

    }
    this.eventForm.reset();
    this.userIdInput.nativeElement.focus();
  }

  calculateDifferenceInDays(d1: Date, d2: Date): number {
    const timeDiff = Math.abs(d2.getTime() - d1.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  randomEventRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  createSimulateEvent(eventData, eventDate): Event {
    const event = new Event();
    event.eventType = 'Upload';
    event.userId = eventData.userId;
    event.userName = eventData.userName;
    event.group = eventData.group;
    event.assetId = eventData.assetId;
    event.assetTitle = eventData.assetTitle;
    event.date = eventDate;
    return event;
  }

  calculateRandomEventTime(startDate: Date, elapsedDays: number): Date {
    const returnDate = new Date(startDate);
    returnDate.setDate(returnDate.getDate() + elapsedDays);
    returnDate.setHours(Math.random() * 24);
    returnDate.setMinutes(Math.random() * 60);
    return returnDate;
  }

  shouldShowFieldValidationMessage(fieldname: string): boolean {
    return !(this.eventForm.get(fieldname).valid || !this.eventForm.get(fieldname).dirty);
  }


}




