import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingModule } from '../loading/loading.module';
import { FileAuditRoutingModule, routedComponents } from './file-audit-routing.module';

@NgModule({
  imports: [FileAuditRoutingModule, LoadingModule, CommonModule],
  declarations: [routedComponents]
})
export class FileAuditModule { }
