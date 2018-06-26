import { Component, OnInit } from '@angular/core';
import { UploadEventService } from '../../services/upload-event/upload-event.service';
import { ITime } from '../../time';

@Component({
  selector: 'app-upload-event',
  templateUrl: './upload-event.component.html',
  styleUrls: ['./upload-event.component.css']
})
export class UploadEventComponent implements OnInit {

  constructor(private _uploadEventService: UploadEventService) { }

  ngOnInit() { }

  uploadEvent() {
    this._uploadEventService.getEvent().subscribe();
  }

}
