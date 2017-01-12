import { Component, OnInit, OnDestroy } from '@angular/core';
import { File, FileAudit } from './file';
import { FileAuditService } from './file-audit.service';
import { Configuration } from '../app.constants';

@Component({
  selector: 'file-audit',
  templateUrl: 'file-audit.component.html',
  providers: [FileAuditService, Configuration]
})

export class FileAuditComponent implements OnInit, OnDestroy {

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
    }
  }
}
