import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerComponent }   from './date-picker.component';
import { YearPickerComponent }   from './year-picker.component';
import { MonthPickerComponent }   from './month-picker.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    DatePickerComponent,
    YearPickerComponent,
    MonthPickerComponent
  ],
  declarations: [
    DatePickerComponent,
    YearPickerComponent,
    MonthPickerComponent
  ],
  providers: [],
})
export class DatePickerModule { }
