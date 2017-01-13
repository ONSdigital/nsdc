import { platformBrowser } from '@angular/platform-browser';
import { decorateModuleRef } from './app/environment';
import { AppModuleNgFactory } from '../compiled/src/app/app.module.ngfactory';
import './rxjs-extensions';

export function main(): Promise<any> {
  return platformBrowser()
    .bootstrapModuleFactory(AppModuleNgFactory)
    .then(decorateModuleRef)
    .catch(err => console.error(err));
}

export function bootstrapDomReady() {
  document.addEventListener('DOMContentLoaded', main);
}

bootstrapDomReady();
