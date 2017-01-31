import { Component, OnInit } from '@angular/core';
import { UserPermissionsService } from '../user-permissions.service';
import { UserAccountService } from '../user-account.service';
import { MenuItem } from '../navbar/navbar.metadata';
import { MenuItems } from '../navbar/navbar.routes.config';
import { Self } from '../user-account';


@Component({
  selector: 'dashboard',
  templateUrl : './dashboard.component.html',
  providers: [UserAccountService]
})
export class DashboardComponent implements OnInit {

  self: Self;
  userMenuOptions: MenuItem[] = [];
  loggedIn = false;

  constructor(
    private userPermissionsService: UserPermissionsService,
    private userAccountService: UserAccountService
  ) {}

  ngOnInit() {
    this.userPermissionsService.getUserPermissions()
    .subscribe(permissions => {
      const permissionShortNames = permissions.map(permission => permission.short_name);
      this.userMenuOptions = [];
      MenuItems.forEach(item => {
        if (permissionShortNames.includes(item.permission)) {
          this.userMenuOptions.push(item);
        }
      });
    });

    if (!this.loggedIn) {
      this.loggedIn = true;
      this.userAccountService.getUser()
          .subscribe(self => this.self = self);
    }
  }
}
