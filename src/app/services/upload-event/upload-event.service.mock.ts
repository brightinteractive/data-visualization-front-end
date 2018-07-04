import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppSettings} from '../../models/app-settings';

@Injectable()
export class MockUploadEventService {

  eventToUpload: Event;

  constructor(private http: HttpClient) { }

  postEvent(event) {
    console.log('posted')
    return [];
  }

}
