import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingModule } from '../loading/loading.module';
import { ScheduleListComponent }   from './schedule-list.component';
import { ScheduleService } from './schedule.service';

@NgModule({
  imports: [
    CommonModule,
    LoadingModule
  ],
  exports: [ScheduleListComponent],
  declarations: [ScheduleListComponent],
  providers: [ScheduleService]
})
export class ScheduleModule { }
