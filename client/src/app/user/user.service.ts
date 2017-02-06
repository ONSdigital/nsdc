import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from './user';
import { Configuration } from '../app.constants';
import { HttpClientInterceptor } from '../http-client/http-client.interceptor';

@Injectable()
export class UserService {

  private actionUrl: string;
  public headers: Headers;

  constructor(
    private http: HttpClientInterceptor,
    private config: Configuration
  ) {
    this.actionUrl = config.Server + 'nsdc/v1.0/users';
  }

  addUser(user: User) {
    return this.http.post(this.actionUrl, JSON.stringify(user))
    .map(res => res.json())
    .catch(res => Observable.throw(res.json()));
  }

  getUsersByStatus(status: string) {
    return this.http.get(this.actionUrl + '/status/' + status)
      .map(res => res.json() as User[]);
  }

  getUserById(id: number) {
    return this.http.get(this.actionUrl + '/' + id)
      .map(res => res.json() as User);
  }

  getUsersByRole(roleId: number) {
    return this.http.get(this.actionUrl + '/role/' + roleId)
      .map(res => res.json() as User[]);
  }

  updateUser(user: User) {
    return this.http.put(this.actionUrl + '/' + user.id, JSON.stringify(user))
      .map(res => res.json() as User);
  }

  deactivateUser(id: number) {
    return this.http.put(this.actionUrl + '/' + id, JSON.stringify({status: 'inactive'}))
    .map(res => res.json())
    .catch(res => {
      return Observable.throw(res.json());
    });
  }
}
