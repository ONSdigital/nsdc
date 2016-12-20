import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Configuration } from '../app.constants';

@Injectable()
class LoginService {
  private loggedIn = false;

  constructor(private http: Http, private config: Configuration) {
    this.loggedIn = !!localStorage.getItem('auth_token');
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
      .map((res) => {
        if (res.token) {
          localStorage.setItem('auth_token', res.token);
          this.loggedIn = true;
        }
        return res.token;
      });
  }

  getToken() {
    return localStorage.getItem('auth_token');
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}

export default LoginService;
