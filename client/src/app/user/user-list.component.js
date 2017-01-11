"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var UserListComponent = (function () {
    function UserListComponent(http, userService, modal, overlay, vcRef) {
        this.http = http;
        this.userService = userService;
        this.modal = modal;
        overlay.defaultViewContainer = vcRef;
    }
    UserListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getUsers().then(function (users) { return _this.users = users; });
    };
    UserListComponent.prototype.onDeleteClicked = function (userId) {
        var _this = this;
        var modalConfirmation = this.modal.confirm()
            .size('sm')
            .isBlocking(false)
            .showClose(true)
            .keyboard(27)
            .title('Confirm')
            .body('Are you sure you want to delete this user?')
            .open();
        modalConfirmation.then(function (dialog) { return dialog.result; }).then(function () {
            _this.userService.deleteUser(userId)
                .subscribe(function () {
                _this.userService.getUsers().then(function (users) { return _this.users = users; });
            });
        }, function () { });
    };
    UserListComponent = __decorate([
        core_1.Component({
            selector: 'user-list',
            templateUrl: './user-list.component.html'
        })
    ], UserListComponent);
    return UserListComponent;
}());
exports.UserListComponent = UserListComponent;
