import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITime } from '../../models/time';
import {AppSettings} from '../../models/app-settings';

@Injectable()
export class TimeService {

  constructor(private http: HttpClient) { }

  getTime() {
    return this.http.get<ITime>(AppSettings.API_ENDPOINT);
  }


}
