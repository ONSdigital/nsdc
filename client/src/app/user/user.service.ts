import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs/Observable';
import { User } from './user';
import { Configuration } from '../app.constants';

@Injectable()
export class UserService {

  private actionUrl: string;
  public headers: Headers;

  constructor(private http: Http, private config: Configuration, private loginService: LoginService) {
    this.actionUrl = config.Server + 'nsdc/v1.0/users';

    this.headers = new Headers();
    this.headers.set('Content-Type', 'application/json');
  }

  addUser(user: User) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let userAddUrl = this.config.Server + 'nsdc/v1.0/users';
    return this.http.post(userAddUrl, JSON.stringify(user), { headers: this.headers } )
    .map(res => res.json())
    .catch(res => {
      return Observable.throw(res.json());
    });
  }

  getUsersByStatus(status: string) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let userUrl = this.config.Server + 'nsdc/v1.0/users/status/' + status;
    return this.http.get(userUrl, { headers: this.headers })
      .toPromise().then(response => response.json() as User[])
      .catch(this.handleError);
  }

  getUserById(id: number) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let userUrl = this.config.Server + 'nsdc/v1.0/users/' + id;
    return this.http.get(userUrl, { headers: this.headers })
    .toPromise().then(response => response.json() as User)
    .catch(this.handleError);
  }

  getUsersByRole(roleId: number) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let userUrl = this.config.Server + 'nsdc/v1.0/users/role/' + roleId;
    return this.http.get(userUrl, { headers: this.headers })
    .toPromise()
    .then(response => response.json() as User[])
    .catch(this.handleError);
  }

  updateUser(user: User) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let userEditUrl = this.config.Server + 'nsdc/v1.0/users/' + user.id;
    return this.http.put(userEditUrl, JSON.stringify(user),
    { headers: this.headers }).toPromise().then(() => user).catch(this.handleError);
  }

  deactivateUser(id: number) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let deactivateUrl = this.config.Server + 'nsdc/v1.0/users/' + id;
    return this.http.put(deactivateUrl, JSON.stringify({status: 'inactive'}), { headers: this.headers })
    .map(res => res.json())
    .catch(res => {
      return Observable.throw(res.json());
    });
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
