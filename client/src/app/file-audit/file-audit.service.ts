import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { File } from './file';
import { FileAudit } from './file-audit';
import { FileAuditChart } from './file-audit-chart';
import { Configuration } from '../app.constants';
import { LoginService } from '../login/login.service';

@Injectable()
export class FileAuditService {

  private actionUrl: string;
  public headers: Headers;

  constructor(private http: Http, private config: Configuration, private loginService: LoginService) {
    this.actionUrl = config.Server + 'nsdc/v1.0/files';
    this.headers = new Headers();
    this.headers.set('Content-Type', 'application/json');
  }

  getFiles() {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    return this.http.get(this.actionUrl, { headers: this.headers })
    .toPromise()
    .then(response => response.json() as File[])
    .catch(this.handleError);
  }

  getFileAuditChartData(id) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    return this.http.get(this.actionUrl + '/audit/chart/' + id, { headers: this.headers })
      .toPromise()
      .then(response => response.json() as FileAuditChart)
      .catch(this.handleError);
  }

  pollForFileAudits(id, interval): Observable<FileAudit[]> {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    return Observable.interval(interval).startWith(0)
    .switchMap(() => this.http.get(this.actionUrl + '/audit/' + id, { headers: this.headers })
    .map(response => response.json()));
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
