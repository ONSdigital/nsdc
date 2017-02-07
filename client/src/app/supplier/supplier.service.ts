import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Supplier } from './supplier';
import { Configuration } from '../app.constants';
import { HttpClientInterceptor } from '../http-client/http-client.interceptor';

@Injectable()
export class SupplierService {
  private actionUrl: string;
  public headers: Headers;

  constructor(
    private http: HttpClientInterceptor,
    private config: Configuration
  ) {
    this.actionUrl = config.ServerWithApiUrl + 'suppliers';
  }

  addSupplier(supplier: Supplier) {
    return this.http.post(this.actionUrl, supplier);
  }

  updateSupplier(supplier: Supplier) {
    return this.http.put(this.actionUrl + '/' + supplier.id, supplier);
  }

  deleteSupplier(id: number) {
    return this.http.delete(this.actionUrl + '/' + id);
  }

  getSuppliers() : Observable<Supplier[]> {
    return this.http.get(this.actionUrl);
  }

  getSupplierById(id: number) : Observable<Supplier> {
    return this.http.get(this.actionUrl + '/' + id);
  }
}
