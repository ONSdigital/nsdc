import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './user';
import { Role } from '../role';
import { ValidatorService } from '../shared/validator';


@Component({
  selector: 'nsdc-user',
  templateUrl : 'user.component.html'
})
export class UserComponent implements OnChanges {

  public userForm: FormGroup;

  @Input()
  user: User;

  @Input()
  roles: Role[] = [];

  @Input()
  errorMessages: any;

  @Input()
  public submitPending = false;

  @Input()
  public submitFailed = false;

  @Output()
  userSubmit = new EventEmitter();

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router
  ) {
    this.userForm = this._formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, ValidatorService.emailValidator]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role_id: [null, [Validators.required]]
    });
  }

  ngOnChanges(changes) {
    const user = changes['user'];
    if (user && user.currentValue) {
      this.userForm.patchValue(user.currentValue);
    }
  }


  onSubmit() {
    Object.keys(this.userForm.controls).forEach(key =>
      this.user[key] = this.userForm.controls[key].value
    );
    this.userSubmit.emit(this.user);
  }
}
