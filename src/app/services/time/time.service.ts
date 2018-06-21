import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ITime} from '../../time';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor(private http: HttpClient){ }

  private _url: string = "https://data-visualization-back-end.herokuapp.com";
  
  getTime(): Observable<ITime[]>{
    return this.http.get<ITime[]>(this._url);
  }
}
