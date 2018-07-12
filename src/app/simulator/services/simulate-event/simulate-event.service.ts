import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppSettings} from '../../../shared/app-settings/app-settings';

@Injectable()
export class SimulateEventService {

  eventToSimulate: Event;

  constructor(private http: HttpClient) { }

  postEvent(event) {
    return this.http.post<Event>(AppSettings.API_ENDPOINT + '/simulate-event', event);
  }

}
