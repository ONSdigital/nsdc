import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { SupplierService } from './supplier.service';
import { Supplier } from './supplier';
import { Observable } from "rxjs";

@Injectable()
export class SupplierResolver implements Resolve<Supplier> {
  constructor(
    private SupplierService: SupplierService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state): Observable<Supplier> {
    return this.SupplierService.getSupplierById(route.params['id']);
  }
}
