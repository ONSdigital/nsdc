import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';
import { UserPermissionsService } from '../user-permissions.service';
import { UserAccountService } from '../user-account.service';
import { Router } from '@angular/router';
import { Permission } from '../permission/permission';
import { User } from '../user/user';

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
  providers: [UserAccountService]
})
export class NavbarComponent {

  permissionShortNames: string[] = [];
  user: User;
  loggedIn = false;

  constructor(
    private loginService: LoginService,
    private userPermissionsService: UserPermissionsService,
    private userAccountService: UserAccountService,
    private router: Router
  ) {}

  showNavBarLinks() {
    if (this.loginService.isLoggedIn()) {
      if (!this.loggedIn) {
        this.loggedIn = true;
        this.userPermissionsService.getUserPermissions()
        .subscribe(permissions => {
          this.permissionShortNames = permissions.map(permission => permission.short_name);
        });
        this.userAccountService.getUser()
        .subscribe(user => this.user = user);
      }
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

  canViewUpload() {
    return this.permissionShortNames.includes('DATA_IMPORT');
  }

  canViewAudit() {
    return this.permissionShortNames.includes('DATA_AUDIT');
  }

  onLogout() {
    this.loginService.logout();
    this.userPermissionsService.clearPermissionsCache();
    this.permissionShortNames = [];
    this.loggedIn = false;
    this.router.navigate(['login']);
  }
}
