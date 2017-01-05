import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Configuration } from '../app.constants';
import { User } from '../user/user';

@Injectable()
export class LoginService {
  private loggedIn = false;
  private token: string;
  private currentUserId: number;

  constructor(private http: Http, private config: Configuration) {
    const token = localStorage.getItem('auth_token');
    this.currentUserId = Number(localStorage.getItem('user_id'));
    this.loggedIn = !!token;
    this.token = token;
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
        if (res.token) {
          localStorage.setItem('auth_token', res.token);
          localStorage.setItem('user_id', res.user_id);
          this.loggedIn = true;
          this.currentUserId = res.user_id;
          this.token = res.token;
        }
        return res.token;
      });
  }

  getToken() {
    return this.token;
  }

  getCurrentUserId() {
    return this.currentUserId;
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.token = null;
    this.loggedIn = false;
    this.currentUserId = null;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
