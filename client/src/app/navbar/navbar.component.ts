import { Component, ViewContainerRef } from '@angular/core';
import { LoginService } from '../login/login.service';
import { UserPermissionsService } from '../user-permissions.service';
import { UserAccountService } from '../user-account.service';
import { RoleService } from '../role/role.service';
import { Router } from '@angular/router';
import { Self } from '../user-account';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { Overlay } from 'angular2-modal';

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
  providers: [UserAccountService, RoleService]
})
export class NavbarComponent {

  permissionShortNames: string[] = [];
  self: Self;
  loggedIn = false;

  constructor(
    private loginService: LoginService,
    private userPermissionsService: UserPermissionsService,
    private userAccountService: UserAccountService,
    private router: Router,
    public modal: Modal,
    overlay: Overlay,
    vcRef: ViewContainerRef
  ) {
    overlay.defaultViewContainer = vcRef;
  }

  showNavBarLinks() {
    if (this.loginService.isLoggedIn()) {
      if (!this.loggedIn) {
        this.loggedIn = true;
        this.userPermissionsService.getUserPermissions()
        .subscribe(permissions => {
          this.permissionShortNames = permissions.map(permission => permission.short_name);
        });
        this.userAccountService.getUser()
        .subscribe(self => this.self = self);
      }
      return true;
    }
    return false;
  }

  displayUserDetails() {
    this.modal.alert()
        .isBlocking(false)
        .showClose(true)
        .keyboard(27)
        .title(this.userDetailsTitle())
        .body(this.userDetailsTemplate())
        .footerClass('user-details-modal')
        .open();
  }

  userDetailsTitle() {
    const user = this.self.user;
    return user.firstname + ' ' + user.lastname + ' (' + user.username + ')';
  }

  userDetailsTemplate() {
    return '<p><b>Role:</b> ' + this.self.role.name + '</p>' +
        '<p><b>Status:</b><span class="success"> ' + this.self.user.status + '</span></p>' +
        '<p><b>Email Address:</b> ' + this.self.user.email + '</p>';
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
