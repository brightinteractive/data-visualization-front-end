import { Component, OnInit } from '@angular/core';
import { UploadEventService } from '../../services/upload-event/upload-event.service';
import { Event } from '../../models/event';

@Component({
  selector: 'app-upload-event',
  templateUrl: './upload-event.component.html',
  styleUrls: ['./upload-event.component.css']
})
export class UploadEventComponent implements OnInit {

  eventModel = new Event('', '', '', 0, '');

  constructor(private uploadEventService: UploadEventService) { }

  ngOnInit() {
  }

  uploadEvent() {
    this.uploadEventService.postEvent(this.eventModel).subscribe();
    document.getElementById("userId").focus();
  }

}
