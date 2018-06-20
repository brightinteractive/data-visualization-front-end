import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Data Visualization';
  readonly ROOT_URL = 'https://data-visualization-back-end.herokuapp.com';
  time: any;
  constructor(private http: HttpClient){}
  getTime(){
    this.time = this.http.get(this.ROOT_URL + '/time')
  }

}
