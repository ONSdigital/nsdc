import { Component, OnInit, OnDestroy } from '@angular/core';
import { File } from './file';
import { FileAudit } from './file-audit';
import { FileAuditService } from './file-audit.service';
import { Configuration } from '../app.constants';

@Component({
  selector: 'file-audit',
  templateUrl: 'file-audit.component.html',
  providers: [FileAuditService, Configuration]
})

export class FileAuditComponent implements OnInit, OnDestroy {
  private chartData = [];
  public files: File[];
  public audits: FileAudit[];
  loading = false;
  dropdownLoading = false;
  selectedFileId;
  pollSubscription;

  constructor(private fileAuditService: FileAuditService ) {}

  ngOnInit(): void {
    this.loading = true;
    this.dropdownLoading = true;
    this.fileAuditService.getFiles()
    .then(files => this.files = files)
    .then(() => {
      this.loading = false;
      this.dropdownLoading = false;
    });
    // this.generateData(1);
  }

  ngOnDestroy() {
    if (this.pollSubscription) {
      this.pollSubscription.unsubscribe();
    }
  }

  onChange(id) {
    this.selectedFileId = id;
    if (this.pollSubscription) {
      this.pollSubscription.unsubscribe();
    }
    if (id !== '') {
      this.loading = true;
      this.pollSubscription = this.fileAuditService.pollForFileAudits(id, 2000)
      .subscribe(audits => {
        this.audits = audits;
        this.loading = false;
      });

      this.fileAuditService.getFileAuditChartData(id)
        .then(data => this.generateData(data))
    }
  }

  generateData(data) {
    delete data[0].filename;
    this.chartData = Object.keys(data[0]).map(key => [key, data[0][key]]);
    this.chartData.push(['total', data[0].processed + data[0].error]);
  }
}
