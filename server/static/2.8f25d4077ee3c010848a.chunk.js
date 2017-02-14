webpackJsonp([2],{800:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(0),r=i(917),o=i(458),s=i(806),a=i(802),l=i(805),d=i(827),c=i(846),u=i(459);i.d(e,"RoleModule",function(){return p});var p=function(){function t(){}return t}();p=__decorate([i.i(n.i)({imports:[r.a,d.a,u.a],declarations:[r.b],providers:[s.a,o.a,a.a,l.a,c.a]})],p)},802:function(t,e,i){"use strict";var n=i(0),r=i(96),o=i(280);i.d(e,"a",function(){return s});var s=function(){function t(t,e){this.http=t,this.config=e,this.actionUrl=e.ServerWithApiUrl+"journeys",this.versionUrl=this.actionUrl+"/versions"}return t.prototype.addJourney=function(t){return this.http.post(this.actionUrl,t)},t.prototype.getJourneys=function(){return this.http.get(this.actionUrl)},t.prototype.updateJourney=function(t){return this.http.put(this.actionUrl+"/"+t.id,t)},t.prototype.getAllJourneyVersions=function(){return this.http.get(this.versionUrl)},t.prototype.getVersionsByRole=function(t){return this.http.get(this.versionUrl+"/roles/"+t)},t.prototype.getJourneyById=function(t){return this.http.get(this.actionUrl+"/"+t)},t.prototype.deleteJourney=function(t){return this.http.delete(this.actionUrl+"/"+t)},t.prototype.getSteps=function(){return this.http.get(this.actionUrl+"/steps")},t.prototype.getStepsByJourneyVersion=function(t){return this.http.get(this.versionUrl+"/"+t+"/steps")},t.prototype.addJourneyVersion=function(t){return this.http.post(this.versionUrl,t)},t.prototype.updateJourneyVersion=function(t){return this.http.put(this.versionUrl+"/"+t.id,t)},t.prototype.getJourneyVersions=function(t){return this.http.get(this.actionUrl+"/"+t+"/versions")},t.prototype.getJourneyVersionById=function(t){return this.http.get(this.versionUrl+"/"+t)},t.prototype.updateJourneyVersionSteps=function(t,e){return this.http.post(this.versionUrl+"/"+t+"/updatesteps",{steps:e})},t.prototype.deleteJourneyVersion=function(t){return this.http.delete(this.versionUrl+"/"+t)},t}();s=__decorate([i.i(n.p)(),__metadata("design:paramtypes",[o.a,r.a])],s)},805:function(t,e,i){"use strict";var n=i(0),r=i(96),o=i(280);i.d(e,"a",function(){return s});var s=function(){function t(t,e){this.http=t,this.config=e,this.actionUrl=e.ServerWithApiUrl+"permissions"}return t.prototype.addPermission=function(t){return this.http.post(this.actionUrl,t)},t.prototype.updatePermission=function(t){return this.http.put(this.actionUrl+"/"+t.id,t)},t.prototype.deletePermission=function(t){return this.http.delete(this.actionUrl+"/"+t)},t.prototype.getPermissions=function(){return this.http.get(this.actionUrl)},t.prototype.getPermissionById=function(t){return this.http.get(this.actionUrl+"/"+t)},t.prototype.getPermissionByRole=function(t){return this.http.get(this.actionUrl+"/role/"+t)},t}();s=__decorate([i.i(n.p)(),__metadata("design:paramtypes",[o.a,r.a])],s)},806:function(t,e,i){"use strict";var n=i(0),r=i(96),o=i(280);i.d(e,"a",function(){return s});var s=function(){function t(t,e){this.http=t,this.config=e,this.actionUrl=e.ServerWithApiUrl+"users"}return t.prototype.addUser=function(t){return this.http.post(this.actionUrl,t)},t.prototype.getUsersByStatus=function(t){return this.http.get(this.actionUrl+"/status/"+t)},t.prototype.getUserById=function(t){return this.http.get(this.actionUrl+"/"+t)},t.prototype.getUsersByRole=function(t){return this.http.get(this.actionUrl+"/role/"+t)},t.prototype.updateUser=function(t){return this.http.put(this.actionUrl+"/"+t.id,t)},t.prototype.deactivateUser=function(t){return this.http.put(this.actionUrl+"/"+t,{status:"inactive"})},t}();s=__decorate([i.i(n.p)(),__metadata("design:paramtypes",[o.a,r.a])],s)},825:function(t,e,i){"use strict";var n=i(0);i.d(e,"a",function(){return r});var r=function(){function t(){this.currentTitle="current",this.otherTitle="other",this.saveDisabled=!1,this.cancelDisabled=!1,this.cancelClicked=new n.G,this.saveClicked=new n.G}return t}();__decorate([i.i(n.w)(),__metadata("design:type",Object)],r.prototype,"currentTitle",void 0),__decorate([i.i(n.w)(),__metadata("design:type",Object)],r.prototype,"otherTitle",void 0),__decorate([i.i(n.w)(),__metadata("design:type",Object)],r.prototype,"saveDisabled",void 0),__decorate([i.i(n.w)(),__metadata("design:type",Object)],r.prototype,"cancelDisabled",void 0),__decorate([i.i(n._1)(),__metadata("design:type",Object)],r.prototype,"cancelClicked",void 0),__decorate([i.i(n._1)(),__metadata("design:type",Object)],r.prototype,"saveClicked",void 0),r=__decorate([i.i(n._2)({selector:"nsdc-dual-list-container",template:i(831),styles:[i(836)]})],r)},826:function(t,e,i){"use strict";var n=i(0);i.d(e,"a",function(){return o});var r=function(){function t(t){this._name=t,this.last=null,this.dragStart=!1,this.dragOver=!1,this.pick=new Array,this.list=[]}return Object.defineProperty(t.prototype,"name",{get:function(){return this._name},enumerable:!0,configurable:!0}),t}(),o=s=function(){function t(t,e){this.differs=t,this.cdr=e,this.key="undefined"!=typeof this.key?this.key:"_id",this.display="undefined"!=typeof this.display?this.display:"_name",this.height="undefined"!=typeof this.height?this.height:"100px",this.sort="undefined"!=typeof this.sort&&this.sort,this.compare="undefined"!=typeof this.compare?this.compare:void 0,this.destinationChange=new n.G,this.sorter=function(t,e){return t._name<e._name?-1:t._name>e._name?1:0}}return t.prototype.ngOnChanges=function(t){t.sort&&(t.sort.currentValue===!0&&void 0===this.compare?this.compare=this.sorter:t.sort.currentValue===!1&&(this.compare=void 0)),t.source&&(this.available=new r(s.AVAILABLE_LIST_NAME),this.updatedSource(),this.updatedDestination()),t.destination&&(this.confirmed=new r(s.CONFIRMED_LIST_NAME),this.updatedDestination(),this.updatedSource())},t.prototype.ngDoCheck=function(){var t=this,e=this.sourceDiffer.diff(this.source);e&&(e.forEachRemovedItem(function(e){var i=t.findItemIndex(t.available.list,e.item,t.key);i!==-1&&t.available.list.splice(i,1)}),e.forEachAddedItem(function(e){t.findItemIndex(t.available.list,e.item,t.key)===-1&&t.available.list.push({_id:e.item[t.key],_name:t.makeName(e.item)})}),void 0!==this.compare&&this.available.list.sort(this.compare));var i=this.destinationDiffer.diff(this.destination);i&&(i.forEachRemovedItem(function(e){var i=t.findItemIndex(t.confirmed.list,e.item,t.key);i!==-1&&(t.isItemSelected(t.confirmed.pick,t.confirmed.list[i])||t.selectItem(t.confirmed.pick,t.confirmed.list[i]),t.moveItem(t.confirmed,t.available,t.confirmed.list[i]))}),i.forEachAddedItem(function(e){var i=t.findItemIndex(t.available.list,e.item,t.key);i!==-1&&(t.isItemSelected(t.available.pick,t.available.list[i])||t.selectItem(t.available.pick,t.available.list[i]),t.moveItem(t.available,t.confirmed,t.available.list[i]))}),void 0!==this.compare&&this.available.list.sort(this.compare))},t.prototype.updatedSource=function(){this.available.list.length=0,this.available.pick.length=0,void 0!==this.source&&(this.sourceDiffer=this.differs.find(this.source).create(this.cdr))},t.prototype.updatedDestination=function(){void 0!==this.destination&&(this.destinationDiffer=this.differs.find(this.destination).create(this.cdr))},t.prototype.dragEnd=function(t){return void 0===t&&(t=null),t?t.dragStart=!1:(this.available.dragStart=!1,this.confirmed.dragStart=!1),!1},t.prototype.drag=function(t,e,i){this.isItemSelected(i.pick,e)||this.selectItem(i.pick,e),i.dragStart=!0,t.dataTransfer.setData("text",e[this.key])},t.prototype.allowDrop=function(t,e){return t.preventDefault(),e.dragStart||(e.dragOver=!0),!1},t.prototype.dragLeave=function(){this.available.dragOver=!1,this.confirmed.dragOver=!1},t.prototype.drop=function(t,e){var i=this;t.preventDefault(),this.dragLeave(),this.dragEnd();var n=t.dataTransfer.getData("text"),r=e.list.filter(function(t){return t[i.key]==n});if(r.length>0)for(var o=0,s=r.length;o<s;o+=1)e.pick.push(r[o]);e===this.available?this.moveItem(this.available,this.confirmed):this.moveItem(this.confirmed,this.available)},t.prototype.trueUp=function(){for(var t=this,e=!1,i=this.destination.length;(i-=1)>=0;){var n=this.confirmed.list.filter(function(e){return e._id===t.destination[i][t.key]});0===n.length&&(this.destination.splice(i,1),e=!0)}for(var r=function(i,n){var r=o.destination.filter(function(e){return e[t.key]===t.confirmed.list[i]._id});0===r.length&&(r=o.source.filter(function(e){return e[t.key]===t.confirmed.list[i]._id}),r.length>0&&(o.destination.push(r[0]),e=!0))},o=this,s=0,a=this.confirmed.list.length;s<a;s+=1)r(s,a);e&&this.destinationChange.emit(this.destination)},t.prototype.findItemIndex=function(t,e,i){void 0===i&&(i="_id");var n=-1;return t.filter(function(r){return r._id===e[i]&&(n=t.indexOf(r),!0)}),n},t.prototype.moveItem=function(t,e,i){void 0===i&&(i=null);var n=0,r=t.pick.length;i&&(n=t.list.indexOf(i),r=n+1);for(var o=function(){var r=[];if(i){var o=s.findItemIndex(t.pick,i);o!==-1&&(r[0]=t.pick[o])}else r=t.list.filter(function(e){return e._id===t.pick[n]._id});if(1===r.length){i&&i._id===r[0]._id?e.list.push(r[0]):0===e.list.filter(function(t){return t._id===r[0]._id}).length&&e.list.push(r[0]);var o=t.list.indexOf(r[0]);o!==-1&&t.list.splice(o,1)}},s=this;n<r;n+=1)o();void 0!==this.compare&&e.list.sort(this.compare),t.pick.length=0,this.trueUp()},t.prototype.isItemSelected=function(t,e){return t.filter(function(t){return Object.is(t,e)}).length>0},t.prototype.shiftClick=function(t,e,i,n){if(t.shiftKey&&i.last&&!Object.is(n,i.last)){var r=i.list.indexOf(i.last);if(e>r)for(var o=r+1;o<e;o+=1)this.selectItem(i.pick,i.list[o]);else if(r!==-1)for(var o=e+1;o<r;o+=1)this.selectItem(i.pick,i.list[o])}i.last=n},t.prototype.selectItem=function(t,e){var i=t.filter(function(t){return Object.is(t,e)});if(i.length>0)for(var n=0,r=i.length;n<r;n+=1){var o=t.indexOf(i[n]);o!==-1&&t.splice(o,1)}else t.push(e)},t.prototype.selectAll=function(t){t.pick.length=0,t.pick=t.list.slice(0)},t.prototype.selectNone=function(t){t.pick.length=0},t.prototype.isAllSelected=function(t){return 0===t.list.length||t.list.length===t.pick.length},t.prototype.isAnySelected=function(t){return t.pick.length>0},t.prototype.makeName=function(t){var e="";if(void 0!==this.display){if("[object Array]"===Object.prototype.toString.call(this.display)){for(var i=0;i<this.display.length;i+=1)if(e.length>0&&(e+="_"),this.display[i].indexOf(".")===-1)e+=t[this.display[i]];else{var n=this.display[i].split("."),r=t[n[0]];if(r)if(n[1].indexOf("substring")!==-1){var o=n[1].substring(n[1].indexOf("(")+1,n[1].indexOf(")")).split(",");switch(o.length){case 1:e+=r.substring(parseInt(o[0],10));break;case 2:e+=r.substring(parseInt(o[0],10),parseInt(o[1],10));break;default:e+=r}}else e+=r}return e}return t[this.display]}switch(Object.prototype.toString.call(t)){case"[object Number]":return t;case"[object String]":return t;default:if(void 0!==t)return t[this.display]}},t}();o.AVAILABLE_LIST_NAME="available",o.CONFIRMED_LIST_NAME="confirmed",__decorate([i.i(n.w)(),__metadata("design:type",String)],o.prototype,"key",void 0),__decorate([i.i(n.w)(),__metadata("design:type",String)],o.prototype,"display",void 0),__decorate([i.i(n.w)(),__metadata("design:type",String)],o.prototype,"height",void 0),__decorate([i.i(n.w)(),__metadata("design:type",Boolean)],o.prototype,"sort",void 0),__decorate([i.i(n.w)(),__metadata("design:type",Function)],o.prototype,"compare",void 0),__decorate([i.i(n.w)(),__metadata("design:type",Array)],o.prototype,"source",void 0),__decorate([i.i(n.w)(),__metadata("design:type",Array)],o.prototype,"destination",void 0),__decorate([i.i(n._1)(),__metadata("design:type",Object)],o.prototype,"destinationChange",void 0),o=s=__decorate([i.i(n._2)({selector:"dual-list",template:i(832),styles:[i(837)]}),__metadata("design:paramtypes",[n.F,n.t])],o);var s},827:function(t,e,i){"use strict";var n=i(0),r=i(65),o=i(177),s=i(826),a=i(825);i.d(e,"a",function(){return l});var l=function(){function t(){}return t}();l=__decorate([i.i(n.i)({imports:[r.b,o.c],exports:[s.a,a.a],declarations:[s.a,a.a],providers:[]})],l)},828:function(t,e,i){e=t.exports=i(127)(),e.push([t.i,".btn-row{width:100%;margin:15px 0}.dual-list-header-row{display:flex}.dual-list-header{flex:1 0 auto;text-align:center}",""])},829:function(t,e,i){e=t.exports=i(127)(),e.push([t.i,"div.record-picker{overflow-x:hidden;overflow-y:auto;border:1px solid #ddd;border-radius:8px;position:relative;cursor:pointer}div.record-picker::-webkit-scrollbar{width:12px}div.record-picker::-webkit-scrollbar-button{width:0;height:0}div.record-picker{scrollbar-base-color:#337ab7;scrollbar-3dlight-color:#337ab7;scrollbar-highlight-color:#337ab7;scrollbar-track-color:#eee;scrollbar-arrow-color:gray;scrollbar-shadow-color:gray;scrollbar-dark-shadow-color:gray}div.record-picker::-webkit-scrollbar-track{background:#eee;box-shadow:inset 0 0 3px #dfdfdf;border-top-right-radius:8px;border-bottom-right-radius:8px}div.record-picker::-webkit-scrollbar-thumb{background:#337ab7;border:thin solid gray;border-top-right-radius:8px;border-bottom-right-radius:8px}div.record-picker::-webkit-scrollbar-thumb:hover{background:#286090}.record-picker ul{margin:0;padding:0 0 1px}.record-picker li{border-top:thin solid #ddd;border-bottom:1px solid #ddd;display:block;padding:2px 2px 2px 10px;margin-bottom:-1px;font-size:.85em;cursor:pointer;white-space:nowrap;min-height:16px}.record-picker li:hover{background-color:#f5f5f5}.record-picker li.selected{background-color:#d9edf7}.record-picker li.selected:hover{background-color:#c4e3f3}.record-picker li.disabled{opacity:.5;cursor:default}.record-picker li:first-child{border-top-left-radius:8px;border-top-right-radius:8px;border-top:none}.record-picker li:last-child{border-bottom-left-radius:8px;border-bottom-right-radius:8px;border-bottom:none}.record-picker label{cursor:pointer;font-weight:inherit;font-size:14px;padding:4px;margin-bottom:-1px;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.record-picker ul.over{background-color:#d3d3d3}",""])},831:function(t,e){t.exports='<div>\n  <div class="col-md-12">\n    <div class="dual-list-header-row">\n      <h5 class="dual-list-header">{{otherTitle}}</h5>\n      <h5 class="dual-list-header">{{currentTitle}}</h5>\n    </div>\n  </div>\n  <div class="col-md-12">\n    <ng-content></ng-content>\n  </div>\n  <div class="col-md-12">\n    <div class="btn-row">\n      <button\n        class="btn btn-primary"\n        (click)="saveClicked.emit()"\n        [disabled]="saveDisabled"\n      >\n        Save\n      </button>\n      <button\n        class="btn btn-danger"\n        (click)="cancelClicked.emit()"\n        [disabled]="cancelDisabled"\n      >Cancel</button>\n    <div>\n  <div>\n</div>\n'},832:function(t,e){t.exports='<div style="display:-webkit-box;display:flex;flex-direction:row;align-content:flex-start;">\n\t<form style="width:50%;margin:0px;">\n\t\t<button type="button" name="addBtn" class="btn btn-primary"\n\t\t\tstyle="display:block;width:100%;margin-bottom:8px;"\n\t\t\t(click)="moveItem(available, confirmed)"\n\t\t\t[disabled]="available.pick.length === 0">Add&nbsp;&nbsp;&nbsp;&nbsp;&#9654;</button>\n\n\t\t<div class="record-picker">\n\t\t\t<ul [ngStyle]="{\'max-height\': height, \'min-height\': height}" [ngClass]="{over:available.dragOver}"\n\t\t\t\t(drop)="drop($event, confirmed)" (dragover)="allowDrop($event, available)" (dragleave)="dragLeave()">\n\t\t\t\t<li *ngFor="let item of available.list; let idx=index;"\n\t\t\t\t\t(click)="selectItem(available.pick, item); shiftClick($event, idx, available, item)"\n\t\t\t\t\t[ngClass]="{selected: isItemSelected(available.pick, item)}"\n\t\t\t\t\tdraggable="true" (dragstart)="drag($event, item, available)" (dragend)="dragEnd(available)"\n\t\t\t\t><label>{{item._name}}</label></li>\n\t\t\t</ul>\n\t\t</div>\n\n\t\t<div style="margin-top:8px;">\n\t\t\t<button type="button" class="btn btn-primary"\n\t\t\t\tstyle="width:47%;float:left;" (click)="selectAll(available)"\n\t\t\t\t[disabled]="isAllSelected(available)">All</button>\n\t\t\t<button type="button" class="btn btn-default"\n\t\t\t\tstyle="width:47%;float:right;margin-right:0px;" (click)="selectNone(available)"\n\t\t\t\t[disabled]="!isAnySelected(available)">None</button>\n\t\t</div>\n\t</form>\n\n\t<form style="width:50%;margin:0 0 0 10px;">\n\t\t<button type="button" name="removeBtn" class="btn btn-primary"\n\t\t\tstyle="display:block;width:100%;margin-bottom:8px;"\n\t\t\t(click)="moveItem(confirmed, available)"\n\t\t\t[disabled]="confirmed.pick.length === 0">&#9664;&nbsp;&nbsp;&nbsp;&nbsp;Remove</button>\n\n\t\t<div class="record-picker">\n\t\t\t<ul [ngStyle]="{\'max-height\': height, \'min-height\': height}" [ngClass]="{over:confirmed.dragOver}"\n\t\t\t\t(drop)="drop($event, available)" (dragover)="allowDrop($event, confirmed)" (dragleave)="dragLeave()">\n\t\t\t\t<li *ngFor="let item of confirmed.list; let idx=index;"\n\t\t\t\t\t(click)="selectItem(confirmed.pick, item); shiftClick($event, idx, confirmed, item)"\n\t\t\t\t\t[ngClass]="{selected: isItemSelected(confirmed.pick, item)}"\n\t\t\t\t\tdraggable="true" (dragstart)="drag($event, item, confirmed)" (dragend)="dragEnd(confirmed)"\n\t\t\t\t><label>{{item._name}}</label></li>\n\t\t\t</ul>\n\t\t</div>\n\t\t<div style="margin-top:8px;">\n\t\t\t<button type="button" class="btn btn-primary"\n\t\t\t\tstyle="width:47%;float:left;" (click)="selectAll(confirmed)"\n\t\t\t\t[disabled]="isAllSelected(confirmed)">All</button>\n\t\t\t<button type="button" class="btn btn-default"\n\t\t\t\tstyle="width:47%;float:right;margin-right:0px;" (click)="selectNone(confirmed)"\n\t\t\t\t[disabled]="!isAnySelected(confirmed)">None</button>\n\t\t</div>\n\t</form>\n</div>\n'},836:function(t,e,i){var n=i(828);"string"==typeof n?t.exports=n:t.exports=n.toString()},837:function(t,e,i){var n=i(829);"string"==typeof n?t.exports=n:t.exports=n.toString()},846:function(t,e,i){"use strict";var n=i(0),r=i(458);i.d(e,"a",function(){return o});var o=function(){function t(t){this.roleService=t}return t.prototype.resolve=function(t,e){return this.roleService.getRoleById(t.params.id)},t}();o=__decorate([i.i(n.p)(),__metadata("design:paramtypes",[r.a])],o)},852:function(t,e){t.exports='<div class="container">\n  <h2>Role</h2>\n  <br />\n  <form [formGroup]="roleForm" (ngSubmit)="onSubmit()">\n    <div class="form-group">\n      <label>Name:</label>\n      <input type="text" #refName class="form-control" formControlName="name" placeholder="Role name">\n      <nsdc-validator [control]="roleForm.controls[\'name\']"></nsdc-validator>\n    </div>\n    <div class="form-group">\n      <label>Description:</label>\n      <input type="text" #refName class="form-control" formControlName="description" placeholder="Description">\n      <nsdc-validator [control]="roleForm.controls[\'description\']"></nsdc-validator>\n    </div>\n    <button type="submit" class="btn btn-primary" [disabled]="!roleForm.valid">Submit</button>\n  </form>\n</div>\n'},911:function(t,e,i){"use strict";var n=i(0),r=i(177),o=i(82),s=i(918),a=i(458);i.d(e,"a",function(){return l});var l=function(){function t(t,e,i){this._formBuilder=t,this.roleService=e,this.router=i}return t.prototype.ngOnInit=function(){this.roleForm=this._formBuilder.group({name:["",[r.a.required]],description:["",[r.a.required]]}),this.role=new s.a},t.prototype.onSubmit=function(){var t=this;Object.keys(this.roleForm.controls).forEach(function(e){return t.role[e]=t.roleForm.controls[e].value}),this.roleService.addRole(this.role).subscribe(function(){t.router.navigate(["roles"])},function(t){console.log(t)})},t}();l=__decorate([i.i(n._2)({selector:"nsdc-add-role",template:i(852)}),__metadata("design:paramtypes",[r.b,a.a,o.a])],l)},912:function(t,e,i){"use strict";var n=i(0),r=i(177),o=i(82),s=i(458);i.d(e,"a",function(){return a});var a=function(){function t(t,e,i,n){this._formBuilder=t,this.roleService=e,this.router=i,this.route=n}return t.prototype.ngOnInit=function(){var t=this;this.roleForm=this._formBuilder.group({name:["",[r.a.required]],description:["",[r.a.required]]}),this.route.data.subscribe(function(e){t.role=e.role,t.roleForm.patchValue(t.role)})},t.prototype.onSubmit=function(){var t=this;Object.keys(this.roleForm.controls).forEach(function(e){return t.role[e]=t.roleForm.controls[e].value}),this.roleService.updateRole(this.role).subscribe(function(){t.router.navigate(["roles"])},function(t){console.log(t)})},t}();a=__decorate([i.i(n._2)({selector:"nsdc-edit-role",template:i(852)}),__metadata("design:paramtypes",[r.b,s.a,o.a,o.c])],a)},913:function(t,e,i){"use strict";i.d(e,"a",function(){return n});var n=function(){function t(t,e,i,n){this.version_id=t,this.version_number=e,this.name=i,this.displayName=n}return t}()},914:function(t,e,i){"use strict";var n=i(0),r=i(82),o=i(458),s=i(802),a=i(913),l=i(3);i.n(l);i.d(e,"a",function(){return d});var d=function(){function t(t,e,i,n){this.route=t,this.router=e,this.journeyService=i,this.roleService=n,this.allRoleJourneyVersions=[],this.selectedRoleJourneyVersions=[],this.keepSorted=!0,this.key="version_id",this.display="displayName",this.loading=!1,this.submitPending=!1,this.submitFailed=!1}return t.prototype.ngOnInit=function(){var t=this;this.loading=!0,this.route.data.subscribe(function(e){var i=e.role;t.journeyService.getAllJourneyVersions().mergeMap(function(e){var i=e.map(function(e){return t.journeyService.getJourneyById(e.journey_id).map(function(t){return new a.a(e.id,e.version_number,t.name,t.name+" (v"+e.version_number+")")})});return l.Observable.forkJoin(i)}).subscribe(function(e){t.role=i,t.allRoleJourneyVersions=e,t.journeyService.getVersionsByRole(i.id).subscribe(function(i){var n=i.map(function(t){return t.id});t.selectedRoleJourneyVersions=e.filter(function(t){return n.includes(t.version_id)}),t.loading=!1})})})},t.prototype.saveUpdatedRoleJourneyVersions=function(){var t=this;this.submitPending=!0,this.submitFailed=!1;var e=this.selectedRoleJourneyVersions.map(function(t){return t.version_id});this.roleService.updateRoleJourneyVersions(this.role.id,e).subscribe(function(){t.submitPending=!1,t.router.navigate(["/roles"])},function(e){t.submitPending=!1,t.submitFailed=!0})},t.prototype.cancel=function(){this.router.navigate(["/roles"])},t}();d=__decorate([i.i(n._2)({selector:"nsdc-role-journey-versions",template:i(951)}),__metadata("design:paramtypes",[r.c,r.a,s.a,o.a])],d)},915:function(t,e,i){"use strict";var n=i(0),r=i(458),o=i(806),s=i(805),a=i(3);i.n(a);i.d(e,"a",function(){return l});var l=function(){function t(t,e,i){this.roleService=t,this.userService=e,this.permissionService=i,this.loading=!1,this.dropdownLoading=!1}return t.prototype.ngOnInit=function(){var t=this;this.loading=!0,this.dropdownLoading=!0,this.roleService.getRoles().subscribe(function(e){t.loading=!1,t.dropdownLoading=!1,t.roles=e})},t.prototype.onChange=function(t){var e=this;this.selectedRoleId=t,""!==t&&(this.loading=!0,a.Observable.forkJoin([this.userService.getUsersByRole(t).map(function(t){return e.users=t}),this.permissionService.getPermissionByRole(t).map(function(t){return e.permissions=t})]).subscribe(function(){return e.loading=!1}))},t}();l=__decorate([i.i(n._2)({selector:"nsdc-role-manage",template:i(952)}),__metadata("design:paramtypes",[r.a,o.a,s.a])],l)},916:function(t,e,i){"use strict";var n=i(0),r=i(82),o=i(458),s=i(805),a=i(128),l=i(3);i.n(l);i.d(e,"a",function(){return d});var d=function(){function t(t,e,i,n,r){this.route=t,this.router=e,this.roleService=i,this.permissionService=n,this.userPermissionsService=r,this.keepSorted=!0,this.key="id",this.display="name",this.loading=!1,this.submitPending=!1,this.submitFailed=!1}return t.prototype.ngOnInit=function(){var t=this;this.route.params.subscribe(function(e){var i=Number.parseInt(e.id);t.loading=!0,l.Observable.forkJoin([t.roleService.getRoleById(i).map(function(e){return t.role=e}),t.permissionService.getPermissions().map(function(e){return t.allPermissions=e}),t.permissionService.getPermissionByRole(i).map(function(e){return t.selectedPermissions=e})]).subscribe(function(){return t.loading=!1})})},t.prototype.saveUpdatedRolePermissions=function(){var t=this;this.submitPending=!0,this.submitFailed=!1;var e=this.selectedPermissions.map(function(t){return t.id});this.roleService.updateRolePermissions(this.role.id,e).subscribe(function(){t.submitPending=!1,t.userPermissionsService.clearPermissionsCache(),t.router.navigate(["/roles/manage"])},function(e){t.submitPending=!1,t.submitFailed=!0})},t.prototype.cancel=function(){this.router.navigate(["/roles/manage"])},t}();d=__decorate([i.i(n._2)({selector:"nsdc-role-permissions",template:i(953)}),__metadata("design:paramtypes",[r.c,r.a,o.a,s.a,a.a])],d)},917:function(t,e,i){"use strict";var n=i(0),r=i(82),o=i(460),s=i(919),a=i(911),l=i(912),d=i(915),c=i(916),u=i(846),p=i(914);i.d(e,"a",function(){return f}),i.d(e,"b",function(){return m});var h=[{canActivate:[o.a],path:"",component:s.a,data:{permission:"VIEW_ROLES"}},{canActivate:[o.a],path:"add",component:a.a,data:{permission:"ADD_ROLES"}},{canActivate:[o.a],path:"manage",component:d.a,data:{permission:"VIEW_ROLES"}},{canActivate:[o.a],path:":id/permissions",component:c.a,data:{permission:"EDIT_ROLES"}},{canActivate:[o.a],path:":id",component:l.a,data:{permission:"EDIT_ROLES"},resolve:{role:u.a}},{canActivate:[o.a],path:":id/journey-versions",component:p.a,data:{permission:"VIEW_ROLES"},resolve:{role:u.a}}],f=function(){function t(){}return t}();f=__decorate([i.i(n.i)({imports:[r.b.forChild(h)],exports:[r.b]})],f);var m=[s.a,a.a,l.a,d.a,c.a,p.a]},918:function(t,e,i){"use strict";i.d(e,"a",function(){return n});var n=function(){function t(){}return t}()},919:function(t,e,i){"use strict";var n=i(0),r=i(458),o=i(281);i.d(e,"a",function(){return s});var s=function(){function t(t,e){this.roleService=t,this.toasterService=e,this.loading=!1}return t.prototype.ngOnInit=function(){var t=this;this.loading=!0,this.roleService.getRoles().subscribe(function(e){t.loading=!1,t.roles=e})},t.prototype.onDelete=function(t){var e=this;this.roleService.deleteRole(t).subscribe(function(){return e.roleService.getRoles().subscribe(function(t){return e.roles=t})},function(t){return e.toasterService.pop("error",t.message)})},t}();s=__decorate([i.i(n._2)({selector:"nsdc-roles",template:i(954)}),__metadata("design:paramtypes",[r.a,o.b])],s)},951:function(t,e){t.exports='<div *ngIf="!loading">\n  <div>\n    <a [routerLink]="[\'/roles\']">Roles</a> >\n    {{ role.name }}\n  </div>\n  <div class="dashboard-tag">\n    Please use the following to associate a Role to Journey Versions.\n  </div>\n  <nsdc-dual-list-container\n    otherTitle="Other Journey Versions"\n    currentTitle="Current Journey Versions"\n    (saveClicked)="saveUpdatedRoleJourneyVersions()"\n    (cancelClicked)="cancel()"\n    [saveDisabled]="submitPending"\n    [cancelDisabled]="submitPending"\n  >\n    <dual-list\n      [sort]="keepSorted"\n      [source]="allRoleJourneyVersions"\n      [key]="key"\n      [display]="display"\n      [(destination)]="selectedRoleJourneyVersions"\n      height="265px"\n    >\n    </dual-list>\n  </nsdc-dual-list-container>\n</div>\n<nsdc-loading *ngIf="loading"></nsdc-loading>\n'},952:function(t,e){t.exports='<div class="container">\n    <h2>Manage Roles</h2>\n    <div class="form-group" *ngIf="!dropdownLoading">\n        <select class="form-control" (change)="onChange($event.target.value)">\n            <option style="display:block" value="">Choose a Role</option>\n            <option *ngFor="let role of roles" [value]="role.id">{{ role.name }} </option>\n        </select>       \n    </div>\n</div>\n<div *ngIf="selectedRoleId && !loading" class="container">\n  <div class="role-user-section">\n    <h4>Users</h4>\n    <table class="table table-hover">\n      <thead>\n        <tr>\n          <th>UserName</th>\n          <th>Firstname</th>\n          <th>Lastname</th>\n          <th>Email</th>\n          <th>Status</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor="let user of users">\n          <td><a href="#" [routerLink]="[\'/users\', user.id]" routerLinkActive="active">{{user.username}}</a></td>\n          <td>{{user.firstname}}</td>\n          <td>{{user.lastname}}</td>\n          <td>{{user.email}}</td>\n          <td>{{user.status}}</td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n  <div class="role-section">\n    <h4>Permissions</h4>\n    <div class="manage-permissions">\n        <a class="btn btn-primary right"\n          [routerLink]="[\'/roles\', selectedRoleId, \'permissions\']"\n        >\n          Add/Remove Permissions\n        </a>\n    </div>\n    <table class="table table-hover">\n      <thead>\n        <tr>\n          <th>Permission Name</th>\n          <th>Short Name</th>\n          <th>Description</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor="let permission of permissions">\n          <td><a href="#" [routerLink]="[\'/permissions\', permission.id]" routerLinkActive="active">{{permission.name}}</a></td>\n          <td>{{permission.short_name}}</td>\n          <td>{{permission.description}}</td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</div>\n<nsdc-loading *ngIf="loading"></nsdc-loading>\n'},953:function(t,e){t.exports='<div *ngIf="!loading">\n  <div>\n    <a [routerLink]="[\'/roles\']">Roles</a> >\n    {{ role.name }}\n  </div>\n  <div class="dashboard-tag">\n    Please use the following to associate a Role to Journey Versions.\n  </div>\n  <nsdc-dual-list-container\n    otherTitle="Other Permissions"\n    currentTitle="Current Permissions"\n    (saveClicked)="saveUpdatedRolePermissions()"\n    (cancelClicked)="cancel()"\n    [saveDisabled]="submitPending"\n    [cancelDisabled]="submitPending"\n  >\n    <dual-list\n      [sort]="keepSorted"\n      [source]="allPermissions"\n      [key]="key"\n      [display]="display"\n      [(destination)]="selectedPermissions"\n      height="265px"\n    >\n    </dual-list>\n  </nsdc-dual-list-container>\n</div>\n<nsdc-loading *ngIf="loading"></nsdc-loading>\n'},954:function(t,e){t.exports='<div class="container">\n  <h2>Roles</h2>\n  <div class="manage">\n    <a class="btn btn-primary right" [routerLink]="[\'/roles/add\']">Add Role</a>\n    <a class="btn btn-primary btn-extra right" [routerLink]="[\'/roles/manage\']">Manage</a>\n    <div class="clear"></div>\n  </div>\n  <table *ngIf="!loading" class="table table-hover">\n    <thead>\n      <tr>\n        <th>Role Name</th>\n        <th>Description</th>\n        <th></th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr *ngFor="let role of roles">\n        <td><a href="#" [routerLink]="[\'/roles\', role.id]" routerLinkActive="active">{{role.name}}</a></td>\n        <td>{{role.description}}</td>\n        <td class="options options-large">\n          <button\n            class="btn btn-danger right"\n            [nsdcConfirmModal]="\'Are you sure you want to delete this user?\'"\n            (confirmed)="onDelete(role.id)">\n            Delete\n          </button>\n          <button\n            class="btn btn-primary btn-extra right "\n            [routerLink]="[\'/roles\', role.id]">\n            Edit\n          </button>\n          <button\n            class="btn btn-info btn-extra right "\n            [routerLink]="[\'/roles/\' + role.id + \'/permissions\']">\n            Permissions\n          </button>\n          <button\n            class="btn btn-warning btn-extra right "\n            [routerLink]="[\'/roles/\' + role.id + \'/journey-versions\']">\n            Journey Versions\n          </button>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n  <nsdc-loading *ngIf="loading"></nsdc-loading>\n</div>\n'}});