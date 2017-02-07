import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Configuration } from '../app.constants';
import { Observable } from 'rxjs/Observable';
import { Schedule } from './schedule';
import { JourneyVersionSchedule } from './journey-version-schedule';
import { HttpClientInterceptor } from '../http-client/http-client.interceptor';

@Injectable()
export class ScheduleService {
  private actionUrl: string;
  public headers: Headers;

  constructor(
    private http: HttpClientInterceptor,
    private config: Configuration
  ) {
    this.actionUrl = config.ServerWithApiUrl + 'schedules';
  }

  getSchedulesByVersion(versionId: number) : Observable<Schedule[]> {
    return this.http.get(this.config.ServerWithApiUrl + `journeys/versions/${versionId}/schedules`);
  }

  getNextValidScheduleByVersion(versionId: number): Observable<JourneyVersionSchedule> {
    return this.http.get(this.config.ServerWithApiUrl + `journeys/versions/${versionId}/schedules?with-version=true`);
  }

  getScheduleById(id) : Observable<Schedule> {
    return this.http.get(this.config.ServerWithApiUrl + 'schedules/' + id);
  }

  addSchedule(schedule: Schedule) {
    return this.http.post(this.actionUrl, schedule);
  }

  updateSchedule(schedule: Schedule) {
    return this.http.put(this.actionUrl + '/' + schedule.id, schedule);
  }

  deleteSchedule(id: number) {
    return this.http.delete(this.actionUrl + '/' + id);
  }
}
