import { Component, Input, OnInit } from '@angular/core';
import { Tab } from './tab';
import { TabsComponent } from './tabs.component';

@Component({
  selector: 'nsdc-tab',
  templateUrl: 'tab.component.html'
})
export class TabComponent implements OnInit, Tab {
  @Input()
  title;

  @Input()
  selected;

  constructor(
    private tabsComponent: TabsComponent
  ) { }

  ngOnInit() {
    this.tabsComponent.addTab(this);
  }
}
