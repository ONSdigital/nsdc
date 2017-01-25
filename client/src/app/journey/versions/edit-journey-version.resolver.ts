import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JourneyService } from '../journey.service';
import { JourneyVersion } from './journey-version';

@Injectable()
export class EditJourneyVersionResolver implements Resolve<JourneyVersion> {
  constructor(private journeyService: JourneyService) {
  }

  resolve(route: ActivatedRouteSnapshot, state): Promise<JourneyVersion> {
    return this.journeyService.getJourneyVersionById(route.params['vid']);
  }
}
