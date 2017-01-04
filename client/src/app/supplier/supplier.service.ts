import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Observable } from 'rxjs/Observable';
import { Supplier } from './supplier';
import { Configuration } from '../app.constants';

import { LoginService } from '../login/login.service';

@Injectable()
export class SupplierService {

  private actionUrl: string;
  public headers: Headers;

  constructor(private http: Http, private config: Configuration, private loginService: LoginService) {
    this.actionUrl = config.Server + 'nsdc/v1.0/suppliers';
    this.headers = new Headers();
    this.headers.set('Content-Type', 'application/json');
  }

  getSuppliers() {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    return this.http.get(this.actionUrl, { headers: this.headers})
    .toPromise().then(response => response.json() as Supplier[]).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
