import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UploadEventService {

  constructor(private http: HttpClient) { }

  private _url: string = "https://data-visualization-back-end.herokuapp.com";

  getEvent() {
    return this.http.get(this._url + '/upload-event');
  }

}
