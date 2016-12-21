import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Observable } from 'rxjs/Observable';
import { Journey, JourneyVersion } from './journey';
import { Configuration } from '../app.constants';
import { LoginService } from '../login/login.service';

@Injectable()
export class JourneyService {

  private actionUrl: string;
  public headers: Headers;

  constructor(private http: Http, private config: Configuration, private loginService: LoginService) {
    this.actionUrl = config.Server + 'nsdc/v1.0/journeys';
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  getJourneys() {
    this.headers.append('X-TOKEN', this.loginService.getToken());
    return this.http.get(this.actionUrl).toPromise().then(response => response.json() as Journey[]).catch(this.handleError);
  }

  getJourneysBySupplier(supplierId) {
    this.headers.append('X-TOKEN', this.loginService.getToken());
    return this.http.get(this.actionUrl + '/supplier/' + supplierId).toPromise().then(
      response => response.json() as Journey[])
    .catch(this.handleError);
  }

  getVersionsBySupplierAndJourney(supplierId, journeyId) {
    this.headers.append('X-TOKEN', this.loginService.getToken());
    return this.http.get(this.actionUrl + '/versions/' + supplierId + '/' + journeyId).toPromise().then(
      response => response.json() as JourneyVersion[])
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
