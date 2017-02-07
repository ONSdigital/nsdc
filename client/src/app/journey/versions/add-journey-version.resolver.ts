import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JourneyService } from '../journey.service';
import { Journey } from '../journey';

@Injectable()
export class AddJourneyVersionResolver implements Resolve<Journey> {
  constructor(private journeyService: JourneyService) {
  }

  resolve(route: ActivatedRouteSnapshot, state): Observable<Journey> {
    return this.journeyService.getJourneyById(route.params['id']);
  }
}
