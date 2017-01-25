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
import { DatePickerModule } from '../date-picker';
import { SupplierService } from '../supplier/supplier.service';

@NgModule({
  imports: [
    JourneyRoutingModule,
    LoadingModule,
    DualListModule,
    CommonModule,
    ScheduleModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    DatePickerModule
  ],
  declarations: [
    routedComponents
  ],
  providers: [
    JourneyService,
    SupplierService,
    EditJourneyResolver,
    AddJourneyVersionResolver,
    EditJourneyVersionResolver
  ],
})
export class JourneyModule { }
