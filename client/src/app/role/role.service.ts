import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Role } from './role';
import { Configuration } from '../app.constants';
import { LoginService } from '../login/login.service';


@Injectable()
export class RoleService {

  private actionUrl: string;
  public headers: Headers;

  constructor(private http: Http, private config: Configuration, private loginService: LoginService) {
    this.actionUrl = config.ServerWithApiUrl;
    this.headers = new Headers();
    this.headers.set('Content-Type', 'application/json');
  }

  addRole(role: Role) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    const roleAddUrl = this.config.Server + 'nsdc/v1.0/roles';
    return this.http.post(roleAddUrl, JSON.stringify(role), {headers: this.headers} )
    .toPromise().then(() => role).catch(this.handleError);
  }

  getRoles() {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let roleListUrl = this.config.Server + 'nsdc/v1.0/roles';
    return this.http.get(roleListUrl, {headers: this.headers})
    .toPromise()
    .then(response => response.json() as Role[])
    .catch(this.handleError);
  }

  getRoleById(id: number) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let roleUrl = this.config.Server + 'nsdc/v1.0/roles/' + id;
    return this.http.get(roleUrl, {headers: this.headers})
    .toPromise()
    .then(response => response.json() as Role)
    .catch(this.handleError);
  }

  updateUser(id: number, role: Role) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let roleEditUrl = this.config.Server + 'nsdc/v1.0/roles/' + id;
    this.http.put(roleEditUrl, JSON.stringify(role), {headers: this.headers});
  }

  deleteRole(id: number) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let deleteUrl = this.config.Server + 'nsdc/v1.0/roles/' + id;
    this.http.delete(deleteUrl, {headers: this.headers});
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
