import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../role.service';
import { PermissionService } from '../../permission/permission.service';
import { UserPermissionsService } from '../../user-permissions.service';
import { Role } from '../role';
import { Permission } from '../../permission/permission';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'nsdc-role-permissions',
  templateUrl: 'role-permissions.component.html'
})
export class RolePermissionsComponent implements OnInit {
  role: Role;
  allPermissions: Permission[];
  selectedPermissions: Permission[];
  keepSorted: boolean = true;
  key = 'id';
  display = 'name';
  loading = false;
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
      this.loading = true;
      Observable.forkJoin([
        this.roleService.getRoleById(id)
          .map(role => this.role = role),
        this.permissionService.getPermissions()
          .map(permissions => this.allPermissions = permissions),
        this.permissionService.getPermissionByRole(id)
          .map(permissions => this.selectedPermissions = permissions)
      ])
      .subscribe(() => this.loading = false);
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
      }
    );
  }

  cancel() {
    this.router.navigate(['/roles/manage']);
  }
}
