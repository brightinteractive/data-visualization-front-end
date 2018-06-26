import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppSettings} from '../../models/app-settings';

@Injectable()
export class UploadEventService {

  constructor(private http: HttpClient) { }

  getEvent() {
    return this.http.get(AppSettings.API_ENDPOINT + '/upload-event');
  }

}
