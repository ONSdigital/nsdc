import { Component, OnInit, OnDestroy } from '@angular/core';
import { File } from './file';
import { FileAudit } from './file-audit';
import { FileAuditService } from './file-audit.service';
import { Configuration } from '../app.constants';
import { SupplierService } from '../supplier';

@Component({
  selector: 'nsdc-file-audit',
  templateUrl: 'file-audit.component.html',
  providers: [FileAuditService, Configuration]
})
export class FileAuditComponent implements OnInit, OnDestroy {
  public chartData = [];
  public files: File[];
  public audits: FileAudit[];
  public loading = false;
  public dropdownLoading = false;
  public selectedFileId = null;
  public suppliers;
  private pollSubscription;
  private chartPollSubscription;

  constructor(
    private fileAuditService: FileAuditService,
    private supplierService: SupplierService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.dropdownLoading = true;
    this.supplierService.getSuppliers().subscribe(suppliers => this.suppliers = suppliers);
    this.fileAuditService.getFiles()
    .subscribe(files => {
      this.files = files;
      this.loading = false;
      this.dropdownLoading = false;
    });
  }

  ngOnDestroy() {
    if (this.pollSubscription) {
      this.pollSubscription.unsubscribe();
    }
    if (this.chartPollSubscription) {
      this.chartPollSubscription.unsubscribe();
    }
  }

  onFiltersChanged({supplierId, to, from }) {
    this.loading = true;
    this.dropdownLoading = true;
    this.fileAuditService.getFiles({supplierId, to, from })
    .subscribe(files => {
      this.files = files;
      if (!this.files.some((file: File) => (file.id === this.selectedFileId))) {
        this.selectedFileId = null;
      }
      this.loading = false;
      this.dropdownLoading = false;
    });
  }

  onChange(id) {
    this.selectedFileId = id;
    if (this.pollSubscription) {
      this.pollSubscription.unsubscribe();
    }
    if (this.chartPollSubscription) {
      this.chartPollSubscription.unsubscribe();
    }
    if (id && id !== '') {
      this.loading = true;
      this.pollSubscription = this.fileAuditService.pollForFileAudits(id, 2000)
      .subscribe(audits => {
        this.audits = audits;
        this.loading = false;
      });
      this.chartPollSubscription = this.fileAuditService.pollForFileAuditChartData(id, 3000)
      .subscribe(data => this.generateData(data));
    }
  }

  generateData(data) {
    this.chartData = [];
    if (data.length > 0) {
      delete data[0].filename;
      delete data[0].id;
      this.chartData = Object.keys(data[0]).map(key => [key, data[0][key]]);
      this.chartData.push(['total', data[0].processed + data[0].error]);
    }
  }
}
