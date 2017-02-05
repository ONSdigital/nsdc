import { NgModule } from '@angular/core';
import { UserRoutingModule, routedComponents } from './user-routing.module';
import { SharedModule } from '../shared';
import { UserService } from './user.service';
import { RoleService } from '../role/role.service';
import { UserComponent } from './user.component';

@NgModule({
  imports: [
    UserRoutingModule,
    SharedModule
  ],
  declarations: [
    routedComponents,
    UserComponent
  ],
  providers: [
    UserService,
    RoleService
  ]
})
export class UserModule { }
