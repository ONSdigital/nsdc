import { NgModule } from '@angular/core';
import { UserRoutingModule, routedComponents } from './user-routing.module';
import { SharedModule } from '../shared';
import { UserService } from './user.service';
import { RoleService } from '../role/role.service';
import { ConfirmModalModule } from '../confirm-modal';
import { ValidatorModule } from '../validator/validator.module';
import { HttpClientInterceptor } from '../http-client/http-client.interceptor';

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
    RoleService,
    HttpClientInterceptor
  ]
})
export class UserModule { }
