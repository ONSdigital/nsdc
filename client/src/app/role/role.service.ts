import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Role } from './role';
import { Configuration } from '../app.constants';
import LoginService from '../login/login.service';


@Injectable()
export class RoleService {

  private actionUrl: string;
  public headers: Headers;

  constructor(private http: Http, private config: Configuration, private loginService: LoginService) {
    this.actionUrl = config.ServerWithApiUrl;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  addRole(role: Role) {
    this.headers.append('X-TOKEN', this.loginService.getToken());
    let userAddUrl = this.config.Server + 'nsdc/v1.0/post_role';
    this.http.post(userAddUrl, JSON.stringify(role), {headers: this.headers} );
  }

  getRoles() {
    this.headers.append('X-TOKEN', this.loginService.getToken());
    let roleListUrl = this.config.Server + 'nsdc/v1.0/roles';
    return this.http.get(roleListUrl, {headers: this.headers})
      .toPromise()
      .then(response => response.json() as Role[])
      .catch(this.handleError);
  }

  getRoleById(id: number) {
    this.headers.append('X-TOKEN', this.loginService.getToken());
    let roleUrl = this.config.Server + 'nsdc/v1.0/roles/' + id;
    return this.http.get(roleUrl, {headers: this.headers})
      .toPromise().then(response => response.json() as Role)
      .catch(this.handleError);
  }

  updateUser(id: number, role: Role) {
    this.headers.append('X-TOKEN', this.loginService.getToken());
    let roleEditUrl = this.config.Server + 'nsdc/v1.0/roles/' + id;
    this.http.put(roleEditUrl, JSON.stringify(role), {headers: this.headers});
  }

  deleteRole(id: number) {
    this.headers.append('X-TOKEN', this.loginService.getToken());
    let deleteUrl = this.config.Server + 'nsdc/v1.0/roles/' + id;
    this.http.delete(deleteUrl, {headers: this.headers});
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
