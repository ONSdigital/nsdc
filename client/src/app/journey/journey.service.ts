import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Journey } from './journey';
import { JourneyVersion } from './versions/journey-version';
import { JourneyStep } from './versions/steps/journey-step';
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

  getVersionsByRole(roleId) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let url = this.config.Server + 'nsdc/v1.0/journeys/versions/roles/' + roleId;
    return this.http.get(url, { headers: this.headers })
    .map(response => response.json());
  }

  getVersionById(id) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let url = this.config.Server + 'nsdc/v1.0/journeys/versions/' + id;
    return this.http.get(url, { headers: this.headers })
    .map(response => response.json());
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
    .map(res => res.json());
  }

  getSteps() {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    return this.http.get(this.config.Server + 'nsdc/v1.0/journeys/steps', { headers: this.headers })
    .toPromise()
    .then(response => response.json() as JourneyStep[])
    .catch(this.handleError);
  }

  getStepsByJourneyVersion(journeyVersionId: number) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let stepsUrl = this.config.Server + 'nsdc/v1.0/journeys/versions/' + journeyVersionId + '/steps';
    return this.http.get(stepsUrl, { headers: this.headers })
    .map(response => response.json() as JourneyStep[]);
  }

  addJourneyVersion(journeyVersion: JourneyVersion) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let journeyVersionUrl = this.config.Server + 'nsdc/v1.0/journeys/versions';
    return this.http.post(journeyVersionUrl, JSON.stringify(journeyVersion), { headers: this.headers } )
      .map(res => res.json())
      .catch(res => {
        return Observable.throw(res.json());
      });
  }

  updateJourneyVersion(journeyVersion: JourneyVersion) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let journeyVersionEditUrl = this.config.Server + 'nsdc/v1.0/journeys/versions/' + journeyVersion.id;
    return this.http.put(journeyVersionEditUrl, JSON.stringify(journeyVersion), { headers: this.headers } )
      .map(res => res.json())
      .catch(res => {
        return Observable.throw(res.json());
      });
  }

  getJourneyVersions(journeyId) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let versionsUrl = this.config.Server + 'nsdc/v1.0/journeys/' + journeyId + '/versions';
    return this.http.get(versionsUrl, { headers: this.headers })
      .toPromise()
      .then(response => response.json() as JourneyVersion[])
      .catch(this.handleError);
  }

  getJourneyVersionById(id: number) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let journeyVersionUrl = this.config.Server + 'nsdc/v1.0/journeys/versions/' + id;
    return this.http.get(journeyVersionUrl, { headers: this.headers })
      .toPromise()
      .then(response => response.json() as JourneyVersion)
      .catch(this.handleError);
  }

  updateJourneyVersionSteps(id: number, stepIds: number[]) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    const rolePermissionsUrl = this.config.Server + 'nsdc/v1.0/journeys/versions/' + id + '/updatesteps';
    return this.http.post(rolePermissionsUrl, JSON.stringify({
      steps: stepIds
    }), {headers: this.headers})
    .map(res => res.json())
    .catch(res => {
      return Observable.throw(res.json());
    });
  }

  deleteJourneyVersion(id: number) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let journeyVersionDeleteUrl = this.config.Server + 'nsdc/v1.0/journeys/versions/' + id;
    return this.http.delete(journeyVersionDeleteUrl, { headers: this.headers } )
    .map(res => res.json());
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
