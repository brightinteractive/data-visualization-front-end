import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UploadEventService } from '../../services/upload-event/upload-event.service';
import { Event } from '../../models/event';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { customValidators } from '../../services/validators/customValidators';

@Component({
  selector: 'app-upload-event',
  templateUrl: './upload-event.component.html',
  styleUrls: ['./upload-event.component.css']
})
export class UploadEventComponent implements OnInit {

  eventToUpload: Event;
  eventForm: FormGroup;
  noOfUploads: number = 10;
  

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
        customValidators.dateLessThan('startDate', 'endDate', { 'loaddate': true })
      ])
      })
  };

  onSubmit() {
    let startDate = new Date(this.eventForm.get('startDate').value);
    let endDate = new Date(this.eventForm.get('endDate').value);
    let differenceInDays = this.calculateDifferenceInDays(startDate, endDate);
    console.log("Number of event uploads: " + this.noOfUploads * differenceInDays);
    for (let i = 0; i < differenceInDays; i++) {
      for (let j = 0; j < this.noOfUploads; j++) {
        let eventDate = this.calculateRandomEventTime(this.eventForm.get('startDate').value, i);
        this.eventToUpload = this.createUploadEvent(this.eventForm.value, eventDate);
        this.uploadEventService.postEvent(this.eventToUpload).subscribe();
      }
    }
    this.eventForm.reset();
    this.userIdInput.nativeElement.focus();
  }

  calculateDifferenceInDays(d1: Date, d2: Date): number {
    let timeDiff = Math.abs(d2.getTime() - d1.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays + 1;
  }

  createUploadEvent(eventData, eventDate): Event {
    var event = new Event();
    event.eventType = "Upload";
    event.userId = eventData.userId;
    event.userName = eventData.userName;
    event.group = eventData.group;
    event.assetId = eventData.assetId;
    event.assetTitle = eventData.assetTitle;
    event.date = eventDate;
    return event;
  }

  calculateRandomEventTime(startDate: Date, elapsedDays): Date {
    let returnDate = new Date(startDate);
    returnDate.setDate(returnDate.getDate() + elapsedDays);
    returnDate.setHours(Math.random() * 24);
    returnDate.setMinutes(Math.random() * 60);
    return returnDate;
  }
}




