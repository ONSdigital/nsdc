import { Component, OnInit  } from '@angular/core';
import { Role } from './role';
import { RoleService } from './role.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'nsdc-roles',
  templateUrl : 'roles.component.html'
})
export class RoleComponent implements OnInit {
  public roles: Role[];
  loading = false;

  constructor(
    private roleService: RoleService,
    private toasterService: ToasterService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.roleService.getRoles().subscribe(roles => {
      this.loading = false;
      this.roles = roles;
    });
  }

  onDelete(roleId) {
    this.roleService.deleteRole(roleId)
    .subscribe(
      () => this.roleService.getRoles().subscribe(roles => this.roles = roles),
      error => this.toasterService.pop('error', error.message)
    );
  }
}
