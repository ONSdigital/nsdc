import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
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

  constructor(
    private http: Http,
    private userService: UserService,
    overlay: Overlay,
    vcRef: ViewContainerRef,
    public modal: Modal
  ) {
    overlay.defaultViewContainer = vcRef;
  }

  ngOnInit(): void {
    this.userService.getUsers().then((users) => this.users = users);
  }

  onDeleteClicked(userId) {
    const modalConfirmation = this.modal.confirm()
    .size('sm')
    .isBlocking(false)
    .showClose(true)
    .keyboard(27)
    .title('Confirm')
    .body('Are you sure you want to delete this user?')
    .open();

    modalConfirmation.then(dialog => dialog.result).then(
      () => {
        this.userService.deleteUser(userId)
        .subscribe(() => {
          this.userService.getUsers().then((users) => this.users = users);
        });
      },
      () => {}
    );
  }
}
