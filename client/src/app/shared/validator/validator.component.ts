import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidatorService } from './validator.service';

@Component({
  selector: 'nsdc-validator',
  template: `
    <nsdc-error-alert [errorMessages]="errorMessages">
    </nsdc-error-alert>
  `
})
export class ValidatorComponent {
  @Input()
  control: FormControl;

  constructor() { }

  public get errorMessages() {
    const messages = [];
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName)
        && this.control.touched) {
        messages.push(ValidatorService.getValidatorErrorMessage(propertyName));
      }
    }

    return messages;
  }
}
