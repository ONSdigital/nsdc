import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JourneyService } from '../journey.service';
import { Journey } from '../journey';
import { JourneyVersion } from '../versions/journey-version';

@Component({
  selector: 'nsdc-journey-versions',
  templateUrl: 'journey-versions.component.html'
})
export class JourneyVersionsComponent implements OnInit {
  versions: JourneyVersion[];
  selectedJourneyId: number;
  selectedVersionId: number;
  loading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private journeyService: JourneyService
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      this.loading = true;
      const journeyId = Number(params['id']);
      this.selectedJourneyId = journeyId;
      this.journeyService.getJourneyVersions(journeyId)
      .then(journeyVersions => {
        this.versions = journeyVersions;
        this.loading = false;
      });
    });
    this.route.params.subscribe(params => {
      this.selectedVersionId = Number(params['versionId']);
    });
  }

  onSelectJourneyVersion(versionId) {
    this.selectedVersionId = versionId;
    this.router.navigate(['journeys', this.selectedJourneyId, 'version', versionId]);
  }

  onDeleteClicked(versionId) {
    this.journeyService.deleteJourneyVersion(versionId)
      .subscribe(() => {
        this.journeyService.getJourneyVersions(this.selectedJourneyId)
          .then(versions => this.versions = versions);
      });
  }

  onEditClicked(event, versionId) {
    event.stopPropagation();
    this.router.navigate(['/journeys', this.selectedJourneyId, 'edit-version', versionId]);
  }
}
