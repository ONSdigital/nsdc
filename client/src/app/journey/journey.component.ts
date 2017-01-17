import { Component, OnInit } from '@angular/core';
import { Journey } from './journey';
import { JourneyService } from './journey.service';

@Component({
  selector: 'journey-list',
  templateUrl : './journey.component.html'
})
export class JourneyListComponent implements OnInit {

  public journeys: Journey[];
  loading = false;

  constructor(private journeyService: JourneyService ) {}

  ngOnInit() {
    this.loading = true;
    Promise.all([
      this.journeyService.getJourneys().then(journeys => this.journeys = journeys)
    ])
    .then(() => {
      this.loading = false;
    });
  }
}
