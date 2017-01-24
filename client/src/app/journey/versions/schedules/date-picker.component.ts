import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'nsdc-date-picker',
  templateUrl: 'date-picker.component.html',
  styleUrls: ['date-picker.component.css']
})
export class DatePickerComponent {

  public date: Date = new Date();

  @Input('date')
  set dateString(value: string) {
    console.log(value);
    this.date = new Date(value);
    this.dateChange.emit(this.date.toUTCString());
  };
  @Input() disabled = false;

  @Output()
  dateChange = new EventEmitter();

  constructor() { }

  handleMonthChange(newMonth) {
    this.date.setMonth(newMonth);
    this.dateChange.emit(this.date.toUTCString());
  }

  handleYearChange(newYear) {
    this.date.setFullYear(newYear);
    this.dateChange.emit(this.date.toUTCString());
  }
}
