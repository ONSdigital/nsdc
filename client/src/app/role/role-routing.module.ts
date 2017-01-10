import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPermissionsGuard } from '../user-permissions.guard';
import { RoleListComponent } from './role-list.component';
import { AddRoleComponent } from './add/add-role.component';
import { EditRoleComponent } from './edit/edit-role.component';
import { RoleManageComponent } from './manage/role-manage.component';
import { RolePermissionsComponent } from './permissions/role-permissions.component';


const routes: Routes = [
  {
    canActivate: [UserPermissionsGuard],
    path: '',
    component: RoleListComponent,
    data: {
      permission: 'VIEW_ROLES'
    }
  },
  {
    canActivate: [UserPermissionsGuard],
    path: 'add',
    component: AddRoleComponent,
    data: {
      permission: 'ADD_ROLES'
    }
  },
  {
    canActivate: [UserPermissionsGuard],
    path: 'manage',
    component: RoleManageComponent,
    data: {
      permission: 'VIEW_ROLES'
    }
  },
  {
    canActivate: [UserPermissionsGuard],
    path: ':id/permissions',
    component: RolePermissionsComponent,
    data: {
      permission: 'EDIT_ROLES'
    }
  },
  {
    canActivate: [UserPermissionsGuard],
    path: ':id',
    component: EditRoleComponent,
    data: {
      permission: 'EDIT_ROLES'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoleRoutingModule { }

export const routedComponents = [
  RoleListComponent,
  AddRoleComponent,
  EditRoleComponent,
  RoleManageComponent,
  RolePermissionsComponent
];
