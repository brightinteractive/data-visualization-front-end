import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITime } from '../../time';

@Injectable()
export class TimeService {

  constructor(private http: HttpClient) { }

  private url: string = "https://data-visualization-back-end.herokuapp.com";

  getTime() {
    return this.http.get<ITime>(this.url);
  }


}
