import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { LoginService } from '../login/login.service';
import { User } from './user';

@Injectable()
export class HttpClientInterceptor {
  public headers: Headers;

  constructor(
    private http: Http,
    private loginService: LoginService
  ) {
    this.headers = new Headers();
    this.headers.set('Content-Type', 'application/json');
  }

  setSessionId(): void {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
  }

  get(url: string) {
    this.setSessionId();
    return this.http.get(url, { headers: this.headers });
  }

  post(url: string, data: any) {
    this.setSessionId();
    return this.http.post(url, JSON.stringify(data), { headers: this.headers } )
  }

  put(url: string, data: any) {
    this.setSessionId();
    return this.http.put(url, JSON.stringify(data), { headers: this.headers } )
  }
}