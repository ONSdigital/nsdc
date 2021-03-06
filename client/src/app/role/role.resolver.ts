import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { RoleService } from './role.service';
import { Role } from './role';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RoleResolver implements Resolve<Role> {
  constructor(
    private roleService: RoleService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state): Observable<Role> {
    return this.roleService.getRoleById(route.params['id']);
  }
}
