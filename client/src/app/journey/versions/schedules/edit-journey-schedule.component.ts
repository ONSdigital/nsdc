import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Schedule, ScheduleService } from '../../../schedule';
import { JourneyVersion } from '../journey-version';
import { JourneyService } from '../../journey.service';

@Component({
  selector: 'nsdc-edit-journey-schedule',
  templateUrl: 'journey-schedule.component.html',
  styleUrls: ['journey-schedule.component.css']
})
export class EditJourneyScheduleComponent implements OnInit {

  public schedule: Schedule;
  public version: JourneyVersion;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private scheduleService: ScheduleService,
    private journeyService: JourneyService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.schedule = new Schedule();
    this.route.params.subscribe(params => {
      this.journeyService.getJourneyVersionById(Number(params['id']))
        .subscribe(version => this.version = version);
      const scheduleId = Number(params['scheduleId']);
      this.scheduleService.getScheduleById(scheduleId)
      .subscribe(schedule => {
        this.schedule = schedule;
        this.loading = false;
      });
    });
  }

  onSubmit() {
    this.scheduleService.updateSchedule(this.schedule)
    .subscribe(() => {
      this.location.back();
    });
  }
}
