import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Role } from './role';
import { Configuration } from '../app.constants';
import { AuthHttpInterceptorService } from '../shared/auth-http-interceptor/auth-http-interceptor.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RoleService {
  private actionUrl: string;
  public headers: Headers;

  constructor(
    private http: AuthHttpInterceptorService,
    private config: Configuration
  ) {
    this.actionUrl = config.ServerWithApiUrl + 'roles';
  }

  addRole(role: Role) {
    return this.http.post(this.actionUrl, role);
  }

  getRoles(): Observable<Role[]> {
    return this.http.get(this.actionUrl);
  }

  getRoleById(id: number): Observable<Role> {
    return this.http.get(this.actionUrl + '/' + id);
  }

  updateRole(role: Role) {
    return this.http.put(this.actionUrl + '/' + role.id, role);
  }

  deleteRole(id: number) {
    return this.http.delete(this.actionUrl + '/' + id);
  }

  updateRolePermissions(id: number, permissionIds: number[]) {
    return this.http.post(this.actionUrl + '/' + id + '/permissions', { permissions: permissionIds });
  }

  updateRoleJourneyVersions(id: number, journeyVersionIds: number[]) {
    return this.http.post(this.actionUrl + '/' + id + '/journey/versions', { versions: journeyVersionIds });
  }
}
