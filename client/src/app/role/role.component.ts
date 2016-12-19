import { Component, Input } from '@angular/core';

@Component({
  selector: 'role',
  templateUrl : './role.component.html'
})
export class RoleComponent {
  @Input() public role;
}
