import { Directive, forwardRef } from '@angular/core';
import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[cpfValidator][ngModel],[cpfValidator][formControl],[cpfValidator][formControlName]',
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

      if (this.isValid(value)) {
        return null;
      }
    }

    return {
      CPFValidator: {
        valid: false
      }
    };
  }

  private isValid(cpf: string): boolean {
    let digito1 = '';
    let digito2 = '';
    let cpfAux = '';

    if (cpf == null) {
        return false;
    }

    if (cpf.length !== 11) {
        return false;
    }
    if ((cpf === '00000000000') ||
        (cpf === '11111111111') ||
        (cpf === '22222222222') ||
        (cpf === '33333333333') ||
        (cpf === '44444444444') ||
        (cpf === '55555555555') ||
        (cpf === '66666666666') ||
        (cpf === '77777777777') ||
        (cpf === '88888888888') ||
        (cpf === '99999999999')) {
        return false;
    }

    // Pega os 9 primeros dígitos
    cpfAux = cpf.substring(0, 9);

    digito1 = this.calculaDigitoVerificador(cpfAux);
    digito2 = this.calculaDigitoVerificador(cpfAux + digito1);

    return (cpf === cpfAux + digito1 + digito2);
  }

  private calculaDigitoVerificador(seq: string): string {
    let digito: number;
    let j = seq.length + 1;
    let somatorio = 0;

    // Faz o somatório dos digitos * posição inversa
    for (let i = 0; i < seq.length; i++) {
      somatorio += j * Number(seq.charAt(i));
      j--;
    }
    // Divide o somatório por 11 e obtém o resto
    const resto = somatorio % 11;

    // Se o resto for menor que 2, então o dígito é zero
    // sentão  o ditigo vai ser igual ao 11 - resto
    // Então se o 11 - resto > 9  o digito = 0 (que dá no mesmo)
    digito = 11 - resto;
    if (digito > 9) {
        digito = 0;
    }
    return digito.toString();
    }
}
