import { Component, OnInit, Input } from '@angular/core';
import { ScheduleService } from './schedule.service';
import { Schedule } from './schedule';

@Component({
  selector: 'nsdc-schedule-list',
  templateUrl: 'schedule-list.component.html'
})
export class ScheduleListComponent implements OnInit {

  schedules: Schedule[];
  @Input() versionId: number;
  loading = false;

  constructor(
    private scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.scheduleService.getSchedulesByVersion(this.versionId)
    .subscribe(schedules => {
      this.schedules = schedules;
      this.loading = false;
    });
  }
}
