import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../../schedule/schedule.service';
import { ActivatedRoute } from '@angular/router';
import { Schedule } from '../../../schedule/schedule';

@Component({
  selector: 'nsdc-journey-schedules',
  templateUrl: 'journey-schedules.component.html',
  styleUrls: ['journey-schedules.component.css']
})
export class JourneySchedulesComponent implements OnInit {

  schedules: Schedule[];
  versionId;

  constructor(
    private scheduleService: ScheduleService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.versionId = Number(params['id']);
    });
  }

  addScheduleClicked() {
  }

}
