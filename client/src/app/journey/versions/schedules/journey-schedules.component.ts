import { Component, Input, OnChanges } from '@angular/core';
import { Schedule, ScheduleService } from '../../../schedule';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'nsdc-journey-schedules',
  templateUrl: 'journey-schedules.component.html'
})
export class JourneySchedulesComponent implements OnChanges {

  schedules: Schedule[] = [];
  @Input() versionId: number;
  loading = false;

  constructor(
    private scheduleService: ScheduleService,
    private toasterService: ToasterService
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

  onDelete(scheduleId) {
    this.scheduleService.deleteSchedule(scheduleId)
    .subscribe(
      () => {
        this.scheduleService.getSchedulesByVersion(this.versionId)
          .subscribe(schedules =>
            this.schedules = schedules
          );
      },
      error => this.toasterService.pop('error', error.message)
    );
  }
}
