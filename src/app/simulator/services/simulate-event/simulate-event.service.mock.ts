import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppSettings} from '../../../shared/app-settings/app-settings';

@Injectable()
export class MockSimulateEventService {

  eventToSimulate: Event;

  constructor(private http: HttpClient) { }

  postEvent(event) {
    return [];
  }

}
