import { Component, OnInit } from '@angular/core';
import { Permission } from './permission';
import { PermissionService } from './permission.service';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Configuration } from '../app.constants';

@Component({
  selector: 'permission-list',
  templateUrl : './permission.component.html',
  providers: [PermissionService, Configuration]
})
export class PermissionComponent implements OnInit {

  public permissions: Permission[];

  constructor(private http: Http, private permissionService: PermissionService ) {}

  ngOnInit(): void {
    this.permissionService.getPermissions().then(permissions => this.permissions = permissions);
  }
}
