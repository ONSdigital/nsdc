import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs/Observable';
import { Supplier } from './supplier';
import { Configuration } from '../app.constants';


@Injectable()
export class SupplierService {

  private actionUrl: string;
  public headers: Headers;

  constructor(private http: Http, private config: Configuration, private loginService: LoginService) {
    this.actionUrl = config.ServerWithApiUrl;
    this.headers = new Headers();
    this.headers.set('Content-Type', 'application/json');
  }

  addSupplier(supplier: Supplier) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let supplierAddUrl = this.config.Server + 'nsdc/v1.0/suppliers';
    return this.http.post(supplierAddUrl, JSON.stringify(supplier), { headers: this.headers } )
    .map(res => res.json())
    .catch(res => {
      return Observable.throw(res.json());
    });
  }


  updateSupplier(supplier: Supplier) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let supplierEditUrl = this.config.Server + 'nsdc/v1.0/suppliers/' + supplier.id;
    return this.http.put(supplierEditUrl, JSON.stringify(supplier), { headers: this.headers } )
    .map(res => res.json())
    .catch(res => {
      return Observable.throw(res.json());
    });
  }


  deleteSupplier(id: number) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let supplierDeleteUrl = this.config.Server + 'nsdc/v1.0/suppliers/' + id;
    return this.http.delete(supplierDeleteUrl, { headers: this.headers } )
    .map(res => res.json())
    .catch(res => {
      return Observable.throw(res.json());
    });
  }


  getSuppliers() {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let supplierListUrl = this.config.Server + 'nsdc/v1.0/suppliers';
    return this.http.get(supplierListUrl, { headers: this.headers })
    .toPromise()
    .then(response => response.json() as Supplier[])
    .catch(this.handleError);
  }

  getSupplierById(id: number) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let supplierUrl = this.config.Server + 'nsdc/v1.0/suppliers/' + id;
    return this.http.get(supplierUrl, { headers: this.headers })
    .toPromise()
    .then(response => response.json() as Supplier)
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
