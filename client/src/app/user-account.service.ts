import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { LoginService } from './login/login.service';
import { Configuration } from './app.constants';
import { Observable } from 'rxjs/Rx';
import { User } from './user/user';

@Injectable()
export class UserAccountService {

  constructor(private http: Http, private loginService: LoginService, private config: Configuration) {}

  getUser(): Observable<User> {
    const selfUrl = this.config.Server + 'nsdc/v1.0/self';
    let headers = new Headers();
    headers.append('X-TOKEN', this.loginService.getSessionId());
    return this.http.get(selfUrl, { headers })
    .map(res => res.json() as User);
  }



}
