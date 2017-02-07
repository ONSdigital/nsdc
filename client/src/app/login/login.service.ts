import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Configuration } from '../app.constants';

@Injectable()
export class LoginService {
  private loggedIn = false;
  private sessionId: string;

  constructor(private http: Http, private config: Configuration) {
    const sessionId = sessionStorage.getItem('session_id');
    this.loggedIn = !!sessionId;
    this.sessionId = sessionId;
  }

  login(username, password) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post(
        this.config.ServerWithApiUrl + '/login',
        JSON.stringify({ username, password }),
        { headers }
      )
      .map(res => res.json())
      .map(res => {
        if (res.id) {
          sessionStorage.setItem('session_id', res.id);
          this.loggedIn = true;
          this.sessionId = res.id;
        }
        return res.id;
      });
  }

  getSessionId() {
    return this.sessionId;
  }

  logout() {
    sessionStorage.removeItem('session_id');
    this.sessionId = null;
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
