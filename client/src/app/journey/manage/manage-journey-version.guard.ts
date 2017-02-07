import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot } from '@angular/router';
import { JourneyService } from '../journey.service';

@Injectable()
export class ManageJourneyVersionGuard implements CanActivate {

  constructor(
    private journeyService: JourneyService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const journeyId = route.params['id'];
    return this.journeyService.getJourneyVersions(journeyId)
    .map(journeyVersions => {
      if (journeyVersions.length) {
        this.router.navigate(['journeys', journeyId, 'version', journeyVersions[0].id]);
        return false;
      }
      return true;
    });
  }

  canActivateChild(route: ActivatedRouteSnapshot) {
    return this.canActivate(route);
  }
}
