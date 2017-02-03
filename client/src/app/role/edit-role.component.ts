import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from './role';
import { RoleService } from './role.service';

@Component({
  selector: 'nsdc-edit-role',
  templateUrl: 'role.component.html'
})
export class EditRoleComponent implements OnInit {
  roleForm: FormGroup;
  role: Role;

  public submitAttempt: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.roleForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
    this.route.data.subscribe(data => {
      this.role = data['role'] as Role;
      this.roleForm.patchValue(this.role);
    });
  }

  onSubmit() {
    Object.keys(this.roleForm.controls).forEach(key => this.role[key] = this.roleForm.controls[key].value);
    this.roleService.updateRole(this.role).subscribe(
      () => {
        this.router.navigate(['roles']);
      },
      error => {
        console.log(error);
      }
    );
  }
}
