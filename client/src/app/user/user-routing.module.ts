import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPermissionsGuard } from '../user-permissions.guard';
import { UsersComponent } from './users.component';
import { AddUserComponent } from './add-user.component';
import { EditUserComponent } from './edit-user.component';
import { UserResolver } from './user.resolver';

const routes: Routes = [
  {
    canActivate: [UserPermissionsGuard],
    path: '',
    component: UsersComponent,
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
    },
    resolve: {
      user: UserResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [UserResolver]
})
export class UserRoutingModule { }

export const routedComponents = [UsersComponent, AddUserComponent, EditUserComponent];
