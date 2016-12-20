import { Component } from '@angular/core';
import { LoginService } from './login/login.service';
import { Router } from '@angular/router';
import '../style/app.css';

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor(private loginService: LoginService, private router: Router) {}

  showNavBar() {
    return this.loginService.isLoggedIn();
  }

  onLogout() {
    this.loginService.logout();
    this.router.navigate(['login']);
  }
}
