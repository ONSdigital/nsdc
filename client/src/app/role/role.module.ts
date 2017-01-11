import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleRoutingModule, routedComponents } from './role-routing.module';
import { LoadingModule } from '../loading/loading.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { RoleService } from './role.service';
import { UserService } from '../user/user.service';
import { PermissionService } from '../permission/permission.service';
import { DualListModule } from '../dual-list/dual-list.module';

@NgModule({
  imports: [
    RoleRoutingModule,
    LoadingModule,
    CommonModule,
    ReactiveFormsModule,
    DualListModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  declarations: [
    routedComponents
  ],
  providers: [
    UserService,
    RoleService,
    PermissionService
  ]
})
export class RoleModule { }
