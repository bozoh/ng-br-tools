export class BrValidator {

  public static validaCpf(cpf: string): boolean {
    let cpfAux = '';
    let digito1 = '';
    let digito2 = '';
    const brValidatorUtils = new BrValidatotUtils(cpf);

    if (!brValidatorUtils.isValid()) {
      return false;
    }
    cpfAux = brValidatorUtils.removeDigitosVerificador();
    digito1 = brValidatorUtils.calculaDigitoVerificador(cpfAux);
    digito2 = brValidatorUtils.calculaDigitoVerificador(cpfAux + digito1);
    return cpf === cpfAux + digito1 + digito2;
  }

  public static validaCnpj(cnpj: string): boolean {
    let cnpjAux = '';
    let digito1 = '';
    let digito2 = '';

    const brValidatorUtils = new BrValidatotUtils(cnpj);
    if (!brValidatorUtils.isValid()) {
      return false;
    }
    cnpjAux = brValidatorUtils.removeDigitosVerificador();
    digito1 = brValidatorUtils.calculaDigitoVerificador(cnpjAux);
    digito2 = brValidatorUtils.calculaDigitoVerificador(cnpjAux + digito1);
    return cnpj === cnpjAux + digito1 + digito2;

  }
}

class BrValidatotUtils {

  constructor(private str: string) {}

  isValid(): boolean {
    return this.checkCanBeValid(this.str, 'cpf') ||
      this.checkCanBeValid(this.str, 'cnpj');
  }

  calculaDigitoVerificador(str: string): string {
    let tblPesos: number[] = [];
    let digito: number;
    let somatorio = 0;


    // Definindo que tabela de pesos
    // devo usar, cnpj ou cpf
    if (str.length === 9) {
      // CPF
      tblPesos = [10, 9, 8, 7, 6, 5, 4, 3, 2];
    } else if (str.length === 10 ) {
      // CPF + primeiro digito verificador
      tblPesos = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
    } else if (str.length === 12) {
      // CNPJ
      tblPesos = [5, 4, 3, 2, 9, 8, 7, 6, 5 , 4, 3, 2];
    } else if (str.length === 13) {
      // CNPJ + primeiro dígito verificador
      tblPesos = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5 , 4, 3, 2];
    }

    // Faz o somatório dos digitos * posição tabela de pesos
    let i = 0;
    for (const p of tblPesos) {
      somatorio += p * Number(str.charAt(i));
      i++;
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


  removeDigitosVerificador(): string {
    return this.str.substring(0, this.str.length - 2);
  }

  private checkCanBeValid(value: string, opt: string): boolean {
    if (value == null || value.length === 0) {
      return false;
    }
    switch (opt) {
      case 'cpf':
        return this.canBeValidCpf(value);
      case 'cnpj':
        return this.canBeValidCnpj(value);
    }
    return false;
  }

  private canBeValidCpf(cpf: string): boolean {
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
    return true;
  }

  private canBeValidCnpj(cnpj: string): boolean {
    if (cnpj.length !== 14) {
      return false;
    }
    if ((cnpj === '00000000000000') ||
        (cnpj === '11111111111111') ||
        (cnpj === '22222222222222') ||
        (cnpj === '33333333333333') ||
        (cnpj === '44444444444444') ||
        (cnpj === '55555555555555') ||
        (cnpj === '66666666666666') ||
        (cnpj === '77777777777777') ||
        (cnpj === '88888888888888') ||
        (cnpj === '99999999999999')) {
      return false;
    }
    return true;
  }


}
