import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent }   from './app.component';
import { routing, routedComponents } from './app.routing';
import { LoginService } from './login/login.service';
import { UserPermissionsService } from './user-permissions.service';
import { UserPermissionsGuard } from './user-permissions.guard';
import { LoginGuard } from './login/login.guard';
import { IsLoggedInGuard } from './login/is-logged-in.guard';
import { Configuration } from './app.constants';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    routedComponents
  ],
  providers: [
    UserPermissionsService,
    UserPermissionsGuard,
    LoginService,
    LoginGuard,
    IsLoggedInGuard,
    Configuration
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    store.disposeOldHosts = createNewHosts(cmpLocation);
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
