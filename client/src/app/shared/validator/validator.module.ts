import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidatorComponent }  from './validator.component';
import { ValidatorService } from './validator.service';

@NgModule({
  imports: [CommonModule],
  exports: [ValidatorComponent],
  declarations: [ValidatorComponent]
})
export class ValidatorModule { }
