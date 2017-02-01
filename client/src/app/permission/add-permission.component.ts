import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Permission } from './permission';
import { PermissionService } from './permission.service';

@Component({
  selector: 'add-permission',
  templateUrl: 'permission.component.html'
})
export class AddPermissionComponent implements OnInit {
  permissionForm: FormGroup;
  permission: Permission;
  submitPending = false;
  submitFailed = false;

  constructor(
    private _formBuilder: FormBuilder,
    private permissionService: PermissionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.permissionForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      short_name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
    this.permission = new Permission();
  }

  onSubmit() {
    this.permission.name = this.permissionForm.controls['name'].value;
    this.permission.short_name = this.permissionForm.controls['short_name'].value;
    this.permission.description = this.permissionForm.controls['description'].value;
    this.permissionService.addPermission(this.permission)
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
