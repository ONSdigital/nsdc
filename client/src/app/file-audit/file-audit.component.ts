import { Component, OnInit, OnDestroy } from '@angular/core';
import { File } from './file';
import { FileAudit } from './file-audit';
import { Journey } from '../journey/journey';
import { FileAuditService } from './file-audit.service';
import { JourneyService } from '../journey/journey.service';
import { Configuration } from '../app.constants';

@Component({
  selector: 'file-audit',
  templateUrl: 'file-audit.component.html',
  providers: [FileAuditService, Configuration]
})

export class FileAuditComponent implements OnInit, OnDestroy {

  public files: File[];
  public journeys: Journey[];
  public audits: FileAudit[];
  loading = false;
  journeyDropdownLoading = false;
  fileDropdownLoading = false;
  selectedFileId;
  selectedJourneyId;
  pollSubscription;

  constructor(
    private fileAuditService: FileAuditService,
    private journeyService: JourneyService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.journeyDropdownLoading = true;
    this.journeyService.getJourneys()
    .then(journeys => this.journeys = journeys)
    .then(() => {
      this.loading = false;
      this.journeyDropdownLoading = false;
    });
  }

  ngOnDestroy() {
    if (this.pollSubscription) {
      this.pollSubscription.unsubscribe();
    }
  }

  onJourneySelectChange(id) {
    this.selectedJourneyId = id;
    this.selectedFileId = null;
    if (id !== '') {
      this.loading = true;
      this.fileDropdownLoading = true;
      this.fileAuditService.getFilesByJourney(id)
      .then((files) => this.files = files)
      .then(() => {
        this.loading = false;
        this.fileDropdownLoading = false;
      });
    }
  }

  onFileSelectChange(id) {
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
