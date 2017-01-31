import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { Supplier } from './supplier';
import { SupplierService } from './supplier.service';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'supplier-list',
  templateUrl : 'supplier-list.component.html'
})
export class SupplierListComponent implements OnInit {

  public suppliers: Supplier[];
  loading = false;

  constructor(
    private http: Http,
    private supplierService: SupplierService,
    overlay: Overlay,
    vcRef: ViewContainerRef,
    public modal: Modal
  ) {
    overlay.defaultViewContainer = vcRef;
  }

  ngOnInit(): void {
    this.loading = true;
    this.supplierService.getSuppliers().then(suppliers => {
      this.loading = false;
      this.suppliers = suppliers;
    });
  }

  onDelete(supplierId) {
    this.supplierService.deleteSupplier(supplierId)
    .subscribe(() => {
      this.supplierService.getSuppliers()
      .then(suppliers => this.suppliers = suppliers);
    });
  }

}
