import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../role';
import { RoleService } from '../role.service';

@Component({
  selector: 'edit-role',
  templateUrl: '../role.component.html'
})
export class EditRoleComponent implements OnInit {
  roleForm: FormGroup;
  role: Role;
  errorMsg: string;

  public submitAttempt: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.roleForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]]
    });
    this.route.data.subscribe(data => {
      this.role = data['role'] as Role;
      this.roleForm.patchValue(this.role);
    });
  }


  onSubmit() {
    this.role.name = this.roleForm.controls['name'].value;
    this.role.description = this.roleForm.controls['description'].value;
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
