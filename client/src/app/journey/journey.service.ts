import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Journey } from './journey';
import { JourneyVersion } from './versions/journey-version';
import { JourneyStep } from './versions/steps/journey-step';
import { Configuration } from '../app.constants';
import { HttpClientInterceptor } from '../http-client/http-client.interceptor';

@Injectable()
export class JourneyService {
  private actionUrl: string;
  private versionUrl: string;
  public headers: Headers;

  constructor(
    private http: HttpClientInterceptor,
    private config: Configuration
  ) {
    this.actionUrl = config.ServerWithApiUrl + 'journeys';
    this.versionUrl = this.actionUrl + '/versions';
  }

  addJourney(journey: Journey) {
    return this.http.post(this.actionUrl, journey);
  }

  getJourneys() : Observable<Journey[]> {
    return this.http.get(this.actionUrl);
  }

  updateJourney(journey: Journey) {
    return this.http.put(this.actionUrl + '/' + journey.id, journey);
  }

  getAllJourneyVersions() : Observable<JourneyVersion[]> {
    return this.http.get(this.versionUrl);
  }

  getVersionsByRole(roleId) : Observable<JourneyVersion[]> {
    return this.http.get(this.versionUrl + '/roles/' + roleId);
  }

  getJourneyById(id: number) : Observable<Journey> {
    return this.http.get(this.actionUrl + '/' + id);
  }

  deleteJourney(id: number) {
    return this.http.delete(this.actionUrl + '/' + id);
  }

  getSteps() : Observable<JourneyStep[]> {
    return this.http.get(this.actionUrl + '/steps');
  }

  getStepsByJourneyVersion(journeyVersionId: number) : Observable<JourneyStep[]> {
    return this.http.get(this.versionUrl + '/' + journeyVersionId + '/steps');
  }

  addJourneyVersion(journeyVersion: JourneyVersion) {
    return this.http.post(this.versionUrl, journeyVersion);
  }

  updateJourneyVersion(journeyVersion: JourneyVersion) {
    return this.http.put(this.versionUrl + '/' + journeyVersion.id, journeyVersion);
  }

  getJourneyVersions(journeyId) : Observable<JourneyVersion[]> {
    return this.http.get(this.actionUrl + '/' + journeyId + '/versions');
  }

  getJourneyVersionById(id: number) : Observable<JourneyVersion> {
    return this.http.get(this.versionUrl + '/' + id);
  }

  updateJourneyVersionSteps(id: number, stepIds: number[]) {
    return this.http.post(this.versionUrl + '/' + id + '/updatesteps', { steps: stepIds });
  }

  deleteJourneyVersion(id: number) {
    return this.http.delete(this.versionUrl + '/' + id);
  }
}
