import { NgModule } from '@angular/core';
import { JourneyRoutingModule, routedComponents } from './journey-routing.module';
import { JourneyService } from './journey.service';
import { JourneyResolver } from './journey.resolver';
import { AddJourneyVersionResolver } from './versions/add-journey-version.resolver';
import { EditJourneyVersionResolver } from './versions/edit-journey-version.resolver';
import { DualListModule } from '../dual-list/dual-list.module';
import { DatePickerModule } from '../date-picker';
import { JourneyStepsComponent } from './versions/steps/journey-steps.component';
import { JourneySchedulesComponent } from './versions/schedules/journey-schedules.component';
import { SupplierService } from '../supplier';
import { ScheduleService } from '../schedule';
import { ManageJourneyGuard } from './manage/manage-journey.guard';
import { ManageJourneyVersionGuard } from './manage/manage-journey-version.guard';
import { SharedModule } from '../shared';

@NgModule({
  imports: [
    JourneyRoutingModule,
    DualListModule,
    DatePickerModule,
    SharedModule
  ],
  declarations: [
    routedComponents,
    JourneyStepsComponent,
    JourneySchedulesComponent
  ],
  providers: [
    JourneyService,
    SupplierService,
    ScheduleService,
    // the guards/resolvers can be moved to xxx-routing.module.ts
    // after this issue fixed:
    // https://github.com/angular/angular/issues/12275
    JourneyResolver,
    AddJourneyVersionResolver,
    EditJourneyVersionResolver,
    ManageJourneyGuard,
    ManageJourneyVersionGuard
  ],
})
export class JourneyModule { }
