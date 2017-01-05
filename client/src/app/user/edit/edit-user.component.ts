import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';
import { Configuration } from '../../app.constants';
import { Role } from '../../role/role';
import { RoleService } from '../../role/role.service';
import { Supplier } from '../../supplier/supplier';
import { SupplierService } from '../../supplier/supplier.service';

@Component({
  selector: 'update-user',
  templateUrl : './edit-user.component.html',
  providers: [UserService, RoleService, SupplierService, Configuration]
})
export class EditUserComponent implements OnInit, OnDestroy {

  userForm: FormGroup;
  user: User;
  users: User [];
  roles: Role[];
  suppliers: Supplier[];
  public showDetail = false;
  public sub: any;
  public errorMsg: string;

  constructor(
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private roleService: RoleService,
    private supplierService: SupplierService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userForm = this._formBuilder.group({
      firstname: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      lastname: [ null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      role_id: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      supplier_id: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      email: [null, [Validators.pattern('^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,63}$')]],
      username: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      password: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      status: []
    });

    this.sub = this.route.params.subscribe(params => {
      const id = Number.parseInt(params['id']);
      this.userService.getUserById(id).then((user) => {
        this.user = user;
        this.userForm.patchValue({username: user.username});
        this.userForm.patchValue({lastname: user.lastname});
        this.userForm.patchValue({password: user.password});
        this.userForm.patchValue({firstname: user.firstname});
        this.userForm.patchValue({email: user.email});
        this.userForm.patchValue({status: user.status});
        this.userForm.patchValue({role_id: user.role_id});
        this.userForm.patchValue({supplier_id: user.supplier_id});

        this.roleService.getRoles().then(roles => {
          this.roles = roles;
          this.userForm.patchValue({role: roles});
        });
        this.supplierService.getSuppliers().then(suppliers => {
          this.suppliers = suppliers;
          this.userForm.patchValue({supplier: suppliers});
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
    this.user.supplier_id = this.userForm.controls['supplier_id'].value;
    this.userService.updateUser(this.user).then(
      () => {
        this.router.navigate(['/users']);
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  };
}
