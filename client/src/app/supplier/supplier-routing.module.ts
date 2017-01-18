import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPermissionsGuard } from '../user-permissions.guard';
import { AddSupplierComponent } from './add/add-supplier.component';
import { SupplierListComponent } from './supplier-list.component';
import { EditSupplierComponent } from './edit/edit-supplier.component';
import { EditSupplierResolver } from './edit/edit-supplier.resolver';

const routes: Routes = [
  {
    canActivate: [UserPermissionsGuard],
    path: 'add',
    component: AddSupplierComponent,
    data: {
      permission: 'ADD_SUPPLIERS'
    }
  },
  {
    canActivate: [UserPermissionsGuard],
    path: ':id',
    component: EditSupplierComponent,
    data: {
      permission: 'EDIT_SUPPLIERS'
    },
    resolve: {
      supplier: EditSupplierResolver
    }
  },
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
  SupplierListComponent,
  AddSupplierComponent,
  EditSupplierComponent
];
