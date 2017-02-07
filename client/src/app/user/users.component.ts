import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';
import { UserPermissionsService } from '../user-permissions.service';

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
    .subscribe(() => {
      this.userService.getUsersByStatus('active')
      .subscribe(users => this.users = users);
    });
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
