"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ManageModuleComponent = (function () {
    function ManageModuleComponent(loginService, router) {
        this.loginService = loginService;
        this.router = router;
    }
    ManageModuleComponent.prototype.showMenuItems = function () {
        return this.loginService.isLoggedIn();
    };
    ManageModuleComponent = __decorate([
        core_1.Component({
            selector: 'managemodule',
            templateUrl: './manage-module.component.html'
        })
    ], ManageModuleComponent);
    return ManageModuleComponent;
}());
exports.ManageModuleComponent = ManageModuleComponent;
