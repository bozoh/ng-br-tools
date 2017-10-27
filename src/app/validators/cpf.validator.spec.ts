import { TestBed, async } from '@angular/core/testing';
import { CPFValidator } from './cpf.validator';
import { FormControl } from '@angular/forms';

describe('Directive: CPFValidator', () => {
  it('Criando uma instância', () => {
    const directive = new CPFValidator;
    expect(directive).toBeTruthy();
  });

  it ('Verificando cpfs sem formatação', () => {
    const invalidResponse = {
       CPFValidator: {
         valid: false
       }
    };

    const cpfs: FormControl[] = [
      new FormControl(),
      new FormControl(),
      new FormControl(),
      new FormControl(),
      new FormControl(),
    ];
    cpfs[0].setValue('43982637996');
    cpfs[1].setValue('58276532411');
    cpfs[2].setValue('08381620376');
    cpfs[3].setValue('18381620476');
    cpfs[4].setValue('00000000000');

    const directive = new CPFValidator;

    expect(directive.validate(cpfs[0])).toBe(null);
    expect(directive.validate(cpfs[1])).toBe(null);
    expect(directive.validate(cpfs[2])).toBe(null);
    expect(directive.validate(cpfs[3])).toEqual(invalidResponse);
    expect(directive.validate(cpfs[4])).toEqual(invalidResponse);
  });
});
