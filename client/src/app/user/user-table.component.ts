import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from './user';
import { TableOption } from '../table';

@Component({
  selector: 'nsdc-user-table',
  templateUrl: 'user-table.component.html'
})
export class UserTableComponent {

  @Input()
  public users: User[] = [];

  @Output()
  deactivateClicked = new EventEmitter();

  @Output()
  editClicked = new EventEmitter();

  columns = [
    { prop: 'username' },
    { prop: 'firstname' },
    { prop: 'lastname' },
    { prop: 'email' },
    { prop: 'status' }
  ];

  options: TableOption[] = [
    {
      type: 'button',
      action: 'edit',
      style: 'primary',
    }, {
      type: 'button',
      action: 'deactivate',
      style: 'danger',
      confirm: true,
      confirmMessage: 'Are you sure you want to deactivate this user?'
    }
  ];

  showOptions = row => (row.status === 'active');

  onOptionClicked({ id, action }) {
    switch (action) {
      case 'edit':
        this.editClicked.emit(id);
        break;
      case 'deactivate':
        this.deactivateClicked.emit(id);
        break;
      default:
        break;
    }
  }

}
