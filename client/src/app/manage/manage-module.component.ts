import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'managemodule',
  templateUrl : './manage-module.component.html'
})
export class ManageModuleComponent {
    constructor(private loginService: LoginService, private router: Router) {}

    showMenuItems() {
        return this.loginService.isLoggedIn();
    }
}
