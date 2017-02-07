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
    this.actionUrl = config.ServerWithApiUrl + 'users';
  }

  addUser(user: User) {
    return this.http.post(this.actionUrl, user);
  }

  getUsersByStatus(status: string) : Observable<User[]> {
    return this.http.get(this.actionUrl + '/status/' + status);
  }

  getUserById(id: number) : Observable<User> {
    return this.http.get(this.actionUrl + '/' + id);
  }

  getUsersByRole(roleId: number) : Observable<User[]> {
    return this.http.get(this.actionUrl + '/role/' + roleId);
  }

  updateUser(user: User) : Observable<User> {
    return this.http.put(this.actionUrl + '/' + user.id, user);
  }

  deactivateUser(id: number) {
    return this.http.put(this.actionUrl + '/' + id, {status: 'inactive'});
  }
}
