import { Directive, forwardRef } from '@angular/core';
import { Validator, NG_VALIDATORS, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { BrValidator } from '../locallib/br-validator.class';


@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ngBrToolsCpfValidator][ngModel],[ngBrToolsCpfValidator][formControl],[ngBrToolsCpfValidator][formControlName]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CPFValidator),
      multi: true
    }
  ]
})

// tslint:disable-next-line:directive-class-suffix
export class CPFValidator implements Validator {

  validate(c: AbstractControl): ValidationErrors {
    if (!(c.value && c.value.length > 0)) {
      // Nenhum valor passado, se o campo for requerido deve-se usar
      // o validator.required, esse só valida o cpf
      return null;
    }
    // Limpando qualquer caracter de formatação, só importa os números
    const value = c.value.split('').filter(
      (char) => !isNaN(Number(char))
    ).join('');

    if (BrValidator.validaCpf(value)) {
      return null;
    }

    return {'cpf': true };
  }
}
