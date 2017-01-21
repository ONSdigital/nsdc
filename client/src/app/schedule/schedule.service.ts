import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { LoginService } from '../login/login.service';
import { Configuration } from '../app.constants';
import { Observable } from 'rxjs/Observable';
import { JourneyVersionSchedule } from './journey-version-schedule';

@Injectable()
export class ScheduleService {
  private actionUrl: string;
  public headers: Headers;

  constructor(private http: Http, private config: Configuration, private loginService: LoginService) {
    this.headers = new Headers();
    this.headers.set('Content-Type', 'application/json');
  }

  getSchedulesByVersion(versionId: number, validOnly = true) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let schedulesUrl = this.config.Server +
      `nsdc/v1.0/journeys/versions/${versionId}/schedules`;
    return this.http.get(schedulesUrl, {headers: this.headers})
    .map(res => res.json());
  }

  getNextValidScheduleByVersion(versionId: number, validOnly = true): Observable<JourneyVersionSchedule> {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let schedulesUrl = this.config.Server +
      `nsdc/v1.0/journeys/versions/${versionId}/schedules`;
    return this.http.get(schedulesUrl, {headers: this.headers})
    .map(res => res.json() as JourneyVersionSchedule);
  }

  getScheduleById(id) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let scheduleUrl = this.config.Server +
      'nsdc/v1.0/schedules/' + id;
    return this.http.get(scheduleUrl, {headers: this.headers})
    .map(res => res.json());
  }

}
