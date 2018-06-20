import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Data Visualization';

  readonly ROOT_URL = 'https://jsonplaceholder.typicode.com';
  times: any;

  constructor(private http: HttpClient){}

  getTime(){
    this.times = this.http.get(this.ROOT_URL + '/posts')
  }

}
