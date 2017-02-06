import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingModule } from '../loading/loading.module';
import { FileAuditRoutingModule, routedComponents } from './file-audit-routing.module';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { TabsComponent } from '../tabs/tabs.component';
import { TabComponent } from '../tabs/tab.component';
import { FileAuditFiltersComponent } from './file-audit-filters.component';
import { SupplierService } from '../supplier';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FileAuditRoutingModule,
    LoadingModule,
    FormsModule,
    CommonModule
  ],
  declarations: [
    routedComponents,
    BarChartComponent,
    TabsComponent,
    TabComponent,
    FileAuditFiltersComponent
  ],
  providers: [SupplierService]
})
export class FileAuditModule { }
