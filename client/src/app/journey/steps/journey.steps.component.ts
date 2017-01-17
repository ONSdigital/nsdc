import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JourneyService } from '../journey.service';
import { PermissionService } from '../../permission/permission.service';
import { UserPermissionsService } from '../../user-permissions.service';
import { Journey, JourneyStep } from '../journey';
import { Permission } from '../../permission/permission';

@Component({
    selector: 'journey-steps',
    templateUrl: 'journey-steps.component.html',
    styleUrls: ['journey-steps.component.css']
})
export class JourneyStepsComponent implements OnInit {

    journey: Journey;
    allSteps: JourneyStep[];
    originalStepIds: number[];
    selectedSteps: JourneyStep[];
    keepSorted: boolean = true;
    key = 'id';
    display = 'name';
    submitPending = false;
    submitFailed = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private journeyService: JourneyService,
        private userPermissionsService: UserPermissionsService
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            const id = Number.parseInt(params['id']);
            this.journeyService.getJourneyById(id)
                .then(journey => this.journey = journey);
            this.journeyService.getSteps()
                .then(steps => {
                    this.allSteps = steps;
                });
            this.journeyService.getStepsByJourney(id)
                .then(steps => {
                    this.originalStepIds = steps.map(step => step.id);
                    this.selectedSteps = steps;
                });
        });
    }

    saveUpdatedJourneySteps() {
        this.submitPending = true;
        this.submitFailed = false;
        const selectedStepIds = this.selectedSteps.map(step => step.id);
        this.journeyService.updateJourneySteps(this.journey.id, selectedStepIds)
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
