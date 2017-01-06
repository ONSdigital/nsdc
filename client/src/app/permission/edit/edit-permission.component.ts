import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Permission } from '../permission';
import { PermissionService } from '../permission.service';

@Component({
  selector: 'edit-permission',
  templateUrl: 'edit-permission.component.html',
  providers: [PermissionService]
})
export class EditPermissionComponent implements OnInit {

  permissionForm: FormGroup;
  permission: Permission;
  submitPending = false;
  submitFailed = false;

  constructor(
    private _formBuilder: FormBuilder,
    private permissionService: PermissionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.permissionForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      short_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
    });
    this.route.params.subscribe(params => {
      const id = Number.parseInt(params['id']);
      this.permission = new Permission();
      this.permissionService.getPermissionById(id)
      .then(permission => {
        this.permission = permission;
        this.permissionForm.patchValue(permission);
      });
    });
  }

  onSubmit() {
    this.permission.name = this.permissionForm.controls['name'].value;
    this.permission.short_name = this.permissionForm.controls['short_name'].value;
    this.permission.description = this.permissionForm.controls['description'].value;
    this.permissionService.updatePermission(this.permission)
    .subscribe(
      () => {
        this.submitPending = false;
        this.router.navigate(['/permissions']);
      },
      error => {
        this.submitPending = false;
        this.submitFailed = true;
      }
    );
  }
}
