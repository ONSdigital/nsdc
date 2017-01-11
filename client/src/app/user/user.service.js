"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var Observable_1 = require('rxjs/Observable');
var UserService = (function () {
    function UserService(http, config, loginService) {
        this.http = http;
        this.config = config;
        this.loginService = loginService;
        this.actionUrl = config.Server + 'nsdc/v1.0/users';
        this.headers = new http_1.Headers();
        this.headers.set('Content-Type', 'application/json');
    }
    UserService.prototype.addUser = function (user) {
        this.headers.set('X-TOKEN', this.loginService.getSessionId());
        var userAddUrl = this.config.Server + 'nsdc/v1.0/users';
        return this.http.post(userAddUrl, JSON.stringify(user), { headers: this.headers })
            .map(function (res) { return res.json(); })
            .catch(function (res) {
            return Observable_1.Observable.throw(res.json());
        });
    };
    UserService.prototype.getUsers = function () {
        this.headers.set('X-TOKEN', this.loginService.getSessionId());
        var userListUrl = this.config.Server + 'nsdc/v1.0/users';
        return this.http.get(userListUrl, { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.getUserById = function (id) {
        this.headers.set('X-TOKEN', this.loginService.getSessionId());
        var userUrl = this.config.Server + 'nsdc/v1.0/users/' + id;
        return this.http.get(userUrl, { headers: this.headers })
            .toPromise().then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.getUsersByRole = function (roleId) {
        this.headers.set('X-TOKEN', this.loginService.getSessionId());
        var userUrl = this.config.Server + 'nsdc/v1.0/users/role/' + roleId;
        return this.http.get(userUrl, { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.updateUser = function (user) {
        this.headers.set('X-TOKEN', this.loginService.getSessionId());
        var userEditUrl = this.config.Server + 'nsdc/v1.0/users/' + user.id;
        return this.http.put(userEditUrl, JSON.stringify(user), { headers: this.headers }).toPromise().then(function () { return user; }).catch(this.handleError);
    };
    UserService.prototype.deleteUser = function (id) {
        this.headers.set('X-TOKEN', this.loginService.getSessionId());
        var deleteUrl = this.config.Server + 'nsdc/v1.0/users/' + id;
        return this.http.delete(deleteUrl, { headers: this.headers })
            .map(function (res) { return res.json(); })
            .catch(function (res) {
            return Observable_1.Observable.throw(res.json());
        });
    };
    UserService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    UserService = __decorate([
        core_1.Injectable()
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
