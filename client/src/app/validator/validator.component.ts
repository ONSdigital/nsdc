import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidatorService } from './validator.service';

@Component({
  selector: 'nsdc-validator',
  templateUrl: 'validator.component.html'
})
export class ValidatorComponent {
  @Input()
  control: FormControl;

  constructor() { }

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName)
        && this.control.touched) {
        return ValidatorService.getValidatorErrorMessage(propertyName);
      }
    }

    return null;
  }
}