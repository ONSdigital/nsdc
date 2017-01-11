import { Component, OnInit } from '@angular/core';
import { Journey, JourneyStep } from './journey';
import { JourneyService } from './journey.service';
import { Configuration } from '../app.constants';

@Component({
  selector: 'journey-list',
  templateUrl : './journey.component.html'
})
export class JourneyListComponent implements OnInit {

  public journeys: Journey[];
  public steps: JourneyStep[];
  journeyLoading = false;
  journeyStepsLoading = false;

  constructor(private journeyService: JourneyService ) {}

  ngOnInit() {
    this.journeyLoading = true;
    this.journeyStepsLoading = true;
    this.journeyService.getJourneys().then(journeys => {
      this.journeys = journeys;
      this.journeyLoading = false;
    });
    this.journeyService.getJourneySteps().then(steps => {
      this.steps = steps;
      this.journeyStepsLoading = false;
    });
  }
}
