import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { Journey } from './journey';
import { JourneyService } from './journey.service';
import { Http } from '@angular/http';

@Component({
  selector: 'journey-list',
  templateUrl: './journey.component.html'
})
export class JourneyListComponent implements OnInit {

  public journeys: Journey[];
  loading = false;

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

  onDeleteClicked(journeyId) {
    const modalConfirmation = this.modal.confirm()
      .size('sm')
      .isBlocking(false)
      .showClose(true)
      .keyboard(27)
      .title('Confirm')
      .body('Are you sure you want to delete this journey?')
      .open();

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
}
