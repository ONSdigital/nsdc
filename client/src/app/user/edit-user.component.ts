import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from './user';
import { Role } from '../role/role';
import { RoleService } from '../role/role.service';
import { ValidatorService } from '../shared/validator';

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
      firstname: [null, [Validators.required]],
      lastname: [ null, [Validators.required]],
      role_id: [null, [Validators.required]],
      email: ['', [Validators.required, ValidatorService.emailValidator]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      status: []
    });

    this.roleService.getRoles().then(roles => this.roles = roles);
    this.route.data.subscribe(data => {
      const user = data['user'];
      this.user = user;
      this.userForm.patchValue(user);
    });
  }

  onSubmit() {
    this.submitFailed = false;
    this.submitPending = true;

    Object.keys(this.userForm.controls).forEach(key =>
      this.user[key] = this.userForm.controls[key].value
    );

    this.userService.updateUser(this.user)
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
