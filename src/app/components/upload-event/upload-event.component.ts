import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UploadEventService } from '../../services/upload-event/upload-event.service';
import { Event } from '../../models/event';

@Component({
  selector: 'app-upload-event',
  templateUrl: './upload-event.component.html',
  styleUrls: ['./upload-event.component.css']
})
export class UploadEventComponent implements OnInit {

  eventModel = new Event();

  @ViewChild("eventForm") eventForm;
  @ViewChild("userIdField") userIdInput : ElementRef;

  constructor(private uploadEventService: UploadEventService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.uploadEventService.postEvent(this.eventModel).subscribe();
    this.eventForm.reset();
    this.userIdInput.nativeElement.focus();
  }

}
