import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from './user';
import { Configuration } from '../app.constants';
import { Role } from '../role/role';
import { RoleService } from '../role/role.service';

@Component({
  selector: 'nsdc-edit-user',
  templateUrl : 'user.component.html'
})
export class EditUserComponent implements OnInit {

  userForm: FormGroup;
  user: User;
  users: User [];
  roles: Role[];
  submitPending = false;
  submitFailed = false;
  errorMessages;

  constructor(
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userForm = this._formBuilder.group({
      firstname: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      lastname: [ null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      role_id: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      email: [null, [Validators.pattern('^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,63}$')]],
      username: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      password: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      status: []
    });

    this.roleService.getRoles()
    .then(roles => {
      this.roles = roles;
    });

    this.route.data.subscribe(data => {
      const user = data['user'];
      this.user = user;
      this.userForm.patchValue({
        username: user.username,
        lastname: user.lastname,
        password: user.password,
        firstname: user.firstname,
        email: user.email,
        status: user.status,
        role_id: user.role_id
      });
    });
  }

  onSubmit() {
    this.submitFailed = false;
    this.submitPending = true;
    this.user.username = this.userForm.controls['username'].value;
    this.user.firstname = this.userForm.controls['firstname'].value;
    this.user.lastname = this.userForm.controls['lastname'].value;
    this.user.password = this.userForm.controls['password'].value;
    this.user.email = this.userForm.controls['email'].value;
    this.user.role_id = this.userForm.controls['role_id'].value;
    this.userService.updateUser(this.user)
    .then(
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
