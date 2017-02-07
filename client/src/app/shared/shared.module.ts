import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { ValidatorModule } from './validator';
import { LoadingModule } from './loading';
import { ConfirmModalModule } from './confirm-modal';

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
    ValidatorModule,
    ModalModule,
    BootstrapModalModule,
    LoadingModule,
    ConfirmModalModule
  ],
  providers: [],
})
export class SharedModule { }
