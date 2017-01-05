import { Routes, RouterModule } from '@angular/router';

import { ManageModuleComponent } from './manage/manage-module.component';

import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login/login.guard';
import { UserPermissionsGuard } from './user-permissions.guard';
import { IsLoggedInGuard } from './login/is-logged-in.guard';

// User
import { UserListComponent } from './user/user-list.component';
import { AddUserComponent } from './user/add-user.component';
import { UserDetailComponent } from './user/user-detail.component';

// Role
import { RoleListComponent } from './role/role-list.component';
import { RoleManageComponent } from './role/manage/role-manage.component';
import { AddRoleComponent } from './role/add/add-role.component';
import { EditRoleComponent } from './role/edit/edit-role.component';

import { RolePermissionsComponent } from './role/permissions/role-permissions.component';

// Permission
import { PermissionComponent } from './permission/permission.component';
import { AddPermissionComponent } from './permission/add/add-permission.component';
import { EditPermissionComponent } from './permission/edit/edit-permission.component';
import { NoPermissionComponent } from './permission/no-permission.component';

// Supplier
import { SupplierComponent } from './supplier/supplier.component';

// Journey
import { JourneyComponent } from './journey/journey.component';
import { JourneyManageComponent } from './journey/manage/journey-manage.component';
import { JourneyDetailsManageComponent } from './journey/manage/journey-details-manage.component';

const appRoutes: Routes = [
  {
    canActivate: [IsLoggedInGuard],
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    canActivateChild: [LoginGuard],
    children: [
      {
        path: '',
        component: ManageModuleComponent
      },
      {
        path: 'users',
        component: UserListComponent
      },
      {
        path: 'users/add',
        component: AddUserComponent
      },
      {
        path: 'users/:id',
        component: UserDetailComponent
      },
      {
        path: 'roles',
        component: RoleListComponent
      },
      {
        path: 'roles/manage',
        component: RoleManageComponent
      },
      {
        path: 'roles/add',
        component: AddRoleComponent
      },
      {
        path: 'roles/:id',
        component: EditRoleComponent
      },
      {
        path: 'roles/:id/permissions',
        component: RolePermissionsComponent
      },
      {
        canActivate: [UserPermissionsGuard],
        path: 'journeys/details/manage',
        component: JourneyDetailsManageComponent,
        data: {
          permission: 'VIEW_JOURNEY_DETAILS'
        }
      },
      {
        path: 'permissions/add',
        component: AddPermissionComponent
      },
      {
        path: 'permissions/:id',
        component: EditPermissionComponent
      },
      {
        path: 'permissions',
        component: PermissionComponent
      },
      {
        path: 'suppliers',
        component: SupplierComponent
      },
      {
          path: 'journeys',
          component: JourneyComponent
      },
      {
        path: 'journeys/manage',
        component: JourneyManageComponent
      },
      {
        path: 'no-permission',
        component: NoPermissionComponent
      }
    ]
  }
];

// Use hash based routing due to https://github.com/angular/angular/issues/13530
export const routing = RouterModule.forRoot(appRoutes, {useHash: true});

export const routedComponents = [
  ManageModuleComponent,
  LoginComponent,
  UserListComponent,
  AddUserComponent,
  UserDetailComponent,
  RoleListComponent,
  PermissionComponent,
  AddPermissionComponent,
  EditPermissionComponent,
  RoleManageComponent,
  AddRoleComponent,
  EditRoleComponent,
  SupplierComponent,
  JourneyComponent,
  JourneyManageComponent,
  NoPermissionComponent,
  JourneyDetailsManageComponent,
  RolePermissionsComponent
];
