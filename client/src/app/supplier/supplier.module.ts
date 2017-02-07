import { NgModule } from '@angular/core';
import { SupplierRoutingModule, routedComponents } from './supplier-routing.module';
import { SharedModule } from '../shared';
import { SupplierService } from './supplier.service';

@NgModule({
  imports: [
    SupplierRoutingModule,
    SharedModule
  ],
  declarations: [
    routedComponents
  ],
  providers: [
    SupplierService
  ],
})
export class SupplierModule { }
