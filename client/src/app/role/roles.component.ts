import { Component, OnInit, ViewContainerRef  } from '@angular/core';
import { Role } from './role';
import { RoleService } from './role.service';
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
    private roleService: RoleService,
    public modal: Modal,
    overlay: Overlay,
    vcRef: ViewContainerRef
  ) {
    overlay.defaultViewContainer = vcRef;
  }

  ngOnInit(): void {
    this.loading = true;
    this.roleService.getRoles().subscribe(roles => {
      this.loading = false;
      this.roles = roles;
    });
  }

  onDeleteClicked(roleId) {
    this.roleService.deleteRole(roleId)
      .subscribe(() => this.roleService.getRoles().subscribe(roles => this.roles = roles));
  }
}
