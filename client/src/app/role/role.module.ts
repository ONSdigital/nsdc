import { NgModule } from '@angular/core';
import { RoleRoutingModule, routedComponents } from './role-routing.module';
import { RoleService } from './role.service';
import { UserService } from '../user/user.service';
import { JourneyService } from '../journey/journey.service';
import { PermissionService } from '../permission/permission.service';
import { DualListModule } from '../dual-list/dual-list.module';
import { RoleResolver } from './role.resolver';
import { SharedModule } from '../shared';

@NgModule({
  imports: [
    RoleRoutingModule,
    DualListModule,
    SharedModule
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
