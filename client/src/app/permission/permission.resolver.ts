import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { PermissionService } from './permission.service';
import { Permission } from './permission';
import { Observable } from "rxjs/Observable";

@Injectable()
export class PermissionResolver implements Resolve<Permission> {
  constructor(
    private PermissionService: PermissionService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state): Observable<Permission> {
    return this.PermissionService.getPermissionById(route.params['id']);
  }
}
