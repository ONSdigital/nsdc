import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPermissionsGuard } from '../user-permissions.guard';
import { UserListComponent } from './user-list.component';
import { AddUserComponent } from './add/add-user.component';
import { EditUserComponent } from './edit/edit-user.component';

const routes: Routes = [
  {
    canActivate: [UserPermissionsGuard],
    path: '',
    component: UserListComponent,
    data: {
      permission: 'VIEW_USERS'
    }
  },
  {
    canActivate: [UserPermissionsGuard],
    path: 'add',
    component: AddUserComponent,
    data: {
      permission: 'ADD_USERS'
    }
  },
  {
    canActivate: [UserPermissionsGuard],
    path: ':id',
    component: EditUserComponent,
    data: {
      permission: 'EDIT_USERS'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }

export const routedComponents = [UserListComponent, AddUserComponent, EditUserComponent];
