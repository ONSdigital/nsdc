import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'nsdc-file-audit-filters',
  templateUrl: 'file-audit-filters.component.html'
})
export class FileAuditFiltersComponent implements OnInit {

  @Input()
  public suppliers;

  @Output()
  public filtersChange = new EventEmitter();

  selectedSupplierId;
  to;
  from;

  constructor() { }

  ngOnInit() { }

  onSupplierChange(value) {
    this.selectedSupplierId = value;
    this.filtersChange.emit({
      supplierId: this.selectedSupplierId,
      to: this.to,
      from: this.from
    });
  }

  onFromDateChange(value) {
    this.from = value;
    this.filtersChange.emit({
      supplierId: this.selectedSupplierId,
      to: this.to,
      from: this.from
    });
  }

  onToDateChange(value) {
    this.to = value;
    this.filtersChange.emit({
      supplierId: this.selectedSupplierId,
      to: this.to,
      from: this.from
    });
  }

}
