import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Journey } from '../journey';
import { JourneyService } from '../journey.service';
import { Supplier } from '../../supplier/supplier';
import { SupplierService } from '../../supplier/supplier.service';

@Component({
  selector: 'add-journey',
  templateUrl: '../journey.component.html'
})
export class AddJourneyComponent implements OnInit {

  journeyForm: FormGroup;
  journey: Journey;
  suppliers: Supplier[];
  submitPending = false;
  submitFailed = false;

  constructor(private _formBuilder: FormBuilder,
              private supplierService: SupplierService,
              private journeyService: JourneyService,
              private router: Router) {
  }

  ngOnInit() {
    this.journeyForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      supplier_id: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]]
    });
    this.journey = new Journey();
    this.supplierService.getSuppliers().then(suppliers => this.suppliers = suppliers);
  }

  onSubmit() {
    this.journey.name = this.journeyForm.controls['name'].value;
    this.journey.description = this.journeyForm.controls['description'].value;
    this.journey.supplier_id = this.journeyForm.controls['supplier_id'].value;
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
