import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Journey } from '../journey';
import { JourneyService } from '../journey.service';

@Component({
  selector: 'add-journey',
  templateUrl: 'add-journey.component.html'
})
export class AddJourneyComponent implements OnInit {

  journeyForm: FormGroup;
  journey: Journey;
  submitPending = false;
  submitFailed = false;

  constructor(private _formBuilder: FormBuilder,
              private journeyService: JourneyService,
              private router: Router) {
  }

  ngOnInit() {
    this.journeyForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
    });
    this.journey = new Journey();
  }

  onSubmit() {
    this.journey.name = this.journeyForm.controls['name'].value;
    this.journey.description = this.journeyForm.controls['description'].value;
    this.journeyService.addJourney(this.journey)
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
