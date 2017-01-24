import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { User } from './user';
import { UserService } from './user.service';
import { UserPermissionsService } from '../user-permissions.service';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Configuration } from '../app.constants';

@Component({
  selector: 'user-list',
  templateUrl : './user-list.component.html'
})
export class UserListComponent implements OnInit {

  public users: User[];
  permissionShortNames: string[];
  loading = false;

  constructor(
    private http: Http,
    private userService: UserService,
    private userPermissionsService: UserPermissionsService,
    public modal: Modal,
    overlay: Overlay,
    vcRef: ViewContainerRef
  ) {
    overlay.defaultViewContainer = vcRef;
  }

  ngOnInit(): void {
    this.loading = true;
    this.userService.getUsersByStatus("active").then(users => {
      this.users = users;
      this.loading = false;
    });
    this.userPermissionsService.getUserPermissions()
    .subscribe(permissions => {
      this.permissionShortNames = permissions.map(permission => permission.short_name);
    });
  }

  onDeactivateClicked(userId) {
    const modalConfirmation = this.modal.confirm()
    .size('sm')
    .isBlocking(false)
    .showClose(true)
    .keyboard(27)
    .title('Confirm')
    .body('Are you sure you want to deactivate this user?')
    .open();

    modalConfirmation.then(dialog => dialog.result).then(
      () => {
        this.userService.deactivateUser(userId)
        .subscribe(() => {
          this.userService.getUsersByStatus("active").then(users => this.users = users);
        });
      },
      () => {}
    );
  }

  onStatusChange(status) {
    this.userService.getUsersByStatus(status).then(users => {
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
