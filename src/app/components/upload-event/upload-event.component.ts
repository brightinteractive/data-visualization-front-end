import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UploadEventService } from '../../services/upload-event/upload-event.service';
import { Event } from '../../models/event';
import {FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms';
import {customValidators} from '../../services/validators/customValidators';

@Component({
  selector: 'app-upload-event',
  templateUrl: './upload-event.component.html',
  styleUrls: ['./upload-event.component.css']
})
export class UploadEventComponent implements OnInit {

  eventForm: FormGroup;
  noOfUploads: number = 10;

  //@ViewChild("eventForm") eventForm;
  @ViewChild("userId") userIdInput : ElementRef;

  constructor(private uploadEventService: UploadEventService, private fb:FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm(){
    this.eventForm = this.fb.group({
      userId: ['', [Validators.required] ],
      userName: ['', [Validators.required] ],
      group: ['', [Validators.required] ],
      assetId: ['', [Validators.required, Validators.min(0)] ],
      assetTitle: ['', [Validators.required] ],
      startDate: ['', [Validators.required] ],
      endDate: ['', [Validators.required]]
    }, { validator: Validators.compose([
      customValidators.dateLessThan('startDate', 'endDate', { 'validDate': true }) 
  ])})};

  onSubmit() {
    let startDate = new Date(this.eventForm.get('startDate').value);
    let endDate = new Date(this.eventForm.get('endDate').value);
    let differenceInDays = this.calculateDifferenceInDays(startDate, endDate);

    console.log("Number of POST Requests: " + this.noOfUploads * differenceInDays);
    for( let i=0; i < differenceInDays; i++){
      for( let j=0; j < this.noOfUploads; j++){
        //GenerateRandomTimeForEvent()
        this.uploadEventService.postEvent(this.eventForm.value).subscribe();
      }
    }
    this.eventForm.reset();
    //TODO: click on first field on reset.
  }
 
  calculateDifferenceInDays(d1: Date, d2: Date) : number{
    let timeDiff = Math.abs(d2.getTime()-d1.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays + 1;
  }

  EndDateAfterStartDate(control: FormGroup){
    const invalid = control.get('startDate').value > control.get('endDate').value;
    return invalid ? { 'invalidDate': true } : null;
  };

  

}




