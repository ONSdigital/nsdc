import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
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
    this.headers.append('Content-Type', 'application/json');
  }

  getPermissions() {
    this.headers.append('X-TOKEN', this.loginService.getToken());
    let permissionListUrl = this.config.Server + 'nsdc/v1.0/permissions';
    return this.http.get(permissionListUrl, { headers: this.headers })
    .toPromise()
    .then(response => response.json() as Permission[])
    .catch(this.handleError);
  }

  getPermissionById(id: number) {
    this.headers.append('X-TOKEN', this.loginService.getToken());
    let permissionUrl = this.config.Server + 'nsdc/v1.0/permissions/' + id;
    return this.http.get(permissionUrl, { headers: this.headers })
    .toPromise()
    .then(response => response.json() as Permission)
    .catch(this.handleError);
  }

  getPermissionByRole(roleId: number) {
    this.headers.append('X-TOKEN', this.loginService.getToken());
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
