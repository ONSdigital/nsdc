import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleRoutingModule, routedComponents } from './role-routing.module';
import { LoadingModule } from '../loading/loading.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { RoleService } from './role.service';
import { UserService } from '../user/user.service';
import { JourneyService } from '../journey/journey.service';
import { PermissionService } from '../permission/permission.service';
import { DualListModule } from '../dual-list/dual-list.module';
import { RoleResolver } from './role.resolver';
import { ValidatorModule } from '../validator/validator.module';

@NgModule({
  imports: [
    RoleRoutingModule,
    LoadingModule,
    CommonModule,
    ReactiveFormsModule,
    DualListModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    ValidatorModule
  ],
  declarations: [
    routedComponents
  ],
  providers: [
    UserService,
    RoleService,
    JourneyService,
    PermissionService,
    RoleResolver
  ]
})
export class RoleModule { }
