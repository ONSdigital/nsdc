import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { UserPermissionsService } from '../user-permissions.service';


@Component({
  selector: 'dashboard',
  templateUrl : './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  permissionShortNames: string[] = [];

  ngOnInit() {
    this.userPermissionsService.getUserPermissions()
    .subscribe(permissions => {
      this.permissionShortNames = permissions.map(permission => permission.short_name);
    });
  }

  constructor(
    private userPermissionsService: UserPermissionsService,
    private router: Router
  ) {}

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

  canViewJourneys() {
    return this.permissionShortNames.includes('VIEW_JOURNEYS');
  }

}
