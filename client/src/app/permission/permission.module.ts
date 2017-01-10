import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionRoutingModule, routedComponents } from './permission-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { PermissionService } from '../permission/permission.service';

@NgModule({
  imports: [
    PermissionRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  declarations: [
    routedComponents
  ],
  providers: [
    PermissionService
  ],
})
export class PermissionModule { }
