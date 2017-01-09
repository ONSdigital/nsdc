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
var JourneyService = (function () {
    function JourneyService(http, config, loginService) {
        this.http = http;
        this.config = config;
        this.loginService = loginService;
        this.actionUrl = config.Server + 'nsdc/v1.0/journeys';
        this.headers = new http_1.Headers();
        this.headers.set('Content-Type', 'application/json');
    }
    JourneyService.prototype.getJourneys = function () {
        this.headers.set('X-TOKEN', this.loginService.getSessionId());
        return this.http.get(this.actionUrl, { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    JourneyService.prototype.getJourneySteps = function () {
        this.headers.set('X-TOKEN', this.loginService.getSessionId());
        return this.http.get(this.actionUrl + '/steps', { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    JourneyService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    JourneyService = __decorate([
        core_1.Injectable()
    ], JourneyService);
    return JourneyService;
}());
exports.JourneyService = JourneyService;
