import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadEventService {

  constructor(private http: HttpClient) { }

  postEvent(){
    console.log("button clicked!");
    return this.http.get('https://data-visualization-back-end.herokuapp.com/hello');
  }
  
}
