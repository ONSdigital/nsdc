import { Component, OnInit, ViewContainerRef  } from '@angular/core';
import { Role } from './role';
import { RoleService } from './role.service';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

@Component({
  selector: 'nsdc-roles',
  templateUrl : 'roles.component.html'
})
export class RoleComponent implements OnInit {

  public roles: Role[];
  loading = false;

  constructor(
    private http: Http,
    private roleService: RoleService,
    public modal: Modal,
    overlay: Overlay,
    vcRef: ViewContainerRef
  ) {
    overlay.defaultViewContainer = vcRef;
  }

  ngOnInit(): void {
    this.loading = true;
    this.roleService.getRoles().then(roles => {
      this.loading = false;
      this.roles = roles;
    });
  }

    onDeleteClicked(roleId) {
    const modalConfirmation = this.modal.confirm()
    .size('sm')
    .isBlocking(false)
    .showClose(true)
    .keyboard(27)
    .title('Confirm')
    .body('Are you sure you want to delete this role?')
    .open();

    modalConfirmation.then(dialog => dialog.result).then(
      () => {
        this.roleService.deleteRole(roleId)
        .subscribe(() => {
          this.roleService.getRoles().then(roles => this.roles = roles);
        });
      },
      () => {}
    );
  }
}
