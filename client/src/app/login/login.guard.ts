import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';
import LoginService from './login.service';

@Injectable()
class LoginGuard implements CanActivate {
  constructor(private login: LoginService, private router: Router) {}

  canActivate(): boolean {
    if (this.login.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }
}

export default LoginGuard;
