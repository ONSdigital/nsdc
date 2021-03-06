import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { JourneyService } from '../../journey.service';
import { PermissionService } from '../../permission/permission.service';
import { JourneyVersion } from '../journey-version';
import { JourneyStep } from './journey-step';
import { Permission } from '../../permission/permission';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'nsdc-edit-journey-steps',
  templateUrl: 'edit-journey-steps.component.html',
  styleUrls: ['edit-journey-steps.component.css']
})
export class EditJourneyStepsComponent implements OnInit {

  version: JourneyVersion;
  allSteps: JourneyStep[];
  selectedSteps: JourneyStep[];
  keepSorted: boolean = true;
  key = 'id';
  display = 'name';
  loading = false;
  submitPending = false;
  submitFailed = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private journeyService: JourneyService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(params => {
      const id = Number.parseInt(params['id']);
      Observable.forkJoin([
        this.journeyService.getJourneyVersionById(id)
        .map(version => this.version = version),
        this.journeyService.getSteps()
        .map(steps => this.allSteps = steps),
        this.journeyService.getStepsByJourneyVersion(id)
        .map(steps => {
          this.selectedSteps = steps;
        })
      ])
      .subscribe(() => this.loading = false);
    });
  }

  saveUpdatedJourneyVersionSteps() {
    this.submitPending = true;
    this.submitFailed = false;
    const selectedStepIds = this.selectedSteps.map(step => step.id);
    this.journeyService.updateJourneyVersionSteps(this.version.id, selectedStepIds)
    .subscribe(
      () => {
        this.submitPending = false;
        this.location.back();
      },
      error => {
        this.submitPending = false;
        this.submitFailed = true;
      }
    );
  }

  cancel() {
    this.location.back();
  }
}
