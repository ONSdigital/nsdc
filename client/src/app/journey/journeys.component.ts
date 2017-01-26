import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { Journey } from './journey';
import { JourneyVersion } from './versions/journey-version';
import { JourneyService } from './journey.service';
import { JourneyStep } from './versions/steps/journey-step';
import { Http } from '@angular/http';

@Component({
  selector: 'nsdc-journeys',
  templateUrl: 'journeys.component.html'
})
export class JourneysComponent implements OnInit {

  public journeys: Journey[];
  public versions: JourneyVersion[];
  public steps: JourneyStep[];
  public selectedJourneyId: number;
  public selectedVersion: JourneyVersion;
  loading = false;
  versionsLoading = false;
  showSteps = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: Http,
    private journeyService: JourneyService,
    overlay: Overlay,
    vcRef: ViewContainerRef,
    public modal: Modal
  ) {
    overlay.defaultViewContainer = vcRef;
  }

  ngOnInit() {
    this.loading = true;
    this.journeyService.getJourneys()
    .then(journeys => this.journeys = journeys)
    .then(() => {
      this.loading = false;
    });

    this.route.params.subscribe(
      params => console.log(params)
    );
  }

  onSelectJourney(journeyId) {
    this.router.navigate([journeyId]);
    // this.resetData();
    // this.versionsLoading = true;
    // this.selectedJourneyId = journeyId;
    // this.journeyService.getJourneyVersions(journeyId)
    // .then(versions => this.versions = versions)
    // .then(() => {
    //   this.versionsLoading = false;
    // });
  }

  onSelectJourneyVersion(journeyVersion) {
    this.selectedVersion = journeyVersion;
  }

  modalPopup() {
    return this.modal.confirm()
    .size('sm')
    .isBlocking(false)
    .showClose(true)
    .keyboard(27)
    .title('Confirm')
    .body('Are you sure you want to delete this?')
    .open();
  }

  onDeleteClicked(event, journeyId) {
    event.stopPropagation();
    const modalConfirmation = this.modalPopup();
    modalConfirmation.then(dialog => dialog.result)
    .then(
      () => {
        this.journeyService.deleteJourney(journeyId)
        .subscribe(() => {
          this.journeyService.getJourneys().then(journeys => this.journeys = journeys);
        });
      },
      () => {}
    );
  }

  onVersionDeleteClicked(event, versionId) {
    event.stopPropagation();
    const modalConfirmation = this.modalPopup();
    modalConfirmation.then(dialog => dialog.result)
    .then(
      () => {
        this.journeyService.deleteJourneyVersion(versionId)
        .subscribe(() => {
          this.journeyService.getJourneyVersions(this.selectedJourneyId)
          .then(versions => this.versions = versions);
        });
      },
      () => {}
    );
  }

  resetData() {
    this.versions = [];
    this.steps = [];
    this.showSteps = false;
  }
}
