import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from './user';
import { Role } from '../role/role';
import { RoleService } from '../role/role.service';

@Component({
  selector: 'nsdc-add-user',
  templateUrl : 'user.component.html'
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  user: User;
  roles: Role[];
  submitPending = false;
  submitFailed = false;
  errorMessages: any;

  constructor(
    private _formBuilder: FormBuilder,
    private roleService: RoleService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userForm = this._formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: [null, [Validators.required]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      status: [],
      role_id: [null, [Validators.required,]]
    });

    this.user = new User();
    this.roleService.getRoles().then(roles => this.roles = roles);
  }


  onSubmit() {
    this.submitFailed = false;
    this.submitPending = true;

    Object.keys(this.userForm.controls).forEach(key =>
      this.user[key] = this.userForm.controls[key].value
    );

    this.user.status = 'active';

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
