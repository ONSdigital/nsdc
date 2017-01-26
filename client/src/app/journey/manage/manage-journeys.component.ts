import { Component } from '@angular/core';

@Component({
  selector: 'nsdc-manage-journeys',
  template: `
  <h2>Journeys</h2>
  <div class="manage">
    <button
      class="btn btn-primary right"
      [routerLink]="['/journeys/add']"
    >
      Add Journey
    </button>
  </div>
  <br/>
  <router-outlet></router-outlet>
  `
})
export class ManageJourneysComponent { }
