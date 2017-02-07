import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Journey } from './journey';
import { JourneyService } from './journey.service';
import { Supplier, SupplierService } from '../supplier';

@Component({
  selector: 'nsdc-add-journey',
  templateUrl: 'journey.component.html'
})
export class AddJourneyComponent implements OnInit {
  journeyForm: FormGroup;
  journey: Journey;
  suppliers: Supplier[];
  submitPending = false;
  submitFailed = false;

  constructor(
    private _formBuilder: FormBuilder,
    private supplierService: SupplierService,
    private location: Location,
    private journeyService: JourneyService
  ) { }

  ngOnInit() {
    this.journeyForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      supplier_id: [null, [Validators.required]]
    });
    this.journey = new Journey();
    this.supplierService.getSuppliers().subscribe(suppliers => this.suppliers = suppliers);
  }

  onSubmit() {
    Object.keys(this.journeyForm.controls).forEach(key => this.journey[key] = this.journeyForm.controls[key].value);
    this.journeyService.addJourney(this.journey)
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
