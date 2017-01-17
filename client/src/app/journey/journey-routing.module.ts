import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPermissionsGuard } from '../user-permissions.guard';
import { JourneyListComponent } from './journey.component';
import { AddJourneyComponent } from './add/add-journey.component';

const routes: Routes = [
  {
    canActivate: [UserPermissionsGuard],
    path: 'add',
    component: AddJourneyComponent,
    data: {
      permission: 'ADD_JOURNEYS'
    }
  },
  {
    canActivate: [UserPermissionsGuard],
    path: '',
    component: JourneyListComponent,
    data: {
      permission: 'VIEW_JOURNEYS'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JourneyRoutingModule { }

export const routedComponents = [
  AddJourneyComponent,
  JourneyListComponent
];
