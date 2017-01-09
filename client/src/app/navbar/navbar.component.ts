import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';
import { UserPermissionsService } from '../user-permissions.service';
import { Router } from '@angular/router';
import { Permission } from '../permission/permission';

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})
export class NavbarComponent {
  permissionShortNames: string[] = [];

  constructor(
    private loginService: LoginService,
    private userPermissionsService: UserPermissionsService,
    private router: Router
  ) {}

  showNavBarLinks() {
    if (this.loginService.isLoggedIn()) {
      this.userPermissionsService.getUserPermissions()
      .subscribe(permissions => {
        this.permissionShortNames = permissions.map(permission => permission.short_name);
      });
      return true;
    }
    return false;
  }

  canViewUsers() {
    return this.permissionShortNames.includes('VIEW_USERS');
  }

  canViewPermissions() {
    return this.permissionShortNames.includes('VIEW_PERMISSIONS');
  }

  canViewRoles() {
    return this.permissionShortNames.includes('VIEW_ROLES');
  }

  onLogout() {
    this.loginService.logout();
    this.userPermissionsService.clearPermissionsCache();
    this.permissionShortNames = [];
    this.router.navigate(['login']);
  }
}
