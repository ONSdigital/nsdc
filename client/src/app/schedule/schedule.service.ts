import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { LoginService } from '../login/login.service';
import { Configuration } from '../app.constants';
import { Observable } from 'rxjs/Observable';
import { Schedule } from './schedule';
import { JourneyVersionSchedule } from './journey-version-schedule';

@Injectable()
export class ScheduleService {
  private actionUrl: string;
  public headers: Headers;

  constructor(private http: Http, private config: Configuration, private loginService: LoginService) {
    this.headers = new Headers();
    this.headers.set('Content-Type', 'application/json');
  }

  getSchedulesByVersion(versionId: number) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let schedulesUrl = this.config.Server +
      `nsdc/v1.0/journeys/versions/${versionId}/schedules`;
    return this.http.get(schedulesUrl, {headers: this.headers})
    .map(res => res.json() as Schedule[]);
  }

  getNextValidScheduleByVersion(versionId: number): Observable<JourneyVersionSchedule> {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let schedulesUrl = this.config.Server +
      `nsdc/v1.0/journeys/versions/${versionId}/schedules?with-version=true`;
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

  addSchedule(schedule: Schedule) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let scheduleAddUrl = this.config.Server + 'nsdc/v1.0/schedules';
    return this.http.post(scheduleAddUrl, JSON.stringify(schedule), { headers: this.headers } )
    .map(res => res.json());
  }

  updateSchedule(schedule: Schedule) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let scheduleUpdateUrl = this.config.Server + 'nsdc/v1.0/schedules/' + schedule.id;
    return this.http.put(scheduleUpdateUrl, JSON.stringify(schedule), { headers: this.headers } )
    .map(res => res.json());
  }

  deleteSchedule(id: number) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let scheduleDeleteUrl = this.config.Server + 'nsdc/v1.0/schedules/' + id;
    return this.http.delete(scheduleDeleteUrl, { headers: this.headers } )
      .map(res => res.json())
      .catch(res => {
        return Observable.throw(res.json());
      });
  }

}
