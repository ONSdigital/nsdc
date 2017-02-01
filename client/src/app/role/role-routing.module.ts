import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPermissionsGuard } from '../user-permissions.guard';
import { RoleComponent } from './roles.component';
import { AddRoleComponent } from './add-role.component';
import { EditRoleComponent } from './edit-role.component';
import { RoleManageComponent } from './manage/role-manage.component';
import { RolePermissionsComponent } from './permissions/role-permissions.component';
import { RoleResolver } from './role.resolver';
import { RoleJourneyVersionsComponent } from './journey-versions/role-journey-versions.component';


const routes: Routes = [
  {
    canActivate: [UserPermissionsGuard],
    path: '',
    component: RoleComponent,
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
    },
    resolve: {
      role: RoleResolver
    },
  },
  {
    canActivate: [UserPermissionsGuard],
    path: ':id/journey-versions',
    component: RoleJourneyVersionsComponent,
    data: {
      permission: 'VIEW_ROLES'
    },
    resolve: {
      role: RoleResolver
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoleRoutingModule { }

export const routedComponents = [
  RoleComponent,
  AddRoleComponent,
  EditRoleComponent,
  RoleManageComponent,
  RolePermissionsComponent,
  RoleJourneyVersionsComponent
];
