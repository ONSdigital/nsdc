import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { LoginService } from './login/login.service';
import { Configuration } from './app.constants';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UserPermissionsService {
  private permissions = [];

  constructor(private http: Http, private loginService: LoginService, private config: Configuration) {}

  getUserPermissions() {
    let userPermissionsUrl = this.config.Server + 'nsdc/v1.0/permissions/user/' + this.loginService.getCurrentUserId();
    let headers = new Headers();
    headers.append('X-TOKEN', this.loginService.getToken());
    return this.http.get(userPermissionsUrl, { headers })
    .map(res => res.json());
  }

  doesUserHavePermission(permissionToCheck): Observable<boolean> {
    return this.getUserPermissions()
    .map(permissions => permissions.map(permission => permission.permission_short_name))
    .map(permissions => {
      return permissions.indexOf(permissionToCheck) !== -1;
    });
  }
}
