import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { Permission } from './permission';
import { PermissionService } from './permission.service';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'nsdc-permission-list',
  templateUrl : './permission-list.component.html'
})
export class PermissionListComponent implements OnInit {

  public permissions: Permission[];
  loading = false;

  constructor(
    private http: Http,
    private permissionService: PermissionService,
    overlay: Overlay,
    vcRef: ViewContainerRef,
    public modal: Modal
  ) {
    overlay.defaultViewContainer = vcRef;
  }

  ngOnInit(): void {
    this.loading = true;
    this.permissionService.getPermissions().then(permissions => {
      this.loading = false;
      this.permissions = permissions;
    });
  }

  onDeleteClicked(permissionId) {
    const modalConfirmation = this.modal.confirm()
    .size('sm')
    .isBlocking(false)
    .showClose(true)
    .keyboard(27)
    .title('Confirm')
    .body('Are you sure you want to delete this permission?')
    .open();

    modalConfirmation.then(dialog => dialog.result).then(
      () => {
        this.permissionService.deletePermission(permissionId)
        .subscribe(() => {
          this.permissionService.getPermissions().then(permissions => this.permissions = permissions);
        });
      },
      () => {}
    );
  }

}
