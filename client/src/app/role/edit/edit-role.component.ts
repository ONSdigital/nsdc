import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Role } from '../role';
import { RoleService } from '../role.service';

@Component({
  selector: 'edit-role',
  templateUrl: 'edit-role.component.html',
  providers: [RoleService]
})
export class EditRoleComponent implements OnInit {
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
