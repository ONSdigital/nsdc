import { Component, OnInit } from '@angular/core';
import { UserAccountService } from '../user-account.service';
import { JourneyService } from '../journey/journey.service';
import { ScheduleService } from '../schedule/schedule.service';
import { Observable } from 'rxjs/Observable';
import { JourneyVersionSchedule } from '../schedule/journey-version-schedule';

@Component({
  selector: 'file-upload',
  templateUrl: 'file-upload.component.html'
})
export class FileUploadComponent implements OnInit {

  journeyVersionSchedules: JourneyVersionSchedule[];
  loading = false;

  constructor(
    private userAccountService: UserAccountService,
    private journeyService: JourneyService,
    private scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.userAccountService.getUser()
    .mergeMap(user => {
      return this.journeyService.getVersionsByRole(user.role.id);
    })
    .mergeMap(journeyVersions => {
      const journeyVersionScheduleRequests = journeyVersions
      .map(journeyVersion => {
        return this.scheduleService
        .getNextValidScheduleByVersion(journeyVersion.id);
      });
      return Observable.forkJoin(journeyVersionScheduleRequests)
      .map(JourneyVersionSchedules => JourneyVersionSchedules.filter(JourneyVersionSchedule => JourneyVersionSchedule !== null));
    })
    .subscribe((journeyVersionSchedules: JourneyVersionSchedule[]) => {
      this.loading = false;
      console.log(journeyVersionSchedules);
      this.journeyVersionSchedules = journeyVersionSchedules;
    });
  }
}
