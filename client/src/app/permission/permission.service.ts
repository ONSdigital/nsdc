import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs/Observable';
import { Permission } from './permission';
import { Configuration } from '../app.constants';

@Injectable()
export class PermissionService {

  private actionUrl: string;
  public headers: Headers;

  constructor(private http: Http, private config: Configuration, private loginService: LoginService) {
    this.actionUrl = config.ServerWithApiUrl;
    this.headers = new Headers();
    this.headers.set('Content-Type', 'application/json');
  }

  addPermission(permission: Permission) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let permissionAddUrl = this.config.Server + 'nsdc/v1.0/permissions';
    return this.http.post(permissionAddUrl, JSON.stringify(permission), { headers: this.headers } )
    .map(res => res.json())
    .catch(res => {
      return Observable.throw(res.json());
    });
  }

  updatePermission(permission: Permission) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let permissionEditUrl = this.config.Server + 'nsdc/v1.0/permissions/' + permission.id;
    return this.http.put(permissionEditUrl, JSON.stringify(permission), { headers: this.headers } )
    .map(res => res.json())
    .catch(res => {
      return Observable.throw(res.json());
    });
  }

  deletePermission(id: number) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let permissionDeleteUrl = this.config.Server + 'nsdc/v1.0/permissions/' + id;
    return this.http.delete(permissionDeleteUrl, { headers: this.headers } )
    .map(res => res.json())
    .catch(res => {
      return Observable.throw(res.json());
    });
  }

  getPermissions() {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let permissionListUrl = this.config.Server + 'nsdc/v1.0/permissions';
    return this.http.get(permissionListUrl, { headers: this.headers })
    .toPromise()
    .then(response => response.json() as Permission[])
    .catch(this.handleError);
  }

  getPermissionById(id: number) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let permissionUrl = this.config.Server + 'nsdc/v1.0/permissions/' + id;
    return this.http.get(permissionUrl, { headers: this.headers })
    .toPromise()
    .then(response => response.json() as Permission)
    .catch(this.handleError);
  }

  getPermissionByRole(roleId: number) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let permissionUrl = this.config.Server + 'nsdc/v1.0/permissions/role/' + roleId;
    return this.http.get(permissionUrl, { headers: this.headers })
    .toPromise()
    .then(response => response.json() as Permission[])
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
