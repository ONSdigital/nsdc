import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../role';
import { RoleService } from '../role.service';
import { JourneyService } from '../../journey/journey.service';
import { RoleJourneyVersion } from './role-journey-version';
import { JourneyVersion } from '../../journey/versions/journey-version';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'role-journey-versions',
  templateUrl : './role-journey-versions.component.html'
})
export class RoleJourneyVersionsComponent implements OnInit {
  role: Role;
  allRoleJourneyVersions: RoleJourneyVersion[] = [];
  selectedRoleJourneyVersions: RoleJourneyVersion[] = [];
  originalVersionIds: number[];
  keepSorted: boolean = true;
  key = 'version_id';
  display = 'displayName';
  loading = false;
  submitPending = false;
  submitFailed = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private journeyService: JourneyService,
    private roleService: RoleService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.route.data.subscribe(data => {
      const role = data['role'] as Role;
      const allRoleJourneyVersions: RoleJourneyVersion[] = [];

      this.journeyService.getAllJourneyVersions()
      .mergeMap(journeyVersions => {
        const journeyRequests = journeyVersions
        .map(journeyVersion => {
          return this.journeyService
          .getJourneyById(journeyVersion.journey_id)
          .then(journey => {
            return new RoleJourneyVersion(
              journeyVersion.id,
              journeyVersion.version_number,
              journey.name,
              journey.name + ' (v' + journeyVersion.version_number + ')'
            );
          });
        });
        return Observable.forkJoin(journeyRequests);
      })
      .subscribe((roleJourneyVersions: RoleJourneyVersion[]) => {
        this.role = role;
        this.allRoleJourneyVersions = roleJourneyVersions;
        this.journeyService.getVersionsByRole(role.id)
        .subscribe((versions: JourneyVersion[]) => {
          const originalVersionIds = versions.map(version => version.id);

          this.selectedRoleJourneyVersions = roleJourneyVersions
          .filter(item => {
            return originalVersionIds.includes(item.version_id);
          });
          this.loading = false;
        });
      });
    });
  }

  saveUpdatedRoleJourneyVersions() {
    this.submitPending = true;
    this.submitFailed = false;
    const selectedJourneyVersionIds = this.selectedRoleJourneyVersions
    .map(roleJourneyVersion => roleJourneyVersion.version_id);

    this.roleService.updateRoleJourneyVersions(this.role.id, selectedJourneyVersionIds)
    .subscribe(
      () => {
        this.submitPending = false;
        this.router.navigate(['/roles']);
      },
      error => {
        this.submitPending = false;
        this.submitFailed = true;
      }
    );
  }

  cancel() {
    this.router.navigate(['/roles']);
  }
}
