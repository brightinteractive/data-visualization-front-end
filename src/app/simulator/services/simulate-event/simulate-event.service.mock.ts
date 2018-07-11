import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppSettings} from '../../models/app-settings';

@Injectable()
export class MockSimulateEventService {

  eventToSimulate: Event;

  constructor(private http: HttpClient) { }

  postEvent(event) {
    return [];
  }

}
