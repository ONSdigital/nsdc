import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Permission } from './permission';
import { PermissionService } from './permission.service';

@Component({
  selector: 'edit-permission',
  templateUrl: 'permission.component.html'
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
      name: ['', [Validators.required]],
      short_name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
    this.route.data.subscribe(data => {
      this.permission = data['permission'];
      this.permissionForm.patchValue(this.permission);
    });
  }

  onSubmit() {
    Object.keys(this.permissionForm.controls).forEach(key => this.permission[key] = this.permissionForm.controls[key].value);
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
