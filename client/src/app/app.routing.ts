import { Routes, RouterModule } from '@angular/router';
import { FileUploadModule } from './file-upload/file-upload.module';
import { FileAuditModule } from './file-audit/file-audit.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login/login.guard';
import { IsLoggedInGuard } from './login/is-logged-in.guard';

import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { JourneyModule } from './journey/journey.module';

import { NoPermissionComponent } from './permission/no-permission.component';

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
        component: DashboardComponent
      },
      {
        path: 'upload',
        loadChildren: () => FileUploadModule
      },
      {
        path: 'audit',
        loadChildren: () => FileAuditModule
      },
      {
        path: 'users',
        loadChildren: () => UserModule
      },
      {
        path: 'roles',
        loadChildren: () => RoleModule
      },
      {
        path: 'permissions',
        loadChildren: () => PermissionModule
      },
      {
        path: 'journeys',
        loadChildren: () => JourneyModule
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
  DashboardComponent,
  LoginComponent,
  NoPermissionComponent
];
