import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPermissionsGuard } from '../user-permissions.guard';
import { FileUploadComponent } from './file-upload.component';
import { JourneyFileUploadComponent } from './journey/journey-file-upload.component';

const routes: Routes = [
  {
    canActivate: [UserPermissionsGuard],
    path: '',
    component: FileUploadComponent,
    data: {
      permission: 'DATA_IMPORT'
    }
  },
  {
    canActivate: [UserPermissionsGuard],
    path: ':id',
    component: JourneyFileUploadComponent,
    data: {
      permission: 'DATA_IMPORT'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FileUploadRoutingModule { }

export const routedComponents = [FileUploadComponent, JourneyFileUploadComponent];
