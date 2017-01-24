import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { Journey } from './journey';
import { JourneyVersion } from './versions/journey-version';
import { JourneyService } from './journey.service';
import { JourneyStep } from './versions/steps/journey-step';
import { Http } from '@angular/http';

@Component({
  selector: 'journey-list',
  templateUrl: './journey.component.html'
})
export class JourneyListComponent implements OnInit {

  public journeys: Journey[];
  public versions: JourneyVersion[];
  public steps: JourneyStep[];
  public selectedJourney: Journey;
  public selectedVersion: JourneyVersion;
  loading = false;
  showSteps = false;

  constructor(private http: Http,
              private journeyService: JourneyService,
              overlay: Overlay,
              vcRef: ViewContainerRef,
              public modal: Modal) {
    overlay.defaultViewContainer = vcRef;
  }

  ngOnInit() {
    this.loading = true;
    Promise.all([
      this.journeyService.getJourneys().then(journeys => this.journeys = journeys)
    ])
      .then(() => {
        this.loading = false;
      });
  }

  onSelectJourney(journey) {
    this.resetData();
    this.loading = true;
    this.selectedJourney = journey;
    Promise.all([
      this.journeyService.getJourneyVersions(journey.id).then(versions => this.versions = versions)
    ])
      .then(() => {
        this.loading = false;
      });
  }

  onSelectJourneyVersion(journeyVersion) {
    this.loading = true;
    this.selectedVersion = journeyVersion;
    Promise.all([
      this.journeyService.getStepsByJourneyVersion(journeyVersion.id).then(steps => this.steps = steps)
    ])
      .then(() => {
        this.loading = false;
        this.showSteps = true;
      });
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

  onDeleteClicked(journeyId) {
    const modalConfirmation = this.modalPopup();
    modalConfirmation.then(dialog => dialog.result).then(
      () => {
        this.journeyService.deleteJourney(journeyId)
          .subscribe(() => {
            this.journeyService.getJourneys().then(journeys => this.journeys = journeys);
          });
      },
      () => {
      }
    );
  }

  onVersionDeleteClicked(versionId) {
    const modalConfirmation = this.modalPopup();
    modalConfirmation.then(dialog => dialog.result).then(
      () => {
        this.journeyService.deleteJourneyVersion(versionId)
          .subscribe(() => {
            this.journeyService.getJourneyVersions(this.selectedJourney.id).then(versions => this.versions = versions);
          });
      },
      () => {
      }
    );
  }

  resetData() {
    this.versions = [];
    this.steps = [];
    this.showSteps = false;
  }
}
