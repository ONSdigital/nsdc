import { Component, OnInit } from '@angular/core';
import { Permission } from './permission';
import { PermissionService } from './permission.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'nsdc-permissions',
  templateUrl : './permissions.component.html'
})
export class PermissionsComponent implements OnInit {
  public permissions: Permission[];
  public loading = false;

  constructor(
    private permissionService: PermissionService,
    private toasterService: ToasterService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.permissionService.getPermissions()
    .subscribe(permissions => {
      this.loading = false;
      this.permissions = permissions;
    });
  }

  onDeleteClicked(permissionId) {
    this.permissionService.deletePermission(permissionId)
    .subscribe(
      () => this.permissionService.getPermissions().subscribe(permissions => this.permissions = permissions),
      error => this.toasterService.pop('error', error.message)
    );
  }

}
