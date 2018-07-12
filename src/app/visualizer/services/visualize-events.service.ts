import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AppSettings} from '../../shared/app-settings/app-settings';

import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class VisualizeEventsService {

  constructor(private http: HttpClient) {
  }

  getEventsBetweenDateRange(startDate, endDate): Observable<Event[]> {
    const params = new HttpParams()
      .set('start-date', startDate)
      .set('end-date', endDate);
    return this.http.get<Event[]>(AppSettings.API_ENDPOINT + '/events', {params});
  }

}
