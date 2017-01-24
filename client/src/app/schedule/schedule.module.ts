import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingModule } from '../loading/loading.module';
import { ScheduleListComponent }   from './schedule-list.component';
import { ScheduleService } from './schedule.service';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    LoadingModule
  ],
  exports: [ScheduleListComponent],
  declarations: [ScheduleListComponent],
  providers: [ScheduleService]
})
export class ScheduleModule { }
