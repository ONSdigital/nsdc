import { Routes, RouterModule } from '@angular/router';

import { ManageModuleComponent } from './manage/manage-module.component';

import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login/login.guard';
import { UserPermissionsGuard } from './user-permissions.guard';

// User
import { UserListComponent } from './user/user-list.component';
import { AddUserComponent } from './user/add-user.component';
import { UserDetailComponent } from './user/user-detail.component';

// Role
import { RoleListComponent } from './role/role-list.component';
import { RoleManageComponent } from './role/manage/role-manage.component';
import { AddRoleComponent } from './role/add-role.component';

// Permission
import { PermissionComponent } from './permission/permission.component';
import { NoPermissionComponent } from './permission/no-permission.component';

// Supplier
import { SupplierComponent } from './supplier/supplier.component';

// Journey
import { JourneyComponent } from './journey/journey.component';
import { JourneyManageComponent } from './journey/manage/journey-manage.component';
import { JourneyDetailsManageComponent } from './journey/manage/journey-details-manage.component';

const appRoutes: Routes = [
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
        path: 'users/:id',
        component: UserDetailComponent
      },
      {
        path: 'users/add',
        component: AddUserComponent
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
        canActivate: [UserPermissionsGuard],
        path: 'journeys/details/manage',
        component: JourneyDetailsManageComponent,
        data: {
          permission: 'VIEW_JOURNEY_DETAILS'
        }
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
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [
    ManageModuleComponent,
    LoginComponent,
    UserListComponent,
    AddUserComponent,
    UserDetailComponent,
    RoleListComponent,
    PermissionComponent,
    RoleManageComponent,
    AddRoleComponent,
    SupplierComponent,
    JourneyComponent,
    JourneyManageComponent,
    NoPermissionComponent,
    JourneyDetailsManageComponent
];
