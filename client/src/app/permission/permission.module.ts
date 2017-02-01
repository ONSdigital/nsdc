import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionRoutingModule, routedComponents } from './permission-routing.module';
import { LoadingModule } from '../loading/loading.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { PermissionService } from './permission.service';
import { PermissionResolver } from './permission.resolver';
import { ValidatorModule } from '../validator/validator.module';

@NgModule({
  imports: [
    PermissionRoutingModule,
    LoadingModule,
    CommonModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    ValidatorModule
  ],
  declarations: [
    routedComponents
  ],
  providers: [
    PermissionService,
    PermissionResolver
  ],
})
export class PermissionModule { }
