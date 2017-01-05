import { Component, OnInit, ViewContainerRef  } from '@angular/core';
import { Role } from './role';
import { RoleService } from './role.service';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

@Component({
  selector: 'role-list',
  templateUrl : './role-list.component.html',
  providers: [RoleService]
})
export class RoleListComponent implements OnInit {

  public roles: Role[];

  constructor(
    private http: Http,
    private roleService: RoleService,
    overlay: Overlay,
    vcRef: ViewContainerRef,
    public modal: Modal
  ) {
    overlay.defaultViewContainer = vcRef;
  }

  ngOnInit(): void {
    this.roleService.getRoles().then((roles) => this.roles = roles);
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
          this.roleService.getRoles().then((roles) => this.roles = roles);
        });
      },
      () => {}
    );
  }
}
