import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScheduleService } from '../../schedule/schedule.service';
import { NgUploaderOptions } from 'ngx-uploader';
import { LoginService } from '../../login/login.service';
import { Configuration } from '../../app.constants';

@Component({
  selector: 'nsdc-journey-file-upload',
  templateUrl: 'journey-file-upload.component.html',
  styleUrls: ['journey-file-upload.component.css']
})
export class JourneyFileUploadComponent implements OnInit {
  journeyVersionSchedule;
  validator: RegExp;
  loading = false;
  options: NgUploaderOptions;
  URL: string;

  constructor(
    private route: ActivatedRoute,
    private scheduleService: ScheduleService,
    public loginService: LoginService,
    private router: Router,
    private config: Configuration
  ) {
    this.URL = config.Server + 'nsdc/v1.0/upload';
  }

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(params => {
      const versionId = Number(params['id']);
      this.scheduleService.getNextValidScheduleByVersion(versionId)
      .subscribe(journeyVersionSchedule => {
        this.journeyVersionSchedule = journeyVersionSchedule;
        this.options = new NgUploaderOptions({
          url: this.URL,
          multiple: false,
          autoUpload: false,
          customHeaders: {
            'X-TOKEN': this.loginService.getSessionId()
          },
          data: {
            schedule_id: journeyVersionSchedule.schedule_id
          }
        });
        this.validator = new RegExp(journeyVersionSchedule.validator.replace('*', '.*'));
        this.loading = false;
      });
    });
  }

  uploadAnother() {
    this.router.navigate(['upload']);
  }
}
