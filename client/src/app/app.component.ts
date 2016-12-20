import { Component } from '@angular/core';
import { LoginService } from './login/login.service';

import '../style/app.css';

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor(private loginService: LoginService) {}

  showNavBar() {
    return this.loginService.isLoggedIn();
  }
}
