import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITime } from '../../time';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor(private http: HttpClient){ }
  
  getTime(){
    return this.http.get<ITime>('https://data-visualization-back-end.herokuapp.com')
  }
}
