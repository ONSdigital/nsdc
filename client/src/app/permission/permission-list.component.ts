import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { Permission } from './permission';
import { PermissionService } from './permission.service';

@Component({
  selector: 'nsdc-permission-list',
  templateUrl : './permission-list.component.html'
})
export class PermissionListComponent implements OnInit {
  public permissions: Permission[];
  loading = false;

  constructor(
    private permissionService: PermissionService,
    overlay: Overlay,
    vcRef: ViewContainerRef,
    public modal: Modal
  ) {
    overlay.defaultViewContainer = vcRef;
  }

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
      .subscribe(() => this.permissionService.getPermissions().subscribe(permissions => this.permissions = permissions));
  }

}
