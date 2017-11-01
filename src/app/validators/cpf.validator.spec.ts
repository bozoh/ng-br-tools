import { TestBed, async } from '@angular/core/testing';
import { CPFValidator } from './cpf.validator';
import { FormControl } from '@angular/forms';
import { BrValidator } from '../locallib/br-validator.class';

describe('Validator: CPFValidator', () => {
  // tslint:disable-next-line:prefer-const
  let cpfValidatorDirective: CPFValidator;
  const invalidResponse = {
    CPFValidator: {
      valid: false
    }
  };

  beforeEach(() => {
    cpfValidatorDirective = new CPFValidator();
  });

  it('Verificando se chama o método validaCpf da classe BrValidator', () => {
    spyOn(BrValidator, 'validaCpf');
    const cpf = '43982637996';
    cpfValidatorDirective.validate(new FormControl(cpf));

    expect(BrValidator.validaCpf).toHaveBeenCalledWith(cpf);
  });

  it('Verificando cpfs válidos com formatação', () => {
    const cpfs: FormControl[] = [
      new FormControl('439.826.379-96'),
      new FormControl('582765324-11'),
      new FormControl('582.765324-11'),
      new FormControl('582765.324-11'),
      new FormControl('582.765.32411')
    ];

    expect(cpfValidatorDirective.validate(cpfs[0])).toBe(null);
    expect(cpfValidatorDirective.validate(cpfs[1])).toBe(null);
    expect(cpfValidatorDirective.validate(cpfs[2])).toBe(null);
    expect(cpfValidatorDirective.validate(cpfs[3])).toBe(null);
    expect(cpfValidatorDirective.validate(cpfs[4])).toBe(null);
  });

  it('Verificando cpfs inválidos com formatação', () => {

    const cpfs: FormControl[] = [];
    cpfs.push(new FormControl('183.816.204-51'));
    cpfs.push(new FormControl('083836204-36'));
    cpfs.push(new FormControl('144.216204-73'));
    cpfs.push(new FormControl('993816.20456'));
    cpfs.push(new FormControl('133.816.20456'));
    // Essa sequência de cpf são válidos
    // se o script só aplicar o algoritimo de verificação
    // do cpf (CPF com todos os números iguais)
    cpfs.push(new FormControl('000.000.000-00'));
    cpfs.push(new FormControl('111,111-111.11'));
    cpfs.push(new FormControl('222-2.222222.2'));
    cpfs.push(new FormControl('.3333-3333333.'));
    cpfs.push(new FormControl('44444/444444'));
    cpfs.push(new FormControl('555.555.555/55'));
    cpfs.push(new FormControl('666.666.666-66'));
    cpfs.push(new FormControl('777.777.777-77'));
    cpfs.push(new FormControl('888.888.888-88'));
    cpfs.push(new FormControl('999.999.999-99'));

    expect(cpfValidatorDirective.validate(cpfs[0])).toEqual(invalidResponse);
    expect(cpfValidatorDirective.validate(cpfs[1])).toEqual(invalidResponse);
    expect(cpfValidatorDirective.validate(cpfs[2])).toEqual(invalidResponse);
    expect(cpfValidatorDirective.validate(cpfs[3])).toEqual(invalidResponse);
    expect(cpfValidatorDirective.validate(cpfs[4])).toEqual(invalidResponse);
    expect(cpfValidatorDirective.validate(cpfs[5])).toEqual(invalidResponse);
    expect(cpfValidatorDirective.validate(cpfs[6])).toEqual(invalidResponse);
    expect(cpfValidatorDirective.validate(cpfs[7])).toEqual(invalidResponse);
    expect(cpfValidatorDirective.validate(cpfs[8])).toEqual(invalidResponse);
    expect(cpfValidatorDirective.validate(cpfs[9])).toEqual(invalidResponse);
    expect(cpfValidatorDirective.validate(cpfs[10])).toEqual(invalidResponse);
    expect(cpfValidatorDirective.validate(cpfs[11])).toEqual(invalidResponse);
    expect(cpfValidatorDirective.validate(cpfs[12])).toEqual(invalidResponse);
    expect(cpfValidatorDirective.validate(cpfs[13])).toEqual(invalidResponse);
  });
});
