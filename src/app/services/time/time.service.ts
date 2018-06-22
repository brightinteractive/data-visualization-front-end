import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor(private http: HttpClient){ }
  
  getTime(){
    return this.http.get('https://data-visualization-back-end.herokuapp.com')
  }
}
