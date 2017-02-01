import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { JourneyService } from './journey.service';
import { Journey } from './journey';

@Injectable()
export class JourneyResolver implements Resolve<Journey> {
  constructor(private journeyService: JourneyService) { }

  resolve(route: ActivatedRouteSnapshot, state): Promise<Journey> {
    return this.journeyService.getJourneyById(route.params['id']);
  }
}
