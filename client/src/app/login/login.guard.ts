import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import LoginService from './login.service';

@Injectable()
class LoginGuard implements CanActivate {
  constructor(private login: LoginService, private router: Router) {}

  canActivate() {

    if (this.login.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}

export default LoginGuard;
