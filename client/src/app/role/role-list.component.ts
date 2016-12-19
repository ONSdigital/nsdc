import { Component, OnInit } from '@angular/core';
import { Role } from './role';
import { RoleService } from './role.service';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Configuration } from '../app.constants';

@Component({
  selector: 'role-list',
  templateUrl : './role-list.component.html',
  providers: [RoleService, Configuration]
})
export class RoleListComponent implements OnInit {

  public roles: Role[];

  constructor(private http: Http, private roleService: RoleService ) {}

  ngOnInit(): void {
    this.roleService.getRoles().then((roles) => this.roles = roles);
  }
}
