import { Routes, RouterModule } from '@angular/router';

import { ManageModuleComponent } from './manage/manage-module.component';

import LoginComponent from './login/login.component';
import LoginGuard from './login/login.guard';

// User
import { UserListComponent } from './user/user-list.component';
import { AddUserComponent } from './user/add-user.component';
import { UserDetailComponent } from './user/user-detail.component';

// Role
import { RoleListComponent } from './role/role-list.component';
import { RoleManageComponent } from './role/manage/role-manage.component';

// Permission
import { PermissionComponent } from './permission/permission.component';


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
              path: 'adduser',
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
              path: 'permissions',
              component: PermissionComponent
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
    RoleManageComponent
];
