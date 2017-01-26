import { Component, Input, OnChanges } from '@angular/core';
import { Schedule, ScheduleService } from '../../../schedule';

@Component({
  selector: 'nsdc-journey-schedules',
  templateUrl: 'journey-schedules.component.html'
})
export class JourneySchedulesComponent implements OnChanges {

  schedules: Schedule[] = [];
  @Input() versionId: number;
  loading = false;

  constructor(
    private scheduleService: ScheduleService
  ) { }

  ngOnChanges(changes) {
    const newVersionId = changes.versionId.currentValue;
    this.getSchedules(newVersionId);
  }

  getSchedules(versionId) {
    this.loading = true;
    this.scheduleService.getSchedulesByVersion(versionId)
    .subscribe(schedules => {
      this.schedules = schedules;
      this.loading = false;
    });
  }

  onDeleteClicked(id) {
    console.log('delete', id);
  }
}
