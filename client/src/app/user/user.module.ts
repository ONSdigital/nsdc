import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule, routedComponents } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { UserService } from './user.service';
import { RoleService } from '../role/role.service';

@NgModule({
  imports: [
    UserRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  declarations: [routedComponents],
  providers: [
    UserService,
    RoleService
  ]
})
export class UserModule { }
