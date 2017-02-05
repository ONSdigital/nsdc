export class ValidatorService {
  static getValidatorErrorMessage(validatorName: string) {
    const config = {
      required: 'This field is required',
      invalidEmailAddress: 'Invalid email address'
    };

    return config[validatorName];
  }

  static emailValidator(control) {
    if (control.value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,63}$/i)) {
      return null;
    } else {
      return { invalidEmailAddress: true };
    }
  }
}
