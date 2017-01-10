"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var UserPermissionsGuard = (function () {
    function UserPermissionsGuard(userPermissionsService, router) {
        this.userPermissionsService = userPermissionsService;
        this.router = router;
    }
    UserPermissionsGuard.prototype.canActivate = function (route) {
        var _this = this;
        var allowedPermission = route.data['permission'];
        return this.userPermissionsService.doesUserHavePermission(allowedPermission)
            .map(function (hasPermission) {
            if (hasPermission) {
                return hasPermission;
            }
            else {
                _this.router.navigate(['/no-permission']);
                return hasPermission;
            }
        }, function (error) {
            _this.router.navigate(['/no-permission']);
            return error;
        });
    };
    UserPermissionsGuard.prototype.canActivateChild = function (route) {
        return this.canActivate(route);
    };
    UserPermissionsGuard = __decorate([
        core_1.Injectable()
    ], UserPermissionsGuard);
    return UserPermissionsGuard;
}());
exports.UserPermissionsGuard = UserPermissionsGuard;
