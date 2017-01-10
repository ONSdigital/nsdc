import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileAuditRoutingModule, routedComponents } from './file-audit-routing.module';

@NgModule({
  imports: [FileAuditRoutingModule, CommonModule],
  declarations: [routedComponents]
})
export class FileAuditModule { }
