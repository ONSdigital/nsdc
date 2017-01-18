import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierRoutingModule, routedComponents } from './supplier-routing.module';
import { LoadingModule } from '../loading/loading.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { SupplierService } from './supplier.service';

@NgModule({
  imports: [
    SupplierRoutingModule,
    LoadingModule,
    CommonModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  declarations: [
    routedComponents
  ],
  providers: [
    SupplierService
  ],
})
export class SupplierModule { }
