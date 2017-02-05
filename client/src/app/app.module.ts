import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { AppComponent }   from './app.component';
import { routing, routedComponents } from './app.routing';
import { LoginService } from './login/login.service';
import { UserPermissionsService } from './user-permissions.service';
import { UserPermissionsGuard } from './user-permissions.guard';
import { UserAccountService } from './user-account.service';
import { LoginGuard } from './login/login.guard';
import { IsLoggedInGuard } from './login/is-logged-in.guard';
import { Configuration } from './app.constants';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from './shared';
import '../styles/app.css';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    SharedModule
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    routedComponents
  ],
  providers: [
    UserAccountService,
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

  public hmrOnInit(store) {
    this.appRef.tick();
  }

  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    store.disposeOldHosts = createNewHosts(cmpLocation);
    removeNgStyles();
  }

  hmrAfterDestroy(store) {
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
