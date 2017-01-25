import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Role } from '../role';
import { JourneyService } from '../../journey/journey.service';
import { RoleJourneyVersion } from './role-journey-version';

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
  key = 'id';
  display = 'displayName';


  constructor(
    private route: ActivatedRoute,
    private journeyService: JourneyService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      const role = data['role'] as Role;
      const allRoleJourneyVersions: RoleJourneyVersion[] = [];

      this.journeyService.getAllJourneyVersions()
      .subscribe(journeyVersions => {
        journeyVersions.forEach(journeyVersion => {
          this.journeyService.getJourneyById(journeyVersion.journey_id)
          .then(journey => {
            allRoleJourneyVersions.push(
              new RoleJourneyVersion(
                journeyVersion.id,
                journeyVersion.version_number,
                journey.name,
                journey.name + " (v" + journeyVersion.version_number + ")"
              )
            );
          })
        })
      });
      this.journeyService.getVersionsByRole(role.id)
        .subscribe(versions => {
          this.originalVersionIds = versions.map(version => version.id);
          this.selectedRoleJourneyVersions = allRoleJourneyVersions.map(item =>
            versions.filter(version => version.id === item.version_id)
          );
        });

      this.role = role;
      this.allRoleJourneyVersions = allRoleJourneyVersions;
    });
  }
}
