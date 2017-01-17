import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JourneyRoutingModule, routedComponents } from './journey-routing.module';
import { LoadingModule } from '../loading/loading.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { JourneyService } from './journey.service';
import { EditJourneyResolver } from './edit/edit-journey.resolver';

@NgModule({
  imports: [
    JourneyRoutingModule,
    LoadingModule,
    CommonModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  declarations: [
    routedComponents
  ],
  providers: [
    JourneyService,
    EditJourneyResolver
  ],
})
export class JourneyModule { }
