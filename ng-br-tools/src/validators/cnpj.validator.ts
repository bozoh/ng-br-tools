import { Directive, forwardRef } from '@angular/core';
import { Validator, NG_VALIDATORS, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { BrValidator } from '../locallib/br-validator.class';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ngBrToolsCnpjValidator][ngModel],[ngBrToolsCnpjValidator][formControl],[ngBrToolsCnpjValidator][formControlName]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CNPJValidator),
      multi: true
    }
  ]
})

// tslint:disable-next-line:directive-class-suffix
export class CNPJValidator implements Validator {

  validate(c: AbstractControl): ValidationErrors {
    if (!(c.value && c.value.length > 0)) {
      return null;
    }
    // Limpando qualquer caracter de formatação, só importa os números
    const value = c.value.split('').filter(
      (char) => !isNaN(Number(char))).join('');

    if (BrValidator.validaCnpj(value)) {
      return null;
    }
    return {'cnpj': true };
  }
}
