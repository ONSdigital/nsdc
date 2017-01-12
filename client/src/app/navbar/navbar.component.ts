import { Component, ViewContainerRef } from '@angular/core';
import { LoginService } from '../login/login.service';
import { UserPermissionsService } from '../user-permissions.service';
import { UserAccountService } from '../user-account.service';
import { RoleService } from '../role/role.service';
import { Router } from '@angular/router';
import { Self } from '../user-account';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { Overlay } from 'angular2-modal';
import { MenuItem } from './navbar.metadata';
import { MenuItems } from './navbar.routes.config';

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
  providers: [UserAccountService, RoleService]
})
export class NavbarComponent {

  userMenuOptions: MenuItem[] = [];
  self: Self;
  loggedIn = false;
  menuIsOpen = false;
  menuClass = '';

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
      this.userPermissionsService.getUserPermissions()
      .subscribe(permissions => {
        const permissionShortNames = permissions.map(permission => permission.short_name);
        MenuItems.forEach(item => {
          if (permissionShortNames.includes(item.permission) &&
            this.userMenuOptions.filter(i => i.permission === item.permission).length === 0
          ) {
            this.userMenuOptions.push(item);
          }
        });
      });

      if (!this.loggedIn) {
        this.loggedIn = true;
        this.userAccountService.getUser()
        .subscribe(self => this.self = self);
      }

      return true;
    }
    return false;
  }

  toggleMenu() {
    this.menuIsOpen = !this.menuIsOpen;
    if (!this.menuIsOpen) {
      this.menuClass = ' collapse ';
    } else {
      this.menuClass = '';
    }
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

  onLogout() {
    this.loginService.logout();
    this.userPermissionsService.clearPermissionsCache();
    this.loggedIn = false;
    this.userMenuOptions = [];
    this.router.navigate(['login']);
  }
}
