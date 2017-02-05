import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from './user';
import { RoleService, Role } from '../role';

@Component({
  selector: 'nsdc-add-user',
  template : `
    <nsdc-user
      [user]="user"
      [roles]="roles"
      [submitPending]="submitPending"
      [submitFailed]="submitFailed"
      [errorMessages]="errorMessages"
      (userSubmit)="onSubmit($event)"
    ></nsdc-user>
  `
})
export class AddUserComponent implements OnInit {

  public user: User;
  public roles: Role[];
  public submitPending = false;
  public submitFailed = false;
  public errorMessages;

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = new User();
    this.roleService.getRoles()
    .then(roles => this.roles = roles);
  }

  onSubmit(user: User) {
    this.submitFailed = false;
    this.submitPending = true;
    this.errorMessages = null;

    this.userService.addUser(this.user)
    .subscribe(
      () => {
        this.submitPending = false;
        this.router.navigate(['/users']);
      },
      error => {
        this.errorMessages = error.message;
        this.submitPending = false;
        this.submitFailed = true;
      }
    );
  }
}
