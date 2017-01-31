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
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
    this.supplier = new Supplier();
  }

  onSubmit() {
    Object.keys(this.supplierForm.controls).forEach(key =>
      this.supplier[key] = this.supplierForm.controls[key].value
    );

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
