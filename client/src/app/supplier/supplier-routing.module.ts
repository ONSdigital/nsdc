import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPermissionsGuard } from '../user-permissions.guard';
import { SupplierListComponent } from './supplier-list.component';

const routes: Routes = [
  {
    canActivate: [UserPermissionsGuard],
    path: '',
    component: SupplierListComponent,
    data: {
      permission: 'VIEW_SUPPLIERS'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupplierRoutingModule { }

export const routedComponents = [
  SupplierListComponent
];
