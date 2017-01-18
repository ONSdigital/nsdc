import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../role.service';
import { PermissionService } from '../../permission/permission.service';
import { UserPermissionsService } from '../../user-permissions.service';
import { Role } from '../role';
import { Permission } from '../../permission/permission';

@Component({
  selector: 'role-permissions',
  templateUrl: 'role-permissions.component.html',
  styleUrls: ['role-permissions.component.css']
})
export class RolePermissionsComponent implements OnInit {

  role: Role;
  allPermissions: Permission[];
  originalPermissionIds: number[];
  selectedPermissions: Permission[];
  keepSorted: boolean = true;
  key = 'id';
  display = 'name';
  submitPending = false;
  submitFailed = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roleService: RoleService,
    private permissionService: PermissionService,
    private userPermissionsService: UserPermissionsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = Number.parseInt(params['id']);
      this.roleService.getRoleById(id)
      .then(role => this.role = role);
      this.permissionService.getPermissions()
      .then(permissions => {
        this.allPermissions = permissions;
      });
      this.permissionService.getPermissionByRole(id)
      .then(permissions => {
        this.originalPermissionIds = permissions.map(permission => permission.id);
        this.selectedPermissions = permissions;
      });
    });
  }

  saveUpdatedRolePermissions() {
    this.submitPending = true;
    this.submitFailed = false;
    const selectedPermissionIds = this.selectedPermissions.map(permission => permission.id);
    this.roleService.updateRolePermissions(this.role.id, selectedPermissionIds)
    .subscribe(
      () => {
        this.submitPending = false;
        this.userPermissionsService.clearPermissionsCache();
        this.router.navigate(['/roles/manage']);
      },
      error => {
        this.submitPending = false;
        this.submitFailed = true;
        console.log(error);
      }
    );
  }

  cancel() {
    this.router.navigate(['/roles/manage']);
  }
}
