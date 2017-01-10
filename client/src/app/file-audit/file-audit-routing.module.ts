import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPermissionsGuard } from '../user-permissions.guard';
import { FileAuditComponent } from './file-audit.component';

const routes: Routes = [
  {
    canActivate: [UserPermissionsGuard],
    path: '',
    component: FileAuditComponent,
    data: {
      permission: 'DATA_AUDIT'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FileAuditRoutingModule { }

export const routedComponents = [FileAuditComponent];
