webpackJsonp([4],{801:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(0),s=n(925),i=n(459),a=n(806),o=n(458);n.d(e,"UserModule",function(){return u});var u=function(){function t(){}return t}();u=__decorate([n.i(r.i)({imports:[s.a,i.a],declarations:[s.b],providers:[a.a,o.a]})],u)},806:function(t,e,n){"use strict";var r=n(0),s=n(96),i=n(280);n.d(e,"a",function(){return a});var a=function(){function t(t,e){this.http=t,this.config=e,this.actionUrl=e.ServerWithApiUrl+"users"}return t.prototype.addUser=function(t){return this.http.post(this.actionUrl,t)},t.prototype.getUsersByStatus=function(t){return this.http.get(this.actionUrl+"/status/"+t)},t.prototype.getUserById=function(t){return this.http.get(this.actionUrl+"/"+t)},t.prototype.getUsersByRole=function(t){return this.http.get(this.actionUrl+"/role/"+t)},t.prototype.updateUser=function(t){return this.http.put(this.actionUrl+"/"+t.id,t)},t.prototype.deactivateUser=function(t){return this.http.put(this.actionUrl+"/"+t,{status:"inactive"})},t}();a=__decorate([n.i(r.p)(),__metadata("design:paramtypes",[i.a,s.a])],a)},853:function(t,e){t.exports='<div class="container">\n  <h2>User Data</h2>\n  <br>\n  <form [formGroup]="userForm" (ngSubmit)="onSubmit()">\n    <div class="form-group">\n      <label>Firstname:</label>\n      <input type="text" #refName class="form-control" formControlName="firstname" placeholder="Your firstname">\n      <nsdc-validator [control]="userForm.controls[\'firstname\']"></nsdc-validator>\n    </div>\n    <div class="form-group">\n      <label>Lastname:</label>\n      <input type="text" #refName class="form-control" formControlName="lastname" placeholder="Your lastname">\n      <nsdc-validator [control]="userForm.controls[\'lastname\']"></nsdc-validator>\n    </div>\n    <div class="form-group">\n      <label>Role:</label>\n      <select class="form-control" formControlName="role_id">\n        <option style="display:block" value="null">Choose an option</option>\n        <option *ngFor="let role of roles" [value]="role.id">{{ role.name }} </option>\n      </select>\n      <nsdc-validator [control]="userForm.controls[\'role_id\']"></nsdc-validator>\n    </div>\n\n    <div class="form-group">\n      <label>Username:</label>\n      <input type="text" #refName class="form-control" formControlName="username" placeholder="Your username">                       \n      <nsdc-validator [control]="userForm.controls[\'username\']"></nsdc-validator>\n    </div>\n    <div class="form-group">\n      <label>Password:</label>\n      <input type="password" #refName class="form-control" formControlName="password" placeholder="Your password">\n      <nsdc-validator [control]="userForm.controls[\'password\']"></nsdc-validator>\n    </div>\n    <div class="form-group">\n      <label>Email:</label>\n      <input type="text" class="form-control" formControlName="email" placeholder="Your email">\n      <nsdc-validator [control]="userForm.controls[\'email\']"></nsdc-validator>\n    </div>\n    <div *ngIf="submitFailed" class="alert alert-danger">\n      Add user failed\n    </div>  \n    <button\n      type="submit"\n      class="btn btn-primary"\n      [disabled]="(submitPending || userForm.pending) || !userForm.valid"\n    >\n      Submit\n    </button> \n  </form>\n</div>\n'},923:function(t,e,n){"use strict";var r=n(0),s=n(177),i=n(82),a=n(806),o=n(927),u=n(458),c=n(466);n.d(e,"a",function(){return l});var l=function(){function t(t,e,n,r){this._formBuilder=t,this.roleService=e,this.userService=n,this.router=r,this.submitPending=!1,this.submitFailed=!1}return t.prototype.ngOnInit=function(){var t=this;this.userForm=this._formBuilder.group({firstname:["",[s.a.required]],lastname:["",[s.a.required]],email:["",[s.a.required,c.a.emailValidator]],username:[null,[s.a.required]],password:[null,[s.a.required]],status:[],role_id:[null,[s.a.required]]}),this.user=new o.a,this.roleService.getRoles().subscribe(function(e){return t.roles=e})},t.prototype.onSubmit=function(){var t=this;this.submitFailed=!1,this.submitPending=!0,Object.keys(this.userForm.controls).forEach(function(e){return t.user[e]=t.userForm.controls[e].value}),this.user.status="active",this.userService.addUser(this.user).subscribe(function(){t.submitPending=!1,t.router.navigate(["/users"])},function(e){t.errorMessages=e.message,t.submitPending=!1,t.submitFailed=!0})},t}();l=__decorate([n.i(r._2)({selector:"nsdc-add-user",template:n(853)}),__metadata("design:paramtypes",[s.b,u.a,a.a,i.a])],l)},924:function(t,e,n){"use strict";var r=n(0),s=n(177),i=n(82),a=n(806),o=n(458),u=n(466);n.d(e,"a",function(){return c});var c=function(){function t(t,e,n,r,s){this._formBuilder=t,this.userService=e,this.roleService=n,this.router=r,this.route=s,this.submitPending=!1,this.submitFailed=!1}return t.prototype.ngOnInit=function(){var t=this;this.userForm=this._formBuilder.group({firstname:[null,[s.a.required]],lastname:[null,[s.a.required]],role_id:[null,[s.a.required]],email:["",[s.a.required,u.a.emailValidator]],username:[null,[s.a.required]],password:[null,[s.a.required]],status:[]}),this.roleService.getRoles().subscribe(function(e){return t.roles=e}),this.route.data.subscribe(function(e){var n=e.user;t.user=n,t.userForm.patchValue(n)})},t.prototype.onSubmit=function(){var t=this;this.submitFailed=!1,this.submitPending=!0,Object.keys(this.userForm.controls).forEach(function(e){return t.user[e]=t.userForm.controls[e].value}),this.userService.updateUser(this.user).subscribe(function(){t.submitPending=!1,t.router.navigate(["/users"])},function(e){t.errorMessages=e.message,t.submitPending=!1,t.submitFailed=!0})},t}();c=__decorate([n.i(r._2)({selector:"nsdc-edit-user",template:n(853)}),__metadata("design:paramtypes",[s.b,a.a,o.a,i.a,i.c])],c)},925:function(t,e,n){"use strict";var r=n(0),s=n(82),i=n(460),a=n(928),o=n(923),u=n(924),c=n(926);n.d(e,"a",function(){return d}),n.d(e,"b",function(){return m});var l=[{canActivate:[i.a],path:"",component:a.a,data:{permission:"VIEW_USERS"}},{canActivate:[i.a],path:"add",component:o.a,data:{permission:"ADD_USERS"}},{canActivate:[i.a],path:":id",component:u.a,data:{permission:"EDIT_USERS"},resolve:{user:c.a}}],d=function(){function t(){}return t}();d=__decorate([n.i(r.i)({imports:[s.b.forChild(l)],exports:[s.b],providers:[c.a]})],d);var m=[a.a,o.a,u.a]},926:function(t,e,n){"use strict";var r=n(0),s=n(806);n.d(e,"a",function(){return i});var i=function(){function t(t){this.UserService=t}return t.prototype.resolve=function(t,e){return this.UserService.getUserById(t.params.id)},t}();i=__decorate([n.i(r.p)(),__metadata("design:paramtypes",[s.a])],i)},927:function(t,e,n){"use strict";n.d(e,"a",function(){return r});var r=function(){function t(){}return t}()},928:function(t,e,n){"use strict";var r=n(0),s=n(806),i=n(128),a=n(281);n.d(e,"a",function(){return o});var o=function(){function t(t,e,n){this.userService=t,this.toasterService=e,this.userPermissionsService=n,this.loading=!1}return t.prototype.ngOnInit=function(){var t=this;this.loading=!0,this.userService.getUsersByStatus("active").subscribe(function(e){t.users=e,t.loading=!1}),this.userPermissionsService.getUserPermissions().subscribe(function(e){t.permissionShortNames=e.map(function(t){return t.short_name})})},t.prototype.onDeactivate=function(t){var e=this;this.userService.deactivateUser(t).subscribe(function(){e.userService.getUsersByStatus("active").subscribe(function(t){return e.users=t})},function(t){return e.toasterService.pop("error",t.message)})},t.prototype.onStatusChange=function(t){var e=this;this.userService.getUsersByStatus(t).subscribe(function(t){e.users=t,e.loading=!1})},t.prototype.canEdit=function(){return this.permissionShortNames.includes("EDIT_USERS")},t.prototype.canAdd=function(){return this.permissionShortNames.includes("ADD_USERS")},t}();o=__decorate([n.i(r._2)({selector:"nsdc-users",template:n(957)}),__metadata("design:paramtypes",[s.a,a.b,i.a])],o)},957:function(t,e){t.exports='<div class="container">\n  <h2>Users</h2>\n  <div class="manage">\n    <button\n      [disabled]="!canAdd()"\n      class="btn btn-primary right"\n      [routerLink]="[\'/users/add\']"\n    >\n      Add User\n    </button>\n  </div>\n  <select class="form-control user-status" (change)="onStatusChange($event.target.value)">\n    <option value="active">active</option>\n    <option value="inactive">inactive</option>\n  </select>\n  <table *ngIf="!loading" class="table table-hover">\n    <thead>\n      <tr>\n        <th>Username</th>\n        <th>Firstname</th>\n        <th>Lastname</th>\n        <th>Email</th>\n        <th>Status</th>                   \n        <th></th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr *ngFor="let user of users">\n        <td>\n          <a [class.disabled]="!canEdit()"\n            (keydown.enter)="canEdit()"\n            href="#"\n            [routerLink]="[\'/users\', user.id]"\n            routerLinkActive="active">\n            {{user.username}}\n          </a>\n        </td>\n        <td>{{user.firstname}}</td>\n        <td>{{user.lastname}}</td>\n        <td>{{user.email}}</td> \n        <td>{{user.status}}</td>\n        <td class="options options-large">\n          <template [ngIf]="user.status!==\'inactive\'">\n            <button\n              [nsdcConfirmModal]="\'Are you sure you want to deactivate this user?\'"\n              (confirmed)="onDeactivate(user.id)"\n              class="btn btn-danger right"\n              [disabled]="!canEdit()">\n              Deactivate\n            </button>\n            <button\n              [disabled]="!canEdit()"\n              class="btn btn-primary btn-extra right"\n              [routerLink]="[\'/users\', user.id]">\n              Edit\n            </button>\n          </template>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n  <nsdc-loading *ngIf="loading"></nsdc-loading>\n</div>\n'}});