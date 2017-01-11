import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { PermissionService } from '../permission.service';
import { Permission } from '../permission';

@Injectable()
export class EditPermissionResolver implements Resolve<Permission> {
  constructor(
    private PermissionService: PermissionService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state): Promise<Permission> {
    return this.PermissionService.getPermissionById(route.params['id']);
  }
}
