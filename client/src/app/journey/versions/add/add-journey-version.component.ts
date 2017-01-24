import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Journey } from '../../Journey'
import { JourneyVersion } from '../journey-version';
import { JourneyService } from '../../journey.service';

@Component({
  selector: 'add-journey',
  templateUrl: 'add-journey-version.component.html'
})
export class AddJourneyVersionComponent implements OnInit {

  journey: Journey;
  journeyVersionForm: FormGroup;
  journeyVersion: JourneyVersion;
  submitPending = false;
  submitFailed = false;

  constructor(private _formBuilder: FormBuilder,
              private journeyService: JourneyService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.journeyVersionForm = this._formBuilder.group({
      version_number: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]],
      validator: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      extensions: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
    });
    this.journeyVersion = new JourneyVersion();
    this.route.data.subscribe(data => {
      this.journey = data['journey'];
    });
  }

  onSubmit() {
    this.journeyVersion.journey_id = this.journey && this.journey.id;
    this.journeyVersion.version_number = this.journeyVersionForm.controls['version_number'].value;
    this.journeyVersion.validator = this.journeyVersionForm.controls['validator'].value;
    this.journeyVersion.extensions = this.journeyVersionForm.controls['extensions'].value;
    this.journeyService.addJourneyVersion(this.journeyVersion)
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