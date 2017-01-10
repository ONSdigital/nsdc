import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Configuration } from '../../app.constants';
import { Http } from '@angular/http';
import { Role } from '../role';
import { User } from '../../user/user';
import { Permission } from '../../permission/permission';
import { RoleService } from '../role.service';
import { UserService } from '../../user/user.service';
import { PermissionService } from '../../permission/permission.service';

@Component({
  selector: 'role-manage',
  templateUrl : './role-manage.component.html'
})
export class RoleManageComponent implements OnInit {
  roles: Role[];
  users: User[];
  permissions: Permission[];
  selectedRoleId: number;

  constructor(
    private roleService: RoleService,
    private userService: UserService,
    private permissionService: PermissionService
  ) {}

  ngOnInit() {
    this.roleService.getRoles().then(roles => this.roles = roles);
  }

  onChange(roleId) {
    this.selectedRoleId = roleId;
    this.userService.getUsersByRole(roleId).then(users => this.users = users);
    this.permissionService.getPermissionByRole(roleId).then(permissions => this.permissions = permissions);
  }
}
