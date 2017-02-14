webpackJsonp([6],{799:function(i,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=t(0),e=t(908),s=t(805),o=t(845),a=t(459);t.d(r,"PermissionModule",function(){return c});var c=function(){function i(){}return i}();c=__decorate([t.i(n.i)({imports:[e.a,a.a],declarations:[e.b],providers:[s.a,o.a]})],c)},805:function(i,r,t){"use strict";var n=t(0),e=t(96),s=t(280);t.d(r,"a",function(){return o});var o=function(){function i(i,r){this.http=i,this.config=r,this.actionUrl=r.ServerWithApiUrl+"permissions"}return i.prototype.addPermission=function(i){return this.http.post(this.actionUrl,i)},i.prototype.updatePermission=function(i){return this.http.put(this.actionUrl+"/"+i.id,i)},i.prototype.deletePermission=function(i){return this.http.delete(this.actionUrl+"/"+i)},i.prototype.getPermissions=function(){return this.http.get(this.actionUrl)},i.prototype.getPermissionById=function(i){return this.http.get(this.actionUrl+"/"+i)},i.prototype.getPermissionByRole=function(i){return this.http.get(this.actionUrl+"/role/"+i)},i}();o=__decorate([t.i(n.p)(),__metadata("design:paramtypes",[s.a,e.a])],o)},845:function(i,r,t){"use strict";var n=t(0),e=t(805);t.d(r,"a",function(){return s});var s=function(){function i(i){this.PermissionService=i}return i.prototype.resolve=function(i,r){return this.PermissionService.getPermissionById(i.params.id)},i}();s=__decorate([t.i(n.p)(),__metadata("design:paramtypes",[e.a])],s)},851:function(i,r){i.exports='<div class="container">\r\n    <h2>Permissions</h2>\r\n    <br>\r\n    <form [formGroup]="permissionForm" (ngSubmit)="onSubmit()">\r\n        <div class="form-group">\r\n            <label>Name:</label>\r\n            <input type="text" #refName class="form-control" formControlName="name" placeholder="permission name">\r\n            <nsdc-validator [control]="permissionForm.controls[\'name\']"></nsdc-validator>\r\n        </div>\r\n        <div class="form-group">\r\n            <label>Short Name:</label>\r\n            <input type="text" #refName class="form-control" formControlName="short_name" placeholder="permission short name">\r\n            <nsdc-validator [control]="permissionForm.controls[\'short_name\']"></nsdc-validator>\r\n        </div>\r\n        <div class="form-group">\r\n            <label>Description:</label>\r\n            <input type="text" #refName class="form-control" formControlName="description" placeholder="Description">\r\n            <nsdc-validator [control]="permissionForm.controls[\'description\']"></nsdc-validator>\r\n        </div>\r\n        <button type="submit" class="btn btn-primary" [disabled]="!permissionForm.valid">Submit</button>\r\n    </form>\r\n</div>\r\n'},906:function(i,r,t){"use strict";var n=t(0),e=t(177),s=t(82),o=t(909),a=t(805);t.d(r,"a",function(){return c});var c=function(){function i(i,r,t){this._formBuilder=i,this.permissionService=r,this.router=t,this.submitPending=!1,this.submitFailed=!1}return i.prototype.ngOnInit=function(){this.permissionForm=this._formBuilder.group({name:["",[e.a.required]],short_name:["",[e.a.required]],description:["",[e.a.required]]}),this.permission=new o.a},i.prototype.onSubmit=function(){var i=this;this.permission.name=this.permissionForm.controls.name.value,this.permission.short_name=this.permissionForm.controls.short_name.value,this.permission.description=this.permissionForm.controls.description.value,this.permissionService.addPermission(this.permission).subscribe(function(){i.submitPending=!1,i.router.navigate(["/permissions"])},function(r){i.submitPending=!1,i.submitFailed=!0})},i}();c=__decorate([t.i(n._2)({selector:"nsdc-add-permission",template:t(851)}),__metadata("design:paramtypes",[e.b,a.a,s.a])],c)},907:function(i,r,t){"use strict";var n=t(0),e=t(177),s=t(82),o=t(805);t.d(r,"a",function(){return a});var a=function(){function i(i,r,t,n){this._formBuilder=i,this.permissionService=r,this.router=t,this.route=n,this.submitPending=!1,this.submitFailed=!1}return i.prototype.ngOnInit=function(){var i=this;this.permissionForm=this._formBuilder.group({name:["",[e.a.required]],short_name:["",[e.a.required]],description:["",[e.a.required]]}),this.route.data.subscribe(function(r){i.permission=r.permission,i.permissionForm.patchValue(i.permission)})},i.prototype.onSubmit=function(){var i=this;Object.keys(this.permissionForm.controls).forEach(function(r){return i.permission[r]=i.permissionForm.controls[r].value}),this.permissionService.updatePermission(this.permission).subscribe(function(){i.submitPending=!1,i.router.navigate(["/permissions"])},function(r){i.submitPending=!1,i.submitFailed=!0})},i}();a=__decorate([t.i(n._2)({selector:"nsdc-edit-permission",template:t(851)}),__metadata("design:paramtypes",[e.b,o.a,s.a,s.c])],a)},908:function(i,r,t){"use strict";var n=t(0),e=t(82),s=t(460),o=t(910),a=t(906),c=t(907),m=t(845);t.d(r,"a",function(){return p}),t.d(r,"b",function(){return d});var u=[{canActivate:[s.a],path:"add",component:a.a,data:{permission:"ADD_PERMISSIONS"}},{canActivate:[s.a],path:":id",component:c.a,data:{permission:"EDIT_PERMISSIONS"},resolve:{permission:m.a}},{canActivate:[s.a],path:"",component:o.a,data:{permission:"VIEW_PERMISSIONS"}}],p=function(){function i(){}return i}();p=__decorate([t.i(n.i)({imports:[e.b.forChild(u)],exports:[e.b]})],p);var d=[o.a,a.a,c.a]},909:function(i,r,t){"use strict";t.d(r,"a",function(){return n});var n=function(){function i(){}return i}()},910:function(i,r,t){"use strict";var n=t(0),e=t(805),s=t(281);t.d(r,"a",function(){return o});var o=function(){function i(i,r){this.permissionService=i,this.toasterService=r,this.loading=!1}return i.prototype.ngOnInit=function(){var i=this;this.loading=!0,this.permissionService.getPermissions().subscribe(function(r){i.loading=!1,i.permissions=r})},i.prototype.onDeleteClicked=function(i){var r=this;this.permissionService.deletePermission(i).subscribe(function(){return r.permissionService.getPermissions().subscribe(function(i){return r.permissions=i})},function(i){return r.toasterService.pop("error",i.message)})},i}();o=__decorate([t.i(n._2)({selector:"nsdc-permissions",template:t(950)}),__metadata("design:paramtypes",[e.a,s.b])],o)},950:function(i,r){i.exports='<div class="container">\r\n  <h2>Permissions</h2>\r\n  <div class="manage">\r\n    <a class="btn btn-primary right" [routerLink]="[\'/permissions/add\']">Add Permission</a>\r\n  </div>                \r\n  <table *ngIf="!loading" class="table table-hover">\r\n    <thead>\r\n      <tr>\r\n        <th>Permission Name</th>\r\n        <th>Short Name</th>\r\n        <th>Description</th>\r\n        <th></th>\r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n      <tr *ngFor="let permission of permissions">\r\n        <td><a href="#" [routerLink]="[\'/permissions\', permission.id]" routerLinkActive="active">{{permission.name}}</a></td>\r\n        <td>{{permission.short_name}}</td>\r\n        <td>{{permission.description}}</td>\r\n        <td class="options">\r\n          <button\r\n            class="btn btn-danger right"\r\n            [nsdcConfirmModal]="\'Are you sure you want to delete this permission?\'"\r\n            (confirmed)="onDeleteClicked(permission.id)">\r\n            Delete\r\n          </button>\r\n          <button\r\n            class="btn btn-primary btn-extra right"\r\n            [routerLink]="[\'/permissions\', permission.id]">\r\n            Edit\r\n          </button>\r\n        </td>\r\n      </tr>\r\n    </tbody>\r\n  </table>\r\n  <nsdc-loading *ngIf="loading"></nsdc-loading>\r\n</div>\r\n'}});