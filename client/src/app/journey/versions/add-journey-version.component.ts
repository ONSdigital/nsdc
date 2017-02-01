import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Journey } from '../Journey';
import { JourneyVersion } from './journey-version';
import { JourneyService } from '../journey.service';

@Component({
  selector: 'add-journey',
  templateUrl: 'journey-version.component.html'
})
export class AddJourneyVersionComponent implements OnInit {
  journey: Journey;
  journeyVersionForm: FormGroup;
  journeyVersion: JourneyVersion;
  submitPending = false;
  submitFailed = false;

  constructor(
    private _formBuilder: FormBuilder,
    private journeyService: JourneyService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.journeyVersionForm = this._formBuilder.group({
      version_number: ['', [Validators.required]],
      validator: ['', [Validators.required]],
      extensions: ['', [Validators.required]],
      protocol: ['', [Validators.required]]
    });
    this.journeyVersion = new JourneyVersion();
    this.route.data.subscribe(data => this.journey = data['journey']);
  }

  onSubmit() {
    this.journeyVersion.journey_id = this.journey && this.journey.id;
    Object.keys(this.journeyVersionForm.controls).forEach(key => this.journeyVersion[key] = this.journeyVersionForm.controls[key].value);
    this.journeyService.addJourneyVersion(this.journeyVersion)
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
}
