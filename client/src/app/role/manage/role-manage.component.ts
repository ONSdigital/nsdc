import { Component, OnInit } from '@angular/core';
import { Role } from '../role';
import { User } from '../../user/user';
import { Permission } from '../../permission/permission';
import { RoleService } from '../role.service';
import { UserService } from '../../user/user.service';
import { PermissionService } from '../../permission/permission.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'nsdc-role-manage',
  templateUrl : './role-manage.component.html'
})
export class RoleManageComponent implements OnInit {
  roles: Role[];
  users: User[];
  permissions: Permission[];
  selectedRoleId: number;
  loading = false;
  dropdownLoading = false;

  constructor(
    private roleService: RoleService,
    private userService: UserService,
    private permissionService: PermissionService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.dropdownLoading = true;
    this.roleService.getRoles()
    .subscribe(roles => {
      this.loading = false;
      this.dropdownLoading = false;
      this.roles = roles;
    });
  }

  onChange(roleId) {
    this.selectedRoleId = roleId;
    if (roleId !== '') {
      this.loading = true;
      Observable.forkJoin([
        this.userService.getUsersByRole(roleId).map(users => this.users = users),
        this.permissionService.getPermissionByRole(roleId).map(permissions => this.permissions = permissions)
      ])
      .subscribe(() => this.loading = false);
    }
  }
}
