import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DualListComponent }   from './dual-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [DualListComponent],
  declarations: [DualListComponent],
  providers: [],
})
export class DualListModule { }
