import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { Journey, JourneyStep } from './journey';
import { Configuration } from '../app.constants';
import { LoginService } from '../login/login.service';

@Injectable()
export class JourneyService {

  private actionUrl: string;
  public headers: Headers;

  constructor(private http: Http, private config: Configuration, private loginService: LoginService) {
    this.actionUrl = config.Server + 'nsdc/v1.0/journeys';
    this.headers = new Headers();
    this.headers.set('Content-Type', 'application/json');
  }

  addJourney(journey: Journey) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let journeyAddUrl = this.config.Server + 'nsdc/v1.0/journeys';
    return this.http.post(journeyAddUrl, JSON.stringify(journey), { headers: this.headers } )
        .map(res => res.json())
        .catch(res => {
          return Observable.throw(res.json());
        });
  }

  getJourneys() {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    return this.http.get(this.actionUrl, { headers: this.headers })
    .toPromise()
    .then(response => response.json() as Journey[])
    .catch(this.handleError);
  }

  deleteJourney(id: number) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let journeyDeleteUrl = this.config.Server + 'nsdc/v1.0/journeys/' + id;
    return this.http.delete(journeyDeleteUrl, { headers: this.headers } )
        .map(res => res.json())
        .catch(res => {
          return Observable.throw(res.json());
        });
  }

  getJourneySteps() {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    return this.http.get(this.actionUrl + '/steps', { headers: this.headers })
    .toPromise()
    .then(response => response.json() as JourneyStep[])
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
