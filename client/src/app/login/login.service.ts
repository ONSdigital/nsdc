import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Configuration } from '../app.constants';

@Injectable()
export class LoginService {
  private loggedIn = false;
  private sessionId: string;
  private currentUserId: number;

  constructor(private http: Http, private config: Configuration) {
    const sessionId = sessionStorage.getItem('session_id');
    this.currentUserId = Number(sessionStorage.getItem('user_id'));
    this.loggedIn = !!sessionId;
    this.sessionId = sessionId;
  }

  login(username, password) {
    let loginUrl = this.config.Server + 'nsdc/v1.0/login';
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post(
        loginUrl,
        JSON.stringify({ username, password }),
        { headers }
      )
      .map(res => res.json())
      .map(res => {
        if (res.id) {
          sessionStorage.setItem('session_id', res.id);
          sessionStorage.setItem('user_id', res.user_id);
          this.loggedIn = true;
          this.currentUserId = res.user_id;
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
    sessionStorage.removeItem('user_id');
    this.sessionId = null;
    this.loggedIn = false;
    this.currentUserId = null;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
