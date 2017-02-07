import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'nsdc-month-picker',
  templateUrl: 'month-picker.component.html'
})
export class MonthPickerComponent {

  @Input()
  selectedMonth: number;

  @Input()
  disabled = false;

  @Output()
  selectedMonthChange = new EventEmitter();

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
