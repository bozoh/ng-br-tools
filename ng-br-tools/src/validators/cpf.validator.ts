import { Directive, forwardRef } from '@angular/core';
import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms';
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

  validate(c: FormControl): { [key: string]: any } {
    if (c.value && c.value.length > 0) {
      const regex = /\.|-/gi;
      const value = c.value.replace(regex, '');

      if (BrValidator.validaCpf(value)) {
        return null;
      }
    }

    return {
      CPFValidator: {
        valid: false
      }
    };
  }
}
