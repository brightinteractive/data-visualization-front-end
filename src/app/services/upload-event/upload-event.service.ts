import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppSettings} from '../../models/app-settings';

@Injectable()
export class UploadEventService {

  constructor(private http: HttpClient) { }

  postEvent(event) {
    console.log(event);
    return this.http.post<Event>(AppSettings.API_ENDPOINT + '/upload-event', event);
  }

}
