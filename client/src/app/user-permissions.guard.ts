import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot } from '@angular/router';
import { UserPermissionsService } from './user-permissions.service';

@Injectable()
export class UserPermissionsGuard implements CanActivate {
  constructor(private userPermissionsService: UserPermissionsService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) {
    let allowedPermission = route.data['permission'] as string;
    const activate = this.userPermissionsService.doesUserHavePermission(allowedPermission);
    this.router.navigate(['no-permission']);
    return activate;
  }

  canActivateChild(route: ActivatedRouteSnapshot) {
    return this.canActivate(route);
  }
}
