import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
    selector: 'nsdc-year-picker',

    template: `
    <span>
      <select
        class="form-control"
        required
        [disabled]="disabled"
        (change)="onChange($event.target.value)"
      >
        <option *ngFor="let year of years" [selected]="selectedYear===year">{{year}}</option>   
      </select>
    </span>`
})

export class YearPickerComponent implements OnInit {

  public years: number[];
  @Input() selectedYear: number;
  @Input() disabled = false;
  @Output() selectedYearChange = new EventEmitter();

  ngOnInit() {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 5; i < currentYear + 15; i++) {
      years.push(i);
    }
    this.years = years;
  }

  onChange(newSelectedYear) {
    this.selectedYearChange.emit(newSelectedYear);
  }

}
