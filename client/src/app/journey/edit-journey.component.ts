import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Journey } from './journey';
import { JourneyService } from './journey.service';
import { Supplier, SupplierService } from '../supplier';

@Component({
  selector: 'nsdc-edit-journey',
  templateUrl: 'journey.component.html'
})
export class EditJourneyComponent implements OnInit {
  journeyForm: FormGroup;
  journey: Journey;
  suppliers: Supplier[];
  submitPending = false;
  submitFailed = false;

  constructor(
    private _formBuilder: FormBuilder,
    private journeyService: JourneyService,
    private supplierService: SupplierService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.journeyForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      supplier_id: [null, [Validators.required]]
    });
    this.route.data.subscribe(data => {
      this.journey = data['journey'];
      this.journeyForm.patchValue(this.journey);
    });
    this.supplierService.getSuppliers().subscribe(suppliers => this.suppliers = suppliers);
  }

  onSubmit() {
    Object.keys(this.journeyForm.controls).forEach(key => this.journey[key] = this.journeyForm.controls[key].value);
    this.journeyService.updateJourney(this.journey)
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
