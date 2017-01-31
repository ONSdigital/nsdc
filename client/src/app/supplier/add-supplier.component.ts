import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Supplier } from './supplier';
import { SupplierService } from './supplier.service';

@Component({
  selector: 'nsdc-add-supplier',
  templateUrl: 'supplier.component.html'
})
export class AddSupplierComponent implements OnInit {

  supplierForm: FormGroup;
  supplier: Supplier;
  submitPending = false;
  submitFailed = false;

  constructor(
    private _formBuilder: FormBuilder,
    private supplierService: SupplierService,
    private router: Router
  ) {}

  ngOnInit() {
    this.supplierForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
    });
    this.supplier = new Supplier();
  }

  onSubmit() {
    this.supplier.name = this.supplierForm.controls['name'].value;
    this.supplier.description = this.supplierForm.controls['description'].value;
    this.supplierService.addSupplier(this.supplier)
    .subscribe(
      () => {
        this.submitPending = false;
        this.router.navigate(['/suppliers']);
      },
      error => {
        this.submitPending = false;
        this.submitFailed = true;
      }
    );
  }
}
