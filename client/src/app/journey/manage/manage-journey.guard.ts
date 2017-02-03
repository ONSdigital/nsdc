import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot } from '@angular/router';
import { JourneyService } from '../journey.service';

@Injectable()
export class ManageJourneyGuard implements CanActivate {

  constructor(
    private journeyService: JourneyService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    return this.journeyService.getJourneys()
    .map(journeys => {
      if (journeys.length) {
        this.router.navigate(['/journeys', journeys[0].id]);
        return false;
      }
      return true;
    });
  }

  canActivateChild(route: ActivatedRouteSnapshot) {
    return this.canActivate(route);
  }
}
