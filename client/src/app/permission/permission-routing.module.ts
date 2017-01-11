import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPermissionsGuard } from '../user-permissions.guard';
import { PermissionListComponent } from './permission-list.component';
import { AddPermissionComponent } from './add/add-permission.component';
import { EditPermissionComponent } from './edit/edit-permission.component';

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
