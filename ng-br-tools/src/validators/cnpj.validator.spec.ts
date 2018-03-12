import { TestBed, async } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { CNPJValidator } from './cnpj.validator';
import { BrValidator } from '../locallib/br-validator.class';

describe('Validators: (ngBrToolsCnpjValidator)', () => {
  // tslint:disable-next-line:prefer-const
  let cnpjValidatorDirective: CNPJValidator;
  const invalidResponse = {
    CNPJValidator: {
      valid: false
    }
  };

  beforeEach(() => {
    cnpjValidatorDirective = new CNPJValidator();
  });

  it('Verificando se chama o método validaCnpj da classe BrValidator', () => {
    spyOn(BrValidator, 'validaCnpj');
    const cnpj = '43982637996121';
    cnpjValidatorDirective.validate(new FormControl(cnpj));

    expect(BrValidator.validaCnpj).toHaveBeenCalledWith(cnpj);
  });

  it('Verificando cnpjs válidos com formatação', () => {
    const cnpjs: FormControl[] = [
      new FormControl('64.346.123/0001-61'),
      new FormControl('87665.148/0001-23'),
      new FormControl('24.737943/0001-60'),
      new FormControl('17.104.3060001-90'),
      new FormControl('42.534.047/000185')
    ];

    expect(cnpjValidatorDirective.validate(cnpjs[0])).toBe(null);
    expect(cnpjValidatorDirective.validate(cnpjs[1])).toBe(null);
    expect(cnpjValidatorDirective.validate(cnpjs[2])).toBe(null);
    expect(cnpjValidatorDirective.validate(cnpjs[3])).toBe(null);
    expect(cnpjValidatorDirective.validate(cnpjs[4])).toBe(null);
  });

  it('Verificando cnpjs inválidos com formatação', () => {

    const cnpjs: FormControl[] = [];
    cnpjs.push(new FormControl('18.381.620/1234-51'));
    cnpjs.push(new FormControl('183816201234-51'));
    cnpjs.push(new FormControl('18.381620/1234-51'));
    cnpjs.push(new FormControl('18381.620/1234-51'));
    cnpjs.push(new FormControl('18.381.620123451'));
    // Essa sequência de cnpj são válidos
    // se o script só aplicar o algoritimo de verificação
    // do cnpj (CPF com todos os números iguais)
    cnpjs.push(new FormControl('00.000.000/0000-00'));
    cnpjs.push(new FormControl('11.111.111/1111-11'));
    cnpjs.push(new FormControl('22.222.222/2222-22'));
    cnpjs.push(new FormControl('33.333.333/3333-33'));
    cnpjs.push(new FormControl('44.444.444/4444-44'));
    cnpjs.push(new FormControl('55.555.555/5555-55'));
    cnpjs.push(new FormControl('66.666.666/6666-66'));
    cnpjs.push(new FormControl('77.777.777/7777-77'));
    cnpjs.push(new FormControl('88.888.888/8888-88'));
    cnpjs.push(new FormControl('99.999.999/9999-99'));

    expect(cnpjValidatorDirective.validate(cnpjs[0])).toEqual(invalidResponse);
    expect(cnpjValidatorDirective.validate(cnpjs[1])).toEqual(invalidResponse);
    expect(cnpjValidatorDirective.validate(cnpjs[2])).toEqual(invalidResponse);
    expect(cnpjValidatorDirective.validate(cnpjs[3])).toEqual(invalidResponse);
    expect(cnpjValidatorDirective.validate(cnpjs[4])).toEqual(invalidResponse);
    expect(cnpjValidatorDirective.validate(cnpjs[5])).toEqual(invalidResponse);
    expect(cnpjValidatorDirective.validate(cnpjs[6])).toEqual(invalidResponse);
    expect(cnpjValidatorDirective.validate(cnpjs[7])).toEqual(invalidResponse);
    expect(cnpjValidatorDirective.validate(cnpjs[8])).toEqual(invalidResponse);
    expect(cnpjValidatorDirective.validate(cnpjs[9])).toEqual(invalidResponse);
    expect(cnpjValidatorDirective.validate(cnpjs[10])).toEqual(invalidResponse);
    expect(cnpjValidatorDirective.validate(cnpjs[11])).toEqual(invalidResponse);
    expect(cnpjValidatorDirective.validate(cnpjs[12])).toEqual(invalidResponse);
    expect(cnpjValidatorDirective.validate(cnpjs[13])).toEqual(invalidResponse);
  });
});
