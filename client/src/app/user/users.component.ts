import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';
import { UserPermissionsService } from '../user-permissions.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'nsdc-users',
  templateUrl : 'users.component.html'
})
export class UsersComponent implements OnInit {

  public users: User[];
  permissionShortNames: string[];
  loading = false;

  constructor(
    private userService: UserService,
    private toasterService: ToasterService,
    private userPermissionsService: UserPermissionsService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.userService.getUsersByStatus('active')
    .subscribe(users => {
      this.users = users;
      this.loading = false;
    });
    this.userPermissionsService.getUserPermissions()
    .subscribe(permissions => {
      this.permissionShortNames = permissions.map(permission => permission.short_name);
    });
  }

  onDeactivate(userId) {
    this.userService.deactivateUser(userId)
    .subscribe(
      () => {
        this.userService.getUsersByStatus('active')
        .subscribe(users => this.users = users);
      },
      error => this.toasterService.pop('error', error.message)
    );
  }

  onStatusChange(status) {
    this.userService.getUsersByStatus(status)
    .subscribe(users => {
      this.users = users;
      this.loading = false;
    });
  }

  canEdit() {
    return this.permissionShortNames.includes('EDIT_USERS');
  }

  canAdd() {
    return this.permissionShortNames.includes('ADD_USERS');
  }
}
