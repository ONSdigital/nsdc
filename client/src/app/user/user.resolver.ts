import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { UserService } from './user.service';
import { User } from './user';

@Injectable()
export class UserResolver implements Resolve<User> {
  constructor(
    private UserService: UserService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state): Observable<User> {
    return this.UserService.getUserById(route.params['id']);
  }
}
