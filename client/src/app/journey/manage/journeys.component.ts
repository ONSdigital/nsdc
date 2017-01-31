import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JourneyService } from '../journey.service';
import { Journey } from '../journey';

@Component({
  selector: 'nsdc-journeys',
  templateUrl: 'journeys.component.html'
})
export class JourneysComponent implements OnInit {

  journeys: Journey[];
  loading = false;
  selectedJourneyId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private journeyService: JourneyService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.selectedJourneyId = Number(params['id']);
    });
    this.journeyService.getJourneys()
    .subscribe(journeys => {
      this.journeys = journeys;
      this.loading = false;
    });
  }

  onSelectJourney(journeyId) {
    this.selectedJourneyId = journeyId;
    this.router.navigate(['journeys', journeyId]);
  }

  onDeleteClicked(event, journeyId) {
    event.stopPropagation();
    console.log(journeyId);
  }

  onEditClicked(event, journeyId) {
    event.stopPropagation();
    this.router.navigate(['/journeys/edit', journeyId]);
  }
}
