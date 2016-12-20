import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot } from '@angular/router';
import { UserPermissionsService } from './user-permissions.service';

@Injectable()
export class UserPermissionsGuard implements CanActivate {
  constructor(private userPermissionsService: UserPermissionsService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) {
    let allowedPermission = route.data['permission'] as string;
    return this.userPermissionsService.doesUserHavePermission(allowedPermission);
  }

  canActivateChild(route: ActivatedRouteSnapshot) {
    return this.canActivate(route);
  }
}
