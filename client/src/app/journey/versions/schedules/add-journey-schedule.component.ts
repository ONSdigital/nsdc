import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Schedule, ScheduleService } from '../../../schedule';
import { JourneyService } from '../../journey.service';
import { JourneyVersion } from '../journey-version';

@Component({
  selector: 'nsdc-add-journey-schedule',
  templateUrl: 'journey-schedule.component.html',
  styleUrls: ['journey-schedule.component.css']
})
export class AddJourneyScheduleComponent implements OnInit {

  public schedule: Schedule;
  public version: JourneyVersion;
  journeyVersionId;
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
      this.schedule.journey_version_id = Number(params['id']);
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
