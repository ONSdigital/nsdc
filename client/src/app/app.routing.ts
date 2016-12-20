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
        component: ManageModuleComponent,
        canActivate: [LoginGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'users',
        component: UserListComponent,
        canActivate: [LoginGuard]
    },
    {
        path: 'users/:id',
        component: UserDetailComponent,
        canActivate: [LoginGuard]
    },
    {
        path: 'adduser',
        component: AddUserComponent,
        canActivate: [LoginGuard]
    },
    {
        path: 'roles',
        component: RoleListComponent,
        canActivate: [LoginGuard]
    },
    {
        path: 'roles/manage',
        component: RoleManageComponent,
        canActivate: [LoginGuard]
    },
    {
        path: 'permissions',
        component: PermissionComponent,
        canActivate: [LoginGuard]
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
