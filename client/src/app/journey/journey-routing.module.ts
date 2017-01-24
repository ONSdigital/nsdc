import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPermissionsGuard } from '../user-permissions.guard';
import { JourneyListComponent } from './journey.component';
import { AddJourneyComponent } from './add/add-journey.component';
import { EditJourneyComponent } from './edit/edit-journey.component';
import { EditJourneyResolver } from './edit/edit-journey.resolver';
import { JourneyStepsComponent } from './versions/steps/journey.steps.component';
import { AddJourneyVersionComponent } from './versions/add/add-journey-version.component';
import { EditJourneyVersionComponent } from './versions/edit/edit-journey-version.component';
import { AddJourneyVersionResolver } from './versions/add/add-journey-version.resolver';
import { EditJourneyVersionResolver } from './versions/edit/edit-journey-version.resolver';

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
    path: ':id',
    component: EditJourneyComponent,
    data: {
      permission: 'EDIT_JOURNEYS'
    },
    resolve: {
      journey: EditJourneyResolver
    }
  },
  {
    canActivate: [UserPermissionsGuard],
    path: 'versions/:id/steps',
    component: JourneyStepsComponent,
    data: {
      permission: 'EDIT_JOURNEYS'
    }
  },
  {
    canActivate: [UserPermissionsGuard],
    path: ':id/add-version',
    component: AddJourneyVersionComponent,
    data: {
      permission: 'ADD_JOURNEYS'
    },
    resolve: {
      journey: AddJourneyVersionResolver
    }
  },
  {
    canActivate: [UserPermissionsGuard],
    path: ':id/edit-version/:vid',
    component: EditJourneyVersionComponent,
    data: {
      permission: 'EDIT_JOURNEYS'
    },
    resolve: {
      journey: AddJourneyVersionResolver,
      journeyVersion: EditJourneyVersionResolver
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
  EditJourneyComponent,
  JourneyListComponent,
  JourneyStepsComponent,
  AddJourneyVersionComponent,
  EditJourneyVersionComponent
];
