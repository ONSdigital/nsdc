import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
  public Server: string = `http://${location.hostname}:5000/`;
  public ApiUrl: string = 'nsdc/v1.0/';
  public ServerWithApiUrl = this.Server + this.ApiUrl;
}
