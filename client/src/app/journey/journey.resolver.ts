import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { JourneyService } from './journey.service';
import { Journey } from './journey';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JourneyResolver implements Resolve<Journey> {
  constructor(private journeyService: JourneyService) { }

  resolve(route: ActivatedRouteSnapshot, state): Observable<Journey> {
    return this.journeyService.getJourneyById(route.params['id']);
  }
}
