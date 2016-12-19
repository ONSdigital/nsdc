import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Configuration } from '../app.constants';

@Component({
  selector: 'user-list',
  templateUrl : './user-list.component.html',
  providers: [UserService, Configuration]
})
export class UserListComponent implements OnInit {

    public users: User[];
    public erroreMsg: string;

    constructor(private http: Http, private userService: UserService ) {}

    ngOnInit(): void {
        this.userService.getUsers().then((users) => this.users = users);
    }
}
