import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DualListComponent } from './dual-list.component';
import { DualListContainerComponent } from './dual-list-container.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [DualListComponent, DualListContainerComponent],
  declarations: [DualListComponent, DualListContainerComponent],
  providers: [],
})
export class DualListModule { }
