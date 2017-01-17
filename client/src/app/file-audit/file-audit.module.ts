import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JourneyModule } from '../journey/journey.module';
import { LoadingModule } from '../loading/loading.module';
import { FileAuditRoutingModule, routedComponents } from './file-audit-routing.module';

@NgModule({
  imports: [
    FileAuditRoutingModule,
    JourneyModule,
    LoadingModule,
    CommonModule
  ],
  declarations: [routedComponents]
})
export class FileAuditModule { }
