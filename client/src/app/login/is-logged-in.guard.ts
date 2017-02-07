import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild  } from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class IsLoggedInGuard implements CanActivate {
  constructor(private login: LoginService, private router: Router) {}

  canActivate(): boolean {
    if (this.login.isLoggedIn()) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }
}
