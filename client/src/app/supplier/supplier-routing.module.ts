import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPermissionsGuard } from '../user-permissions.guard';
import { AddSupplierComponent } from './add-supplier.component';
import { SuppliersComponent } from './suppliers.component';
import { EditSupplierComponent } from './edit-supplier.component';
import { SupplierResolver } from './supplier.resolver';

const routes: Routes = [
  {
    canActivate: [UserPermissionsGuard],
    path: 'add',
    component: AddSupplierComponent,
    data: {
      permission: 'EDIT_JOURNEYS'
    }
  },
  {
    canActivate: [UserPermissionsGuard],
    path: ':id',
    component: EditSupplierComponent,
    data: {
      permission: 'EDIT_JOURNEYS'
    },
    resolve: {
      supplier: SupplierResolver
    }
  },
  {
    canActivate: [UserPermissionsGuard],
    path: '',
    component: SuppliersComponent,
    data: {
      permission: 'VIEW_JOURNEYS'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SupplierResolver]
})
export class SupplierRoutingModule { }

export const routedComponents = [
  SuppliersComponent,
  AddSupplierComponent,
  EditSupplierComponent
];
