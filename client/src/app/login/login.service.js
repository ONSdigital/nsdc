"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var LoginService = (function () {
    function LoginService(http, config) {
        this.http = http;
        this.config = config;
        this.loggedIn = false;
        var sessionId = sessionStorage.getItem('session_id');
        this.currentUserId = Number(sessionStorage.getItem('user_id'));
        this.loggedIn = !!sessionId;
        this.sessionId = sessionId;
    }
    LoginService.prototype.login = function (username, password) {
        var _this = this;
        var loginUrl = this.config.Server + 'nsdc/v1.0/login';
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .post(loginUrl, JSON.stringify({ username: username, password: password }), { headers: headers })
            .map(function (res) { return res.json(); })
            .map(function (res) {
            if (res.id) {
                sessionStorage.setItem('session_id', res.id);
                sessionStorage.setItem('user_id', res.user_id);
                _this.loggedIn = true;
                _this.currentUserId = res.user_id;
                _this.sessionId = res.id;
            }
            return res.id;
        });
    };
    LoginService.prototype.getSessionId = function () {
        return this.sessionId;
    };
    LoginService.prototype.getCurrentUserId = function () {
        return this.currentUserId;
    };
    LoginService.prototype.logout = function () {
        sessionStorage.removeItem('session_id');
        sessionStorage.removeItem('user_id');
        this.sessionId = null;
        this.loggedIn = false;
        this.currentUserId = null;
    };
    LoginService.prototype.isLoggedIn = function () {
        return this.loggedIn;
    };
    LoginService = __decorate([
        core_1.Injectable()
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
