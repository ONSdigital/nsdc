import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingModule } from '../loading/loading.module';
import { FileUploaderModule } from '../file-uploader';
import { JourneyService } from '../journey/journey.service';
import { ScheduleService } from '../schedule/schedule.service';
import { FileUploadRoutingModule, routedComponents } from './file-upload-routing.module';

@NgModule({
  imports: [
    LoadingModule,
    FileUploadRoutingModule,
    FileUploaderModule,
    CommonModule
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
