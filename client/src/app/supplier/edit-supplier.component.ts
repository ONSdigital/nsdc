import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Supplier } from './supplier';
import { SupplierService } from './supplier.service';

@Component({
  selector: 'nsdc-edit-supplier',
  templateUrl: 'supplier.component.html'
})
export class EditSupplierComponent implements OnInit {

  supplierForm: FormGroup;
  supplier: Supplier;
  submitPending = false;
  submitFailed = false;

  constructor(
    private _formBuilder: FormBuilder,
    private supplierService: SupplierService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.supplierForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
    this.route.data.subscribe(data => {
      this.supplier = data['supplier'];
      this.supplierForm.patchValue(this.supplier);
    });
  }

  onSubmit() {
    Object.keys(this.supplierForm.controls).forEach(key =>
      this.supplier[key] = this.supplierForm.controls[key].value
    );
    this.supplierService.updateSupplier(this.supplier)
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
