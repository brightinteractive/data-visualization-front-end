import { Component, OnInit } from '@angular/core';
import { UploadEventService } from '../../services/upload-event/upload-event.service';

@Component({
  selector: 'app-upload-event',
  templateUrl: './upload-event.component.html',
  styleUrls: ['./upload-event.component.css']
})
export class UploadEventComponent implements OnInit {

  constructor(private uploadEventService: UploadEventService) { }

  ngOnInit() {
  }

  uploadEvent() {
    this.uploadEventService.postEvent();
  }

}
