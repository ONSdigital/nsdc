import { Component, Input, OnChanges } from '@angular/core';
import { JourneyStep } from './journey-step';
import { JourneyService } from '../../journey.service';

@Component({
  selector: 'nsdc-journey-steps',
  templateUrl: 'journey-steps.component.html'
})
export class JourneyStepsComponent implements OnChanges {

  steps: JourneyStep[] = [];

  @Input() versionId: number;

  loading = false;

  constructor(private journeyService: JourneyService) { }

  ngOnChanges(changes) {
    const newVersionId = changes.versionId.currentValue;
    this.getSteps(newVersionId);
  }

  getSteps(versionId) {
    this.loading = true;
    this.journeyService.getStepsByJourneyVersion(versionId)
    .subscribe(steps => {
      this.steps = steps;
      this.loading = false;
    });
  }
}
