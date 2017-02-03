import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs/Observable';
import { User } from './user';
import { Configuration } from '../app.constants';

@Injectable()
export class UserService {

  private actionUrl: string;
  public headers: Headers;

  constructor(
    private http: Http,
    private config: Configuration,
    private loginService: LoginService
  ) {
    this.actionUrl = config.Server + 'nsdc/v1.0/users';
    this.headers = new Headers();
    this.headers.set('Content-Type', 'application/json');
  }

  addUser(user: User) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    return this.http.post(this.actionUrl, JSON.stringify(user), { headers: this.headers } )
    .map(res => res.json())
    .catch(res => Observable.throw(res.json()));
  }

  getUsersByStatus(status: string) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    return this.http.get(this.actionUrl + '/status/' + status, { headers: this.headers })
      .map(res => res.json() as User[]);
  }

  getUserById(id: number) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    return this.http.get(this.actionUrl + '/' + id, { headers: this.headers })
      .map(res => res.json() as User);
  }

  getUsersByRole(roleId: number) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    return this.http.get(this.actionUrl + '/role/' + roleId, { headers: this.headers })
      .map(res => res.json() as User[]);
  }

  updateUser(user: User) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    return this.http.put(this.actionUrl + '/' + user.id, JSON.stringify(user), { headers: this.headers })
      .map(res => res.json() as User);
  }

  deactivateUser(id: number) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    return this.http.put(this.actionUrl + '/' + id, JSON.stringify({status: 'inactive'}), { headers: this.headers })
    .map(res => res.json())
    .catch(res => {
      return Observable.throw(res.json());
    });
  }
}
