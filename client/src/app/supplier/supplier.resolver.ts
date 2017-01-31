import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { SupplierService } from './supplier.service';
import { Supplier } from './supplier';

@Injectable()
export class SupplierResolver implements Resolve<Supplier> {
  constructor(
    private SupplierService: SupplierService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state): Promise<Supplier> {
    return this.SupplierService.getSupplierById(route.params['id']);
  }
}
