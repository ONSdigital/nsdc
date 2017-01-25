import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Schedule } from '../../../schedule/schedule';
import { ScheduleService } from '../../../schedule/schedule.service';

@Component({
  selector: 'nsdc-edit-journey-schedule',
  templateUrl: 'journey-schedule.component.html',
  styleUrls: ['journey-schedule.component.css']
})
export class EditJourneyScheduleComponent implements OnInit {

  public schedule: Schedule;
  journeyVersionId;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.schedule = new Schedule();
    this.route.params.subscribe(params => {
      this.journeyVersionId = Number(params['id']);
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
