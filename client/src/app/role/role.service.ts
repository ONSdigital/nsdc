import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Role } from './role';
import { Configuration } from '../app.constants';


@Injectable()
export class RoleService {

  private actionUrl: string;
  public headers: Headers;

  constructor(private http: Http, private config: Configuration) {
    this.actionUrl = config.ServerWithApiUrl;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  addRole(role: Role) {
    let userAddUrl = this.config.Server + 'nsdc/v1.0/post_role';
    this.http.post(userAddUrl, JSON.stringify(role), {headers: this.headers} );
  }

  getRoles() {
    let roleListUrl = this.config.Server + 'nsdc/v1.0/roles';
    return this.http.get(roleListUrl).toPromise().then(response => response.json() as Role[]).catch(this.handleError);
  }

  getRoleById(id: number) {
    let roleUrl = this.config.Server + 'nsdc/v1.0/roles/' + id;
    return this.http.get(roleUrl).toPromise().then(response => response.json() as Role).catch(this.handleError);
  }

  updateUser(id: number, role: Role) {
    let roleEditUrl = this.config.Server + 'nsdc/v1.0/roles/' + id;
    this.http.put(roleEditUrl, JSON.stringify(role), {headers: this.headers});
  }

  deleteRole(id: number) {
    let deleteUrl = this.config.Server + 'nsdc/v1.0/roles/' + id;
    this.http.delete(deleteUrl);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
