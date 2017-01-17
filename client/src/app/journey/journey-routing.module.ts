import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPermissionsGuard } from '../user-permissions.guard';
import { JourneyListComponent } from './journey.component';
import { AddJourneyComponent } from './add/add-journey.component';
import { EditJourneyComponent } from './edit/edit-journey.component';
import { EditJourneyResolver } from './edit/edit-journey.resolver';
import { JourneyStepsComponent } from './steps/journey.steps.component';

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
    path: ':id/steps',
    component: JourneyStepsComponent,
    data: {
      permission: 'EDIT_JOURNEYS'
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
  JourneyStepsComponent
];
