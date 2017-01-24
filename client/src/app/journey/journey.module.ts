import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JourneyRoutingModule, routedComponents } from './journey-routing.module';
import { LoadingModule } from '../loading/loading.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { JourneyService } from './journey.service';
import { EditJourneyResolver } from './edit/edit-journey.resolver';
import { AddJourneyVersionResolver } from './versions/add/add-journey-version.resolver';
import { EditJourneyVersionResolver } from './versions/edit/edit-journey-version.resolver';
import { DualListModule } from '../dual-list/dual-list.module';
import { ScheduleModule } from '../schedule/schedule.module';
import { MonthPickerComponent } from './versions/schedules/month-picker.component';
import { YearPickerComponent } from './versions/schedules/year-picker.component';
import { DatePickerComponent } from './versions/schedules/date-picker.component';

@NgModule({
  imports: [
    JourneyRoutingModule,
    LoadingModule,
    DualListModule,
    CommonModule,
    ScheduleModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  declarations: [
    routedComponents,
    MonthPickerComponent,
    YearPickerComponent,
    DatePickerComponent
  ],
  providers: [
    JourneyService,
    EditJourneyResolver,
    AddJourneyVersionResolver,
    EditJourneyVersionResolver
  ],
})
export class JourneyModule { }
