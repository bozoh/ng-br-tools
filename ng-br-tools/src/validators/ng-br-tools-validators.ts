import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

import { CNPJValidator } from './cnpj.validator';
import { CPFValidator } from './cpf.validator';

export class NgBrToolsValidators {
  static cpfValidator(control: AbstractControl): ValidationErrors | null {
    const validator = new CPFValidator();
    return validator.validate(control);
  }

  static cnpjValidator(control: AbstractControl): ValidationErrors | null {
    const validator = new CNPJValidator();
    return validator.validate(control);
  }
}

