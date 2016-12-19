import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { RouterModule }      from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent }   from './app.component';
import { RoleListComponent } from './role/role-list.component';
import { RoleComponent } from './role/role.component';
import { routing, routedComponents } from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    ReactiveFormsModule
  ],
  declarations: [ AppComponent, RoleListComponent, RoleComponent, routedComponents ],
  bootstrap: [ AppComponent ]
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
