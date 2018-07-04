import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppSettings} from '../../models/app-settings';

@Injectable()
export class UploadEventService {

  eventToUpload: Event;

  constructor(private http: HttpClient) { }

  postEvent(event) {
    console.log("3");
    return this.http.post<Event>(AppSettings.API_ENDPOINT + '/upload-event', event);
  }

}
