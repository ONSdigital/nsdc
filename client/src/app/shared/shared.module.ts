import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { ValidatorComponent } from './validator';
import { LoadingModule } from './loading';
import { ConfirmModalModule } from './confirm-modal';
import { ErrorAlertComponent } from './error-alert';
import { AuthHttpInterceptorService } from './auth-http-interceptor/auth-http-interceptor.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    ModalModule,
    BootstrapModalModule,
    LoadingModule,
    ConfirmModalModule,
    ErrorAlertComponent,
    ValidatorComponent
  ],
  declarations: [
    ErrorAlertComponent,
    ValidatorComponent
  ],
  providers: [
    AuthHttpInterceptorService
  ],
})
export class SharedModule { }
