import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from './role';
import { RoleService } from './role.service';

@Component({
  selector: 'nsdc-add-role',
  templateUrl : 'role.component.html'
})
export class AddRoleComponent implements OnInit {
  roleForm: FormGroup;
  role: Role;

  constructor(
    private _formBuilder: FormBuilder,
    private roleService: RoleService,
    private router: Router
  ) {}

  ngOnInit() {
    this.roleForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
    this.role = new Role();
  }


  onSubmit() {
    Object.keys(this.roleForm.controls).forEach(key => this.role[key] = this.roleForm.controls[key].value);
    this.roleService.addRole(this.role)
    .subscribe(
      () => {
        this.router.navigate(['roles']);
      },
      error => {
        console.log(error);
      }
    );
  }
}
