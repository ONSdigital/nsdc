import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PermissionListComponent } from './permission-list.component';
import { AddPermissionComponent } from './add/add-permission.component';
import { EditPermissionComponent } from './edit/edit-permission.component';

const routes: Routes = [
  {
    path: 'add',
    component: AddPermissionComponent
  },
  {
    path: ':id',
    component: EditPermissionComponent
  },
  {
    path: '',
    component: PermissionListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermissionRoutingModule { }

export const routedComponents = [
  PermissionListComponent,
  AddPermissionComponent,
  EditPermissionComponent,
];
