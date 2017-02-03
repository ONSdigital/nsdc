import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Configuration } from '../app.constants';

@Component({
  selector: 'nsdc-users',
  templateUrl : 'users.component.html'
})
export class UsersComponent implements OnInit {

  public users: User[] = [];
  public loading = false;

  constructor(
    private http: Http,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.userService.getUsersByStatus('active')
    .then(users => {
      this.users = users;
      this.loading = false;
    });
  }

  onDeactivate(userId) {
    this.userService.deactivateUser(userId)
    .subscribe(() => {
      this.userService.getUsersByStatus('active')
      .then(users => this.users = users);
    });
  }

  onEdit(userId) {
    this.router.navigate(['/users', userId]);
  }

  onStatusChange(status) {
    this.userService.getUsersByStatus(status)
    .then(users => {
      this.users = users;
      this.loading = false;
    });
  }
}
