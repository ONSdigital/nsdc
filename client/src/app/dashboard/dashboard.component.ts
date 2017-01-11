import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'dashboard',
  templateUrl : './dashboard.component.html'
})
export class DashboardComponent {
    constructor(private loginService: LoginService, private router: Router) {}

    showMenuItems() {
        return this.loginService.isLoggedIn();
    }
}
