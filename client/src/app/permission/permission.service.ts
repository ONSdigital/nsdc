import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Permission } from './permission';
import { Configuration } from '../app.constants';
import { HttpClientInterceptor } from '../http-client/http-client.interceptor';

@Injectable()
export class PermissionService {
  private actionUrl: string;
  public headers: Headers;

  constructor(
    private http: HttpClientInterceptor,
    private config: Configuration
  ) {
    this.actionUrl = config.ServerWithApiUrl + 'permissions';
  }

  addPermission(permission: Permission) {
    return this.http.post(this.actionUrl, permission);
  }

  updatePermission(permission: Permission) {
    return this.http.put(this.actionUrl + '/' + permission.id, permission);
  }

  deletePermission(id: number) {
    return this.http.delete(this.actionUrl + '/' + id);
  }

  getPermissions() : Observable<Permission[]> {
    return this.http.get(this.actionUrl);
  }

  getPermissionById(id: number) : Observable<Permission> {
    return this.http.get(this.actionUrl + '/' + id);
  }

  getPermissionByRole(roleId: number) : Observable<Permission[]> {
    return this.http.get(this.actionUrl + '/role/' + roleId);
  }
}
