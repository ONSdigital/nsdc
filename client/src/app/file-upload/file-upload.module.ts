import { NgModule } from '@angular/core';
import { FileUploaderModule } from '../file-uploader';
import { JourneyService } from '../journey/journey.service';
import { ScheduleService } from '../schedule/schedule.service';
import { FileUploadRoutingModule, routedComponents } from './file-upload-routing.module';
import { SharedModule } from '../shared';

@NgModule({
  imports: [
    FileUploadRoutingModule,
    FileUploaderModule,
    SharedModule
  ],
  declarations: [
    routedComponents
  ],
  providers: [
    JourneyService,
    ScheduleService
  ]
})
export class FileUploadModule { }
