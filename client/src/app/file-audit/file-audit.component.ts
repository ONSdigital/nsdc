import { Component, OnInit } from '@angular/core';
import { File, FileAudit } from './file';
import { FileAuditService } from './file-audit.service';
import { Configuration } from '../app.constants';

@Component({
  selector: 'file-audit',
  templateUrl: 'file-audit.component.html',
  providers: [FileAuditService, Configuration]
})

export class FileAuditComponent implements OnInit {

  public files: File[];
  public audits: FileAudit[];
  loading = false;
  dropdownLoading = false;
  selectedFileId;

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

  onChange(id) {
    this.selectedFileId = id;
    if (id !== '') {
      this.loading = true;
      this.fileAuditService.getFileAudits(id)
      .then(audits => this.audits = audits)
      .then(() => this.loading = false);
    }
  }
}
