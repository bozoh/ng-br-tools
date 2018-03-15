import { TestBed, async } from '@angular/core/testing';
import { BrValidator } from './br-validator.class';

describe('Local lib: BrValidator => validaCpf', () => {
  // tslint:disable-next-line:prefer-const

  it('Verificando se invalida cpfs com mais ou menos de 11 números', () => {
    const cpfs: string[] = [];
    cpfs.push('00000000000000');
    cpfs.push('0');
    cpfs.push('');
    cpfs.push(null);

    expect(BrValidator.validaCpf(cpfs[0])).toBeFalsy();
    expect(BrValidator.validaCpf(cpfs[1])).toBeFalsy();
    expect(BrValidator.validaCpf(cpfs[2])).toBeFalsy();
    expect(BrValidator.validaCpf(cpfs[3])).toBeFalsy();
  });

  it('Verificando se só aceita cpfs só com números', () => {
    const cpfs: string[] = [];
    cpfs.push('1A381620451');
    cpfs.push('083d3620436');
    cpfs.push('14s421W62f4');

    expect(BrValidator.validaCpf(cpfs[0])).toBeFalsy();
    expect(BrValidator.validaCpf(cpfs[1])).toBeFalsy();
    expect(BrValidator.validaCpf(cpfs[2])).toBeFalsy();
  });

  it('Verificando cpfs válidos ', () => {
    const cpfs: string[] = [
      '43982637996',
      '58276532411',
      '08381620376'
    ];

    expect(BrValidator.validaCpf(cpfs[0])).toBeTruthy();
    expect(BrValidator.validaCpf(cpfs[1])).toBeTruthy();
    expect(BrValidator.validaCpf(cpfs[2])).toBeTruthy();
  });

  it('Verificando cpfs inválidos', () => {

    const cpfs: string[] = [];
    cpfs.push('18381620451');
    cpfs.push('08383620436');
    cpfs.push('14421620473');
    cpfs.push('99381620456');
    // Essa sequência de cpf são válidos
    // se o script só aplicar o algoritmo de verificação
    // do cpf (CPF com todos os números iguais)
    cpfs.push('00000000000');
    cpfs.push('11111111111');
    cpfs.push('22222222222');
    cpfs.push('33333333333');
    cpfs.push('44444444444');
    cpfs.push('55555555555');
    cpfs.push('66666666666');
    cpfs.push('77777777777');
    cpfs.push('88888888888');
    cpfs.push('99999999999');

    expect(BrValidator.validaCpf(cpfs[0])).toBeFalsy();
    expect(BrValidator.validaCpf(cpfs[1])).toBeFalsy();
    expect(BrValidator.validaCpf(cpfs[2])).toBeFalsy();
    expect(BrValidator.validaCpf(cpfs[3])).toBeFalsy();
    expect(BrValidator.validaCpf(cpfs[4])).toBeFalsy();
    expect(BrValidator.validaCpf(cpfs[5])).toBeFalsy();
    expect(BrValidator.validaCpf(cpfs[6])).toBeFalsy();
    expect(BrValidator.validaCpf(cpfs[7])).toBeFalsy();
    expect(BrValidator.validaCpf(cpfs[8])).toBeFalsy();
    expect(BrValidator.validaCpf(cpfs[9])).toBeFalsy();
    expect(BrValidator.validaCpf(cpfs[10])).toBeFalsy();
    expect(BrValidator.validaCpf(cpfs[11])).toBeFalsy();
    expect(BrValidator.validaCpf(cpfs[12])).toBeFalsy();
    expect(BrValidator.validaCpf(cpfs[13])).toBeFalsy();
  });
});

describe('Local lib: BrValidator => validaCnpj', () => {
  // tslint:disable-next-line:prefer-const

  it('Verificando se invalida cnpjs com mais ou menos de 11 números', () => {
    const cnpjs: string[] = [];
    cnpjs.push('00000000000000000000');
    cnpjs.push('0');
    cnpjs.push('');
    cnpjs.push(null);

    expect(BrValidator.validaCnpj(cnpjs[0])).toBeFalsy();
    expect(BrValidator.validaCnpj(cnpjs[1])).toBeFalsy();
    expect(BrValidator.validaCnpj(cnpjs[2])).toBeFalsy();
    expect(BrValidator.validaCnpj(cnpjs[3])).toBeFalsy();
  });

  it('Verificando se só aceita cnpjs só com números', () => {
    const cnpjs: string[] = [];
    cnpjs.push('1A381620451000');
    cnpjs.push('083d3620436000');
    cnpjs.push('14s421W62f4000');

    expect(BrValidator.validaCnpj(cnpjs[0])).toBeFalsy();
    expect(BrValidator.validaCnpj(cnpjs[1])).toBeFalsy();
    expect(BrValidator.validaCnpj(cnpjs[2])).toBeFalsy();
  });

  it('Verificando cnpjs válidos ', () => {
    const cnpjs: string[] = [
      '46432774000192',
      '73786626000149',
      '64346123000161'
    ];

    expect(BrValidator.validaCnpj(cnpjs[0])).toBeTruthy();
    expect(BrValidator.validaCnpj(cnpjs[1])).toBeTruthy();
    expect(BrValidator.validaCnpj(cnpjs[2])).toBeTruthy();
  });

  it('Verificando cnpjs inválidos', () => {

    const cnpjs: string[] = [];
    cnpjs.push('18381620451000');
    cnpjs.push('08383620436154');
    cnpjs.push('14421620473784');
    cnpjs.push('99381620456454');
    // Essa sequência de cpf são válidos
    // se o script só aplicar o algoritmo de verificação
    // do cpf (CPF com todos os números iguais)
    cnpjs.push('00000000000000');
    cnpjs.push('11111111111111');
    cnpjs.push('22222222222222');
    cnpjs.push('33333333333333');
    cnpjs.push('44444444444444');
    cnpjs.push('55555555555555');
    cnpjs.push('66666666666666');
    cnpjs.push('77777777777777');
    cnpjs.push('88888888888888');
    cnpjs.push('99999999999999');

    expect(BrValidator.validaCnpj(cnpjs[0])).toBeFalsy();
    expect(BrValidator.validaCnpj(cnpjs[1])).toBeFalsy();
    expect(BrValidator.validaCnpj(cnpjs[2])).toBeFalsy();
    expect(BrValidator.validaCnpj(cnpjs[3])).toBeFalsy();
    expect(BrValidator.validaCnpj(cnpjs[4])).toBeFalsy();
    expect(BrValidator.validaCnpj(cnpjs[5])).toBeFalsy();
    expect(BrValidator.validaCnpj(cnpjs[6])).toBeFalsy();
    expect(BrValidator.validaCnpj(cnpjs[7])).toBeFalsy();
    expect(BrValidator.validaCnpj(cnpjs[8])).toBeFalsy();
    expect(BrValidator.validaCnpj(cnpjs[9])).toBeFalsy();
    expect(BrValidator.validaCnpj(cnpjs[10])).toBeFalsy();
    expect(BrValidator.validaCnpj(cnpjs[11])).toBeFalsy();
    expect(BrValidator.validaCnpj(cnpjs[12])).toBeFalsy();
    expect(BrValidator.validaCnpj(cnpjs[13])).toBeFalsy();
  });
});
