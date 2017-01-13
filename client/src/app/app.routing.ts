import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login/login.guard';
import { IsLoggedInGuard } from './login/is-logged-in.guard';
import { NoPermissionComponent } from './permission/no-permission.component';

export const appRoutes: Routes = [
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
        loadChildren: './file-upload/file-upload.module#FileUploadModule'
      },
      {
        path: 'audit',
        loadChildren: './file-audit/file-audit.module#FileAuditModule'
      },
      {
        path: 'users',
        loadChildren: './user/user.module#UserModule'
      },
      {
        path: 'roles',
        loadChildren: './role/role.module#RoleModule'
      },
      {
        path: 'permissions',
        loadChildren: './permission/permission.module#PermissionModule'
      },
      {
        path: 'journeys',
        loadChildren: './journey/journey.module#JourneyModule'
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
