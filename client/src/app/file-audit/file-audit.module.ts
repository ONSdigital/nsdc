import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingModule } from '../loading/loading.module';
import { FileAuditRoutingModule, routedComponents } from './file-audit-routing.module';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { TabsComponent } from '../tabs/tabs.component';
import { TabComponent } from '../tabs/tab.component';
import { SharedModule } from '../shared';

@NgModule({
  imports: [
    FileAuditRoutingModule,
    SharedModule
  ],
  declarations: [
    routedComponents,
    BarChartComponent,
    TabsComponent,
    TabComponent
  ]
})
export class FileAuditModule { }
