import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Schedule, ScheduleService } from '../../../schedule';

@Component({
  selector: 'nsdc-add-journey-schedule',
  templateUrl: 'journey-schedule.component.html',
  styleUrls: ['journey-schedule.component.css']
})
export class AddJourneyScheduleComponent implements OnInit {

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
      this.schedule.journey_version_id = this.journeyVersionId;
      this.loading = false;
    });
  }

  onSubmit() {
    this.scheduleService.addSchedule(this.schedule)
    .subscribe(() => {
      this.location.back();
    });
  }
}
