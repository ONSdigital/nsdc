import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Journey } from '../journey';
import { JourneyService } from '../journey.service';

@Component({
  selector: 'edit-journey',
  templateUrl: 'edit-journey.component.html'
})
export class EditJourneyComponent implements OnInit {

  journeyForm: FormGroup;
  journey: Journey;
  submitPending = false;
  submitFailed = false;

  constructor(private _formBuilder: FormBuilder,
              private journeyService: JourneyService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.journeyForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
    });
    this.route.data.subscribe(data => {
      this.journey = data['journey'];
      this.journeyForm.patchValue(this.journey);
    });
  }

  onSubmit() {
    this.journey.name = this.journeyForm.controls['name'].value;
    this.journey.description = this.journeyForm.controls['description'].value;
    this.journeyService.updateJourney(this.journey)
      .subscribe(
        () => {
          this.submitPending = false;
          this.router.navigate(['/journeys']);
        },
        error => {
          this.submitPending = false;
          this.submitFailed = true;
        }
      );
  }
}
