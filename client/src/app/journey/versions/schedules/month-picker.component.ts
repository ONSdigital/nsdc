import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'nsdc-month-picker',
    template: `
    <select
      class="form-control"
      required
      [disabled]="disabled"
      (change)="onChange($event.target.value)"
    >
      <option
        *ngFor="let month of months; let index = index"
        [selected]="selectedMonth===index"
        [value]="index"
      >
        {{month}}
      </option>
    </select>`
})

export class MonthPickerComponent {

  @Input() selectedMonth: number;
  @Input() disabled = false;
  @Output() selectedMonthChange = new EventEmitter();

  months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

  onChange(newSelectedMonth) {
    this.selectedMonthChange.emit(newSelectedMonth);
  }
}
