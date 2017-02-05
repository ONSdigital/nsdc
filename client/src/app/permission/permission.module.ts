import { NgModule } from '@angular/core';
import { PermissionRoutingModule, routedComponents } from './permission-routing.module';
import { PermissionService } from './permission.service';
import { PermissionResolver } from './permission.resolver';
import { SharedModule } from '../shared';

@NgModule({
  imports: [
    PermissionRoutingModule,
    SharedModule
  ],
  declarations: [
    routedComponents
  ],
  providers: [
    PermissionService,
    PermissionResolver
  ],
})
export class PermissionModule { }
