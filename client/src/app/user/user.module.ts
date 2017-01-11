import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule, routedComponents } from './user-routing.module';
import { LoadingModule } from '../loading/loading.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { UserService } from './user.service';
import { RoleService } from '../role/role.service';
import { EditUserResolver } from './edit/edit-user.resolver';

@NgModule({
  imports: [
    UserRoutingModule,
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
    UserService,
    RoleService,
    EditUserResolver
  ]
})
export class UserModule { }
