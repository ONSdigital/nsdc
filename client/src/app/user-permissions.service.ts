import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { LoginService } from './login/login.service';
import { Permission } from './permission/permission';
import { Configuration } from './app.constants';
import { Observable } from 'rxjs/Rx';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class UserPermissionsService {

  private permissions: Observable<Permission[]>;

  constructor(private http: Http, private loginService: LoginService, private config: Configuration, private router: Router) {}

  getUserPermissions(): Observable<Permission[]> {
    if (!this.permissions) {
      const userPermissionsUrl = this.config.Server + 'nsdc/v1.0/self/permissions';
      let headers = new Headers();
      headers.append('X-TOKEN', this.loginService.getSessionId());
      this.permissions = this.http.get(userPermissionsUrl, { headers })
      .map(res => res.json())
      .publishReplay(1)
      .refCount();
    }
    return this.permissions;
  }

  doesUserHavePermission(permissionToCheck): Observable<boolean> {
    return this.getUserPermissions()
    .map(permissions => permissions.map(permission => permission.short_name))
    .map(permissions => {
      return permissions.indexOf(permissionToCheck) !== -1;
    });
  }

  clearPermissionsCache() {
    this.permissions = null;
  }
}
