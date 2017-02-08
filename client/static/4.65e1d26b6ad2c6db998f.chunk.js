webpackJsonp([4],{792:function(r,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=e(0),s=e(916),i=e(452),a=e(797),o=e(451);e.d(t,"UserModule",function(){return u});var u=function(){function r(){}return r}();u=__decorate([e.i(n.i)({imports:[s.a,i.a],declarations:[s.b],providers:[a.a,o.a]})],u)},797:function(r,t,e){"use strict";var n=e(0),s=e(96),i=e(278);e.d(t,"a",function(){return a});var a=function(){function r(r,t){this.http=r,this.config=t,this.actionUrl=t.ServerWithApiUrl+"users"}return r.prototype.addUser=function(r){return this.http.post(this.actionUrl,r)},r.prototype.getUsersByStatus=function(r){return this.http.get(this.actionUrl+"/status/"+r)},r.prototype.getUserById=function(r){return this.http.get(this.actionUrl+"/"+r)},r.prototype.getUsersByRole=function(r){return this.http.get(this.actionUrl+"/role/"+r)},r.prototype.updateUser=function(r){return this.http.put(this.actionUrl+"/"+r.id,r)},r.prototype.deactivateUser=function(r){return this.http.put(this.actionUrl+"/"+r,{status:"inactive"})},r}();a=__decorate([e.i(n.p)(),__metadata("design:paramtypes",[i.a,s.a])],a)},844:function(r,t){r.exports='<div class="container">\r\n  <h2>User Data</h2>\r\n  <br>\r\n  <form [formGroup]="userForm" (ngSubmit)="onSubmit()">\r\n    <div class="form-group">\r\n      <label>Firstname:</label>\r\n      <input type="text" #refName class="form-control" formControlName="firstname" placeholder="Your firstname">\r\n      <nsdc-validator [control]="userForm.controls[\'firstname\']"></nsdc-validator>\r\n    </div>\r\n    <div class="form-group">\r\n      <label>Lastname:</label>\r\n      <input type="text" #refName class="form-control" formControlName="lastname" placeholder="Your lastname">\r\n      <nsdc-validator [control]="userForm.controls[\'lastname\']"></nsdc-validator>\r\n    </div>\r\n    <div class="form-group">\r\n      <label>Role:</label>\r\n      <select class="form-control" formControlName="role_id">\r\n        <option style="display:block" value="null">Choose an option</option>\r\n        <option *ngFor="let role of roles" [value]="role.id">{{ role.name }} </option>\r\n      </select>\r\n      <nsdc-validator [control]="userForm.controls[\'role_id\']"></nsdc-validator>\r\n    </div>\r\n\r\n    <div class="form-group">\r\n      <label>Username:</label>\r\n      <input type="text" #refName class="form-control" formControlName="username" placeholder="Your username">                       \r\n      <nsdc-validator [control]="userForm.controls[\'username\']"></nsdc-validator>\r\n    </div>\r\n    <div class="form-group">\r\n      <label>Password:</label>\r\n      <input type="password" #refName class="form-control" formControlName="password" placeholder="Your password">\r\n      <nsdc-validator [control]="userForm.controls[\'password\']"></nsdc-validator>\r\n    </div>\r\n    <div class="form-group">\r\n      <label>Email:</label>\r\n      <input type="text" class="form-control" formControlName="email" placeholder="Your email">\r\n      <nsdc-validator [control]="userForm.controls[\'email\']"></nsdc-validator>\r\n    </div>\r\n    <div *ngIf="submitFailed" class="alert alert-danger">\r\n      Add user failed\r\n    </div>  \r\n    <button\r\n      type="submit"\r\n      class="btn btn-primary"\r\n      [disabled]="submitPending || userForm.pending"\r\n    >\r\n      Submit\r\n    </button> \r\n  </form>\r\n</div>\r\n'},914:function(r,t,e){"use strict";var n=e(0),s=e(177),i=e(80),a=e(797),o=e(918),u=e(451),c=e(460);e.d(t,"a",function(){return l});var l=function(){function r(r,t,e,n){this._formBuilder=r,this.roleService=t,this.userService=e,this.router=n,this.submitPending=!1,this.submitFailed=!1}return r.prototype.ngOnInit=function(){var r=this;this.userForm=this._formBuilder.group({firstname:["",[s.a.required]],lastname:["",[s.a.required]],email:["",[s.a.required,c.a.emailValidator]],username:[null,[s.a.required]],password:[null,[s.a.required]],status:[],role_id:[null,[s.a.required]]}),this.user=new o.a,this.roleService.getRoles().subscribe(function(t){return r.roles=t})},r.prototype.onSubmit=function(){var r=this;this.submitFailed=!1,this.submitPending=!0,Object.keys(this.userForm.controls).forEach(function(t){return r.user[t]=r.userForm.controls[t].value}),this.user.status="active",this.userService.addUser(this.user).subscribe(function(){r.submitPending=!1,r.router.navigate(["/users"])},function(t){r.errorMessages=t.message,r.submitPending=!1,r.submitFailed=!0})},r}();l=__decorate([e.i(n._2)({selector:"nsdc-add-user",template:e(844)}),__metadata("design:paramtypes",[s.b,u.a,a.a,i.a])],l)},915:function(r,t,e){"use strict";var n=e(0),s=e(177),i=e(80),a=e(797),o=e(451),u=e(460);e.d(t,"a",function(){return c});var c=function(){function r(r,t,e,n,s){this._formBuilder=r,this.userService=t,this.roleService=e,this.router=n,this.route=s,this.submitPending=!1,this.submitFailed=!1}return r.prototype.ngOnInit=function(){var r=this;this.userForm=this._formBuilder.group({firstname:[null,[s.a.required]],lastname:[null,[s.a.required]],role_id:[null,[s.a.required]],email:["",[s.a.required,u.a.emailValidator]],username:[null,[s.a.required]],password:[null,[s.a.required]],status:[]}),this.roleService.getRoles().subscribe(function(t){return r.roles=t}),this.route.data.subscribe(function(t){var e=t.user;r.user=e,r.userForm.patchValue(e)})},r.prototype.onSubmit=function(){var r=this;this.submitFailed=!1,this.submitPending=!0,Object.keys(this.userForm.controls).forEach(function(t){return r.user[t]=r.userForm.controls[t].value}),this.userService.updateUser(this.user).subscribe(function(){r.submitPending=!1,r.router.navigate(["/users"])},function(t){r.errorMessages=t.message,r.submitPending=!1,r.submitFailed=!0})},r}();c=__decorate([e.i(n._2)({selector:"nsdc-edit-user",template:e(844)}),__metadata("design:paramtypes",[s.b,a.a,o.a,i.a,i.c])],c)},916:function(r,t,e){"use strict";var n=e(0),s=e(80),i=e(453),a=e(919),o=e(914),u=e(915),c=e(917);e.d(t,"a",function(){return d}),e.d(t,"b",function(){return m});var l=[{canActivate:[i.a],path:"",component:a.a,data:{permission:"VIEW_USERS"}},{canActivate:[i.a],path:"add",component:o.a,data:{permission:"ADD_USERS"}},{canActivate:[i.a],path:":id",component:u.a,data:{permission:"EDIT_USERS"},resolve:{user:c.a}}],d=function(){function r(){}return r}();d=__decorate([e.i(n.i)({imports:[s.b.forChild(l)],exports:[s.b],providers:[c.a]})],d);var m=[a.a,o.a,u.a]},917:function(r,t,e){"use strict";var n=e(0),s=e(797);e.d(t,"a",function(){return i});var i=function(){function r(r){this.UserService=r}return r.prototype.resolve=function(r,t){return this.UserService.getUserById(r.params.id)},r}();i=__decorate([e.i(n.p)(),__metadata("design:paramtypes",[s.a])],i)},918:function(r,t,e){"use strict";e.d(t,"a",function(){return n});var n=function(){function r(){}return r}()},919:function(r,t,e){"use strict";var n=e(0),s=e(797),i=e(128);e.d(t,"a",function(){return a});var a=function(){function r(r,t){this.userService=r,this.userPermissionsService=t,this.loading=!1}return r.prototype.ngOnInit=function(){var r=this;this.loading=!0,this.userService.getUsersByStatus("active").subscribe(function(t){r.users=t,r.loading=!1}),this.userPermissionsService.getUserPermissions().subscribe(function(t){r.permissionShortNames=t.map(function(r){return r.short_name})})},r.prototype.onDeactivate=function(r){var t=this;this.userService.deactivateUser(r).subscribe(function(){t.userService.getUsersByStatus("active").subscribe(function(r){return t.users=r})})},r.prototype.onStatusChange=function(r){var t=this;this.userService.getUsersByStatus(r).subscribe(function(r){t.users=r,t.loading=!1})},r.prototype.canEdit=function(){return this.permissionShortNames.includes("EDIT_USERS")},r.prototype.canAdd=function(){return this.permissionShortNames.includes("ADD_USERS")},r}();a=__decorate([e.i(n._2)({selector:"nsdc-users",template:e(948)}),__metadata("design:paramtypes",[s.a,i.a])],a)},948:function(r,t){r.exports='<div class="container">\r\n  <h2>Users</h2>\r\n  <div class="manage">\r\n    <button\r\n      [disabled]="!canAdd()"\r\n      class="btn btn-primary right"\r\n      [routerLink]="[\'/users/add\']"\r\n    >\r\n      Add User\r\n    </button>\r\n  </div>\r\n  <select class="form-control user-status" (change)="onStatusChange($event.target.value)">\r\n    <option value="active">active</option>\r\n    <option value="inactive">inactive</option>\r\n  </select>\r\n  <table *ngIf="!loading" class="table table-hover">\r\n    <thead>\r\n      <tr>\r\n        <th>Username</th>\r\n        <th>Firstname</th>\r\n        <th>Lastname</th>\r\n        <th>Email</th>\r\n        <th>Status</th>                   \r\n        <th></th>\r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n      <tr *ngFor="let user of users">\r\n        <td>\r\n          <a [class.disabled]="!canEdit()"\r\n            (keydown.enter)="canEdit()"\r\n            href="#"\r\n            [routerLink]="[\'/users\', user.id]"\r\n            routerLinkActive="active">\r\n            {{user.username}}\r\n          </a>\r\n        </td>\r\n        <td>{{user.firstname}}</td>\r\n        <td>{{user.lastname}}</td>\r\n        <td>{{user.email}}</td> \r\n        <td>{{user.status}}</td>\r\n        <td class="options options-large">\r\n          <template [ngIf]="user.status!==\'inactive\'">\r\n            <button\r\n              [nsdcConfirmModal]="\'Are you sure you want to deactivate this user?\'"\r\n              (confirmed)="onDeactivate(user.id)"\r\n              class="btn btn-danger right"\r\n              [disabled]="!canEdit()">\r\n              Deactivate\r\n            </button>\r\n            <button\r\n              [disabled]="!canEdit()"\r\n              class="btn btn-primary btn-extra right"\r\n              [routerLink]="[\'/users\', user.id]">\r\n              Edit\r\n            </button>\r\n          </template>\r\n        </td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n  <nsdc-loading *ngIf="loading"></nsdc-loading>\r\n</div>\r\n'}});