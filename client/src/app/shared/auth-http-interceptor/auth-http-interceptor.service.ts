import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../../login/login.service';
import { User } from './user';

@Injectable()
export class AuthHttpInterceptorService {
  public headers: Headers;

  private results = res => res.json();
  private error = res => Observable.throw(res.json());

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
    return this.http.get(url, { headers: this.headers })
      .map(this.results)
      .catch(this.error);
  }

  post(url: string, data: any) {
    this.setSessionId();
    return this.http.post(url, JSON.stringify(data), { headers: this.headers })
      .map(this.results)
      .catch(this.error);
  }

  put(url: string, data: any) {
    this.setSessionId();
    return this.http.put(url, JSON.stringify(data), { headers: this.headers })
      .map(this.results)
      .catch(this.error);
  }

  delete(url: string) {
    this.setSessionId();
    return this.http.delete(url, { headers: this.headers })
      .catch(this.error);
  }
}
