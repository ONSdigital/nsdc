import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class LoginGuard implements CanActivate, CanActivateChild {
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
