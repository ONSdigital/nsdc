import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPermissionsGuard } from '../user-permissions.guard';
import { PermissionListComponent } from './permission-list.component';
import { AddPermissionComponent } from './add-permission.component';
import { EditPermissionComponent } from './edit-permission.component';
import { PermissionResolver } from './permission.resolver';

const routes: Routes = [
  {
    canActivate: [UserPermissionsGuard],
    path: 'add',
    component: AddPermissionComponent,
    data: {
      permission: 'ADD_PERMISSIONS'
    }
  },
  {
    canActivate: [UserPermissionsGuard],
    path: ':id',
    component: EditPermissionComponent,
    data: {
      permission: 'EDIT_PERMISSIONS'
    },
    resolve: {
      permission: PermissionResolver
    }
  },
  {
    canActivate: [UserPermissionsGuard],
    path: '',
    component: PermissionListComponent,
    data: {
      permission: 'VIEW_PERMISSIONS'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermissionRoutingModule { }

export const routedComponents = [
  PermissionListComponent,
  AddPermissionComponent,
  EditPermissionComponent,
];
