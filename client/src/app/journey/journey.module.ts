import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JourneyRoutingModule, routedComponents } from './journey-routing.module';
import { LoadingModule } from '../loading/loading.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
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
import { ConfirmModalModule } from '../confirm-modal';
import { ValidatorModule } from '../validator/validator.module';

@NgModule({
  imports: [
    JourneyRoutingModule,
    LoadingModule,
    DualListModule,
    CommonModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    DatePickerModule,
    ConfirmModalModule,
    ValidatorModule
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
