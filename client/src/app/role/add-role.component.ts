import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Role } from '../role/role';
import { Configuration } from '../app.constants';
import { RoleService } from '../role/role.service';

@Component({
  selector: 'add-role',
  templateUrl : './add-role.component.html',
  providers: [RoleService, Configuration]
})
export class AddRoleComponent implements OnInit {
  roleForm: FormGroup;
  role: Role;
  errorMsg: string;

  public submitAttempt: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private roleService: RoleService
  ) {}

  ngOnInit() {
    this.roleForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
    });
    this.role = new Role();
  }


  onSubmit() {
    this.role.name = this.roleForm.controls['name'].value;
    this.role.description = this.roleForm.controls['description'].value;
    this.roleService.addRole(this.role);
  }
}
