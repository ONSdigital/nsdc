import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TableOption } from './table-option';

@Component({
  selector: 'nsdc-table',
  templateUrl: 'table.component.html',
  styleUrls: ['table.component.css']
})
export class TableComponent {

  @Input()
  public columns;

  @Input()
  public rows;

  @Input()
  public options: TableOption[];

  @Input()
  public showOptions;

  @Output()
  public optionClicked = new EventEmitter();

  onOptionClicked(id, option) {
    this.optionClicked.emit({ id, action: option.action });
  }
}
