import { Component } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'nsdc-app',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  public toasterConfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-center',
    timeout: 2000
  });
}
