import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'nsdc-dual-list-container',
  templateUrl: 'dual-list-container.component.html',
  styleUrls: ['dual-list-container.component.css']
})
export class DualListContainerComponent {

  @Input()
  public currentTitle = 'current';

  @Input()
  public otherTitle = 'other';

  @Input()
  public saveDisabled = false;

  @Input()
  public cancelDisabled = false;

  @Output()
  public cancelClicked = new EventEmitter();

  @Output()
  public saveClicked = new EventEmitter();

}
