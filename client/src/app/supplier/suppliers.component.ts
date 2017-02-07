import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { Supplier } from './supplier';
import { SupplierService } from './supplier.service';
import { Http } from '@angular/http';

@Component({
  selector: 'nsdc-suppliers',
  templateUrl : 'suppliers.component.html'
})
export class SuppliersComponent implements OnInit {

  public suppliers: Supplier[];
  loading = false;

  constructor(
    private supplierService: SupplierService,
    overlay: Overlay,
    vcRef: ViewContainerRef,
    public modal: Modal
  ) {
    overlay.defaultViewContainer = vcRef;
  }

  ngOnInit(): void {
    this.loading = true;
    this.supplierService.getSuppliers()
    .subscribe(suppliers => {
      this.loading = false;
      this.suppliers = suppliers;
    });
  }

  onDelete(supplierId) {
    this.supplierService.deleteSupplier(supplierId)
    .subscribe(() =>this.supplierService.getSuppliers().subscribe(suppliers => this.suppliers = suppliers));
  }

}
