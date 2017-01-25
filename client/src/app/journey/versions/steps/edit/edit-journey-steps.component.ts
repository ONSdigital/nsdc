import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JourneyService } from '../../../journey.service';
import { PermissionService } from '../../../permission/permission.service';
import { UserPermissionsService } from '../../../../user-permissions.service';
import { JourneyVersion } from '../../journey-version';
import { JourneyStep } from '../journey-step';
import { Permission } from '../../../permission/permission';

@Component({
  selector: 'nsdc-edit-journey-steps',
  templateUrl: 'edit-journey-steps.component.html',
  styleUrls: ['edit-journey-steps.component.css']
})
export class EditJourneyStepsComponent implements OnInit {

  version: JourneyVersion;
  allSteps: JourneyStep[];
  originalStepIds: number[];
  selectedSteps: JourneyStep[];
  keepSorted: boolean = true;
  key = 'id';
  display = 'name';
  submitPending = false;
  submitFailed = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private journeyService: JourneyService,
              private userPermissionsService: UserPermissionsService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = Number.parseInt(params['id']);
      this.journeyService.getJourneyVersionById(id)
        .then(version => this.version = version);
      this.journeyService.getSteps()
        .then(steps => this.allSteps = steps);
      this.journeyService.getStepsByJourneyVersion(id)
      .subscribe(steps => {
        this.originalStepIds = steps.map(step => step.id);
        this.selectedSteps = steps;
      });
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
          this.userPermissionsService.clearPermissionsCache();
          this.router.navigate(['/journeys']);
        },
        error => {
          this.submitPending = false;
          this.submitFailed = true;
          console.log(error);
        }
      );
  }

  cancel() {
    this.router.navigate(['/journeys']);
  }
}
