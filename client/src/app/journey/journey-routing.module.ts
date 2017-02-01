import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPermissionsGuard } from '../user-permissions.guard';
import { AddJourneyComponent } from './add-journey.component';
import { EditJourneyComponent } from './edit-journey.component';
import { JourneyResolver } from './journey.resolver';
import { EditJourneyStepsComponent } from './versions/steps/edit-journey-steps.component';
import { AddJourneyVersionComponent } from './versions/add-journey-version.component';
import { EditJourneyVersionComponent } from './versions/edit-journey-version.component';
import { AddJourneyVersionResolver } from './versions/add-journey-version.resolver';
import { EditJourneyVersionResolver } from './versions/edit-journey-version.resolver';
import { AddJourneyScheduleComponent } from './versions/schedules/add-journey-schedule.component';
import { EditJourneyScheduleComponent } from './versions/schedules/edit-journey-schedule.component';

import { ManageJourneysComponent } from './manage/manage-journeys.component';
import { NoJourneysComponent } from './manage/no-journeys.component';
import { JourneysComponent } from './manage/journeys.component';
import { NoJourneyVersionsComponent } from './manage/no-journey-versions.component';
import { JourneyVersionsComponent } from './manage/journey-versions.component';

import { ManageJourneyGuard } from './manage/manage-journey.guard';
import { ManageJourneyVersionGuard } from './manage/manage-journey-version.guard';


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
    path: 'edit/:id',
    component: EditJourneyComponent,
    data: {
      permission: 'EDIT_JOURNEYS'
    },
    resolve: {
      journey: JourneyResolver
    }
  },
  {
    canActivate: [UserPermissionsGuard],
    path: 'versions/:id/steps',
    component: EditJourneyStepsComponent,
    data: {
      permission: 'EDIT_JOURNEYS'
    }
  },
  {
    canActivate: [UserPermissionsGuard],
    path: 'versions/:id/schedules',
    component: EditJourneyScheduleComponent,
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
    path: 'versions/:id/schedules/add',
    component: AddJourneyScheduleComponent,
    data: {
      permission: 'EDIT_JOURNEYS'
    }
  },
  {
    canActivate: [UserPermissionsGuard],
    path: 'versions/:id/schedules/:scheduleId',
    component: EditJourneyScheduleComponent,
    data: {
      permission: 'EDIT_JOURNEYS'
    }
  },
  {
    canActivate: [UserPermissionsGuard],
    component: ManageJourneysComponent,
    path: '',
    data: {
      permission: 'VIEW_JOURNEYS'
    },
    children: [
      {
        canActivate: [ManageJourneyGuard],
        path: '',
        component: NoJourneysComponent
      },
      {
        path: ':id',
        component: JourneysComponent,
        children: [
          {
            canActivate: [ManageJourneyVersionGuard],
            path: '',
            component: NoJourneyVersionsComponent
          },
          {
            path: 'version/:versionId',
            component: JourneyVersionsComponent
          },
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JourneyRoutingModule { }

export const routedComponents = [
  AddJourneyComponent,
  EditJourneyComponent,
  JourneysComponent,
  NoJourneysComponent,
  NoJourneyVersionsComponent,
  JourneyVersionsComponent,
  ManageJourneysComponent,
  EditJourneyStepsComponent,
  AddJourneyVersionComponent,
  EditJourneyVersionComponent,
  AddJourneyScheduleComponent,
  EditJourneyScheduleComponent
];
