import { NgModule } from '@angular/core';
import { UserRoutingModule, routedComponents } from './user-routing.module';
import { SharedModule } from '../shared';
import { UserService } from './user.service';
import { RoleService } from '../role/role.service';
import { ConfirmModalModule } from '../confirm-modal';
import { ValidatorModule } from '../validator/validator.module';

@NgModule({
  imports: [
    UserRoutingModule,
    SharedModule
  ],
  declarations: [
    routedComponents
  ],
  providers: [
    UserService,
    RoleService
  ]
})
export class UserModule { }
