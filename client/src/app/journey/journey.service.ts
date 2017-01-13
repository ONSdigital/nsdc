import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
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

  updateJourney(journey: Journey) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let journeyEditUrl = this.config.Server + 'nsdc/v1.0/journeys/' + journey.id;
    return this.http.put(journeyEditUrl, JSON.stringify(journey), { headers: this.headers } )
    .map(res => res.json())
    .catch(res => {
      return Observable.throw(res.json());
    });
  }

  getJourneyById(id: number) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let journeyUrl = this.config.Server + 'nsdc/v1.0/journeys/' + id;
    return this.http.get(journeyUrl, { headers: this.headers })
    .toPromise()
    .then(response => response.json() as Journey)
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

  getSteps() {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    return this.http.get(this.config.Server + 'nsdc/v1.0/steps', { headers: this.headers })
    .toPromise()
    .then(response => response.json() as JourneyStep[])
    .catch(this.handleError);
  }

  getStepsByJourney(journeyId: number) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let stepsUrl = this.config.Server + 'nsdc/v1.0/steps/journey/' + journeyId;
    return this.http.get(stepsUrl, { headers: this.headers })
    .toPromise()
    .then(response => response.json() as JourneyStep[])
    .catch(this.handleError);
  }

  updateJourneySteps(id: number, stepIds: number[]) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    const rolePermissionsUrl = this.config.Server + 'nsdc/v1.0/journeys/' + id + '/steps';
    return this.http.post(rolePermissionsUrl, JSON.stringify({
      steps: stepIds
    }), {headers: this.headers})
    .map(res => res.json())
    .catch(res => {
      return Observable.throw(res.json());
    });
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
