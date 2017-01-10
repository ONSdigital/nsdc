import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPermissionsGuard } from '../user-permissions.guard';
import { JourneyListComponent } from './journey.component';

const routes: Routes = [
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
  JourneyListComponent
];
