"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var UserPermissionsService = (function () {
    function UserPermissionsService(http, loginService, config) {
        this.http = http;
        this.loginService = loginService;
        this.config = config;
    }
    UserPermissionsService.prototype.getUserPermissions = function () {
        if (!this.permissions) {
            var userPermissionsUrl = this.config.Server + 'nsdc/v1.0/permissions/user/' + this.loginService.getCurrentUserId();
            var headers = new http_1.Headers();
            headers.append('X-TOKEN', this.loginService.getSessionId());
            this.permissions = this.http.get(userPermissionsUrl, { headers: headers })
                .map(function (res) { return res.json(); })
                .publishReplay(1)
                .refCount();
        }
        return this.permissions;
    };
    UserPermissionsService.prototype.doesUserHavePermission = function (permissionToCheck) {
        return this.getUserPermissions()
            .map(function (permissions) { return permissions.map(function (permission) { return permission.short_name; }); })
            .map(function (permissions) {
            return permissions.indexOf(permissionToCheck) !== -1;
        });
    };
    UserPermissionsService = __decorate([
        core_1.Injectable()
    ], UserPermissionsService);
    return UserPermissionsService;
}());
exports.UserPermissionsService = UserPermissionsService;
