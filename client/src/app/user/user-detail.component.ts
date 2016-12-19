import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from './user.service';
import { User } from './user';
import { ActivatedRoute } from '@angular/router';
import { Configuration } from '../app.constants';
import { Role } from '../role/role';
import { RoleService } from '../role/role.service';

@Component({
  selector: 'update-user',
  templateUrl : './user-detail.component.html',
  providers: [UserService, RoleService, Configuration]
})
export class UserDetailComponent implements OnInit, OnDestroy {

  userForm: FormGroup;
  user: User;
  users: User [];
  roles: Role[];
  public showDetail = false;
  public sub: any;
  public errorMsg: string;

  constructor(private _formBuilder: FormBuilder, private userService: UserService,
              private roleService: RoleService, private route: ActivatedRoute) {}

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

    this.sub = this.route.params.subscribe(params => {
      let id = Number.parseInt(params['id']);
      this.userService.getUserById(id).then((user) => {
        this.user = user;
        this.userForm.patchValue({username: user.username});
        this.userForm.patchValue({lastname: user.lastname});
        this.userForm.patchValue({password: user.password});
        this.userForm.patchValue({firstname: user.firstname});
        this.userForm.patchValue({email: user.email});
        this.userForm.patchValue({status: user.status});
        this.userForm.patchValue({role_id: user.role_id});

        this.roleService.getRoles().then((roles) => {
          this.roles = roles;
          this.userForm.patchValue({role: roles});
        });
      });
    });
  }

  onSubmit() {
    this.user.username = this.userForm.controls['username'].value;
    this.user.firstname = this.userForm.controls['firstname'].value;
    this.user.lastname = this.userForm.controls['lastname'].value;
    this.user.password = this.userForm.controls['password'].value;
    this.user.email = this.userForm.controls['email'].value;
    this.user.role_id = this.userForm.controls['role_id'].value;
    this.userService.updateUser(this.user);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  };
}
