import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JourneyService } from '../journey.service';
import { SupplierService } from '../../supplier/supplier.service';
import { Observable } from 'rxjs/Observable';
import { Journey } from '../journey';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'nsdc-journeys',
  templateUrl: 'journeys.component.html'
})
export class JourneysComponent implements OnInit {
  journeys: Journey[] = [];
  loading = false;
  selectedJourneyId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private journeyService: JourneyService,
    private supplierService: SupplierService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(params => this.selectedJourneyId = Number(params['id']));
    this.journeyService.getJourneys()
    .mergeMap(journeys => {
      const requests = journeys.map(journey => {
        return this.supplierService.getSupplierById(journey.supplier_id)
        .map(supplier => {
          journey.supplier_name = supplier.name;
          return journey;
        });
      });
      return Observable.forkJoin(requests);
    })
    .subscribe(journeys => { this.journeys = journeys; this.loading = false; });
  }

  onSelectJourney(journeyId) {
    this.selectedJourneyId = journeyId;
    this.router.navigate(['journeys', journeyId]);
  }

  onDelete(journeyId) {
    this.journeyService.deleteJourney(journeyId)
    .subscribe(
      () => {
        this.journeyService.getJourneys()
        .subscribe(journeys => this.journeys = journeys);
      },
      error => this.toasterService.pop('error', error.message)
    );
  }

  onEdit(event, journeyId) {
    event.stopPropagation();
    this.router.navigate(['/journeys/edit', journeyId]);
  }
}
