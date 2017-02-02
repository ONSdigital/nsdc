import { Component, EventEmitter, Output } from '@angular/core';
import { Tab } from './tab';

@Component({
  selector: 'nsdc-tabs',
  templateUrl: 'tabs.component.html'
})
export class TabsComponent {
  tabs: Tab[] = [];

  @Output()
  selected = new EventEmitter();

  addTab(tab: Tab) {
    if (!this.tabs.length) {
      tab.selected = true;
    }
    this.tabs.push(tab);
  }

  selectTab(event, tab: Tab) {
    event.stopPropagation();

    this.tabs.map(tab => tab.selected = false);
    tab.selected = true;
    this.selected.emit({ selected: tab });
  }
}