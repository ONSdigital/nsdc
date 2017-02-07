import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { File } from './file';
import { FileAudit } from './file-audit';
import { FileAuditChart } from './file-audit-chart';
import { Configuration } from '../app.constants';
import { HttpClientInterceptor } from '../http-client/http-client.interceptor';

@Injectable()
export class FileAuditService {
  private actionUrl: string;
  public headers: Headers;

  constructor(
    private http: HttpClientInterceptor,
    private config: Configuration
  ) {
    this.actionUrl = config.ServerWithApiUrl + 'files';
  }

  getFiles(filters: any = {}) : Observable<File[]> {
    const pathParams = `supplierId=${filters.supplierId || ''}&from=${filters.from || ''}&to=${filters.to || ''}`;
    return this.http.get(this.actionUrl + '?' + pathParams);
  }

  getFileAuditChartData(id) : Observable<FileAuditChart> {
    return this.http.get(this.actionUrl + '/audit/chart/' + id);
  }

  pollForFileAudits(id, interval): Observable<FileAudit[]> {
    return Observable.interval(interval).startWith(0)
    .switchMap(() => this.http.get(this.actionUrl + '/audit/' + id));
  }
}
