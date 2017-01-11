import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent }   from './app.component';
import { routing, routedComponents } from './app.routing';
import { LoginService } from './login/login.service';
import { UserPermissionsService } from './user-permissions.service';
import { UserPermissionsGuard } from './user-permissions.guard';
import { LoginGuard } from './login/login.guard';
import { IsLoggedInGuard } from './login/is-logged-in.guard';
import { Configuration } from './app.constants';
import { NavbarComponent } from './navbar/navbar.component';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
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
