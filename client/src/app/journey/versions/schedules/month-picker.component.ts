import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'nsdc-month-picker',
    template: `
    <span>
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
      </select>
    </span>`
})

export class MonthPickerComponent {

  @Input() selectedMonth: number;
  @Input() disabled = false;
  @Output() selectedMonthChange = new EventEmitter();

  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  onChange(newSelectedMonth) {
    this.selectedMonthChange.emit(newSelectedMonth);
  }
}
