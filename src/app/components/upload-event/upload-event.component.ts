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
  startDateModel = new Date();
  endDateModel = new Date();

  noOfUploads: number = 10;

  @ViewChild("eventForm") eventForm;
  @ViewChild("userIdField") userIdInput : ElementRef;

  constructor(private uploadEventService: UploadEventService) { }

  ngOnInit() {
  }

  onSubmit() {
    let differenceInDays = this.calculateDifferenceInDays();
    //Iterate through number of days, iterate through number of Daily Uploads
    // for( let i=0; i < differenceInDays; i++){
    //   for( let j=0; i < this.noOfUploads; j++){
        //generateRandomTime();
        //change time of event to generated time;
        //uploadEvent
    //   }
    // }
    
    this.uploadEventService.postEvent(this.eventModel).subscribe();
    this.eventForm.reset();
    this.userIdInput.nativeElement.focus();
    
  }
 
  calculateDifferenceInDays() : number{
    let d1 = new Date(this.startDateModel);
    let d2 = new Date(this.endDateModel);
    let timeDiff = Math.abs(d2.getTime()-d1.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays + 1;
  }

}