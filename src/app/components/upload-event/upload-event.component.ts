import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UploadEventService } from '../../services/upload-event/upload-event.service';
import { Event } from '../../models/event';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../services/validators/customValidators';

@Component({
  selector: 'app-upload-event',
  templateUrl: './upload-event.component.html',
  styleUrls: ['./upload-event.component.css']
})
export class UploadEventComponent implements OnInit {

  eventForm: FormGroup;
  noOfUploads = 10;


  @ViewChild('userIdInput') userIdInput: ElementRef;

  constructor(private uploadEventService: UploadEventService, private fb: FormBuilder) {
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
      endDate: ['', [Validators.required]]
    }, {
        validator: Validators.compose([
          CustomValidators.dateLessThan('startDate', 'endDate', { 'endDateIsBeforeStartDate': true })
        ])
      });
  }

  onSubmit() {
    const startDate = new Date(this.eventForm.get('startDate').value);
    const endDate = new Date(this.eventForm.get('endDate').value);
    const differenceInDays = this.calculateDifferenceInDays(startDate, endDate) + 1;

    for (let days = 0; days < differenceInDays; days++) {
      for (let events = 0; events < this.noOfUploads; events++) {
        const eventDate = this.calculateRandomEventTime(startDate, days);
        const eventToUpload = this.createUploadEvent(this.eventForm.value, eventDate);
        this.uploadEventService.postEvent(eventToUpload);
      }
    }

    this.eventForm.reset();
    this.userIdInput.nativeElement.focus();
  }

  calculateDifferenceInDays(d1: Date, d2: Date): number {
    const timeDiff = Math.abs(d2.getTime() - d1.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  createUploadEvent(eventData, eventDate): Event {
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




