enum Documento {
  CPF,
  CNPJ
}

export class BrValidator {

  private documento: {
    tipo: Documento,
    numeroCompleto: string,
    numero: string,
    digito1: string,
    digito2: string
  };

  public static validaCpf(cpf: string): boolean {
    const brValidatorUtils = new BrValidator(cpf, Documento.CPF);
    return brValidatorUtils.isValid();
  }

  public static validaCnpj(cnpj: string): boolean {
    const brValidatorUtils = new BrValidator(cnpj, Documento.CNPJ);
    return brValidatorUtils.isValid();
  }

  private constructor(numero: string, tipo: Documento) {
    this.documento = {
      tipo: tipo,
      numeroCompleto: numero,
      numero: '',
      digito1: '',
      digito2: ''
    };
    if (!numero || numero.length === 0) {
      this.documento.numeroCompleto = '';
      return;
    }
    this.documento.numero = numero.substr(0, numero.length - 2);
    this.documento.digito1 = numero.substr(numero.length - 2, 1);
    this.documento.digito2 = numero.substr(numero.length - 1, 1);
  }

  public isValid(): boolean {
    switch (this.documento.tipo) {
      case Documento.CPF:
        return this.isValidCpf();
      case Documento.CNPJ:
        return this.isValidCnpj();
    }
  }

  private isValidCpf(): boolean {
    if (this.documento.numeroCompleto.length !== 11) {
      return false;
    }

    if (this.getInvalidsCpfs().has(this.documento.numeroCompleto)) {
      return false;
    }

    return this.documento.numeroCompleto ===
      (this.documento.numero + this.getDigitoVerificador());
  }

  private isValidCnpj(): boolean {
    if (this.documento.numeroCompleto.length !== 14) {
      return false;
    }

    if ( this.getInvalidsCnpjs().has(this.documento.numeroCompleto)) {
      return false;
    }

    return this.documento.numeroCompleto ===
      (this.documento.numero + this.getDigitoVerificador());
  }

  private getDigitoVerificador(): string {
    const digito1 = this.calculaDigitoVerificador(this.documento.numero);
    const digito2 = this.calculaDigitoVerificador(this.documento.numero + digito1);
    return digito1 + digito2;
  }

  private calculaDigitoVerificador(numero): string {
    let tblPesos = [];
    // Pegando a ordem inversa da tabela de pesos
    // junto com a ordem inversa so número, fica mais
    // simples o cálculo dos digitos verificadores
    switch (this.documento.tipo) {
      case Documento.CPF:
        tblPesos = this.getCpfTable().reverse();
      break;
      case Documento.CNPJ:
        tblPesos = this.getCnpjTable().reverse();
      break;
    }

    // Faz o somatório dos digitos * valor da posição tabela de pesos
    const somatorio = numero.split('').reverse().map((char, i) => {
      return Number(char) * tblPesos[i];
      }).reduce((sum, current) => sum + current);


    // Divide o somatório por 11 e obtém o resto
    const resto = somatorio % 11;

    // Se o resto for menor que 2, então o dígito é zero
    // senão o digito vai ser igual ao 11 - resto
    // Então se o 11 - resto > 9  o digito = 0 (que dá no mesmo)
    let digito = 11 - resto;
    if (digito > 9) {
        digito = 0;
    }
    return String(digito);
  }

  private getCpfTable(): number[] {
    return [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
  }

  private getCnpjTable(): number[] {
    return [6, 5, 4, 3, 2, 9, 8, 7, 6, 5 , 4, 3, 2];
  }

  private getInvalidsCpfs(): Set<string> {
    return new Set(['00000000000', '11111111111', '22222222222', '33333333333',
    '44444444444', '55555555555', '66666666666', '77777777777', '88888888888',
    '99999999999']);
  }

  private getInvalidsCnpjs(): Set<string> {
     return new Set([ '00000000000000', '11111111111111', '22222222222222', '33333333333333',
       '44444444444444', '55555555555555', '66666666666666', '77777777777777',
       '88888888888888', '99999999999999' ]);
  }
}

// class BrValidatotUtils {

//   constructor(private str: string) {}

//   isValid(): boolean {
//     return this.checkCanBeValid(this.str, 'cpf') ||
//       this.checkCanBeValid(this.str, 'cnpj');
//   }

//   calculaDigitoVerificador(str: string): string {
//     let tblPesos: number[] = [];
//     let digito: number;
//     let somatorio = 0;


//     // Definindo que tabela de pesos
//     // devo usar, cnpj ou cpf
//     if (str.length === 9) {
//       // CPF
//       tblPesos = [10, 9, 8, 7, 6, 5, 4, 3, 2];
//     } else if (str.length === 10 ) {
//       // CPF + primeiro digito verificador
//       tblPesos = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
//     } else if (str.length === 12) {
//       // CNPJ
//       tblPesos = [5, 4, 3, 2, 9, 8, 7, 6, 5 , 4, 3, 2];
//     } else if (str.length === 13) {
//       // CNPJ + primeiro dígito verificador
//       tblPesos = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5 , 4, 3, 2];
//     }

//     // Faz o somatório dos digitos * posição tabela de pesos
//     let i = 0;
//     for (const p of tblPesos) {
//       somatorio += p * Number(str.charAt(i));
//       i++;
//     }
//     // Divide o somatório por 11 e obtém o resto
//     const resto = somatorio % 11;

//     // Se o resto for menor que 2, então o dígito é zero
//     // sentão  o ditigo vai ser igual ao 11 - resto
//     // Então se o 11 - resto > 9  o digito = 0 (que dá no mesmo)
//     digito = 11 - resto;
//     if (digito > 9) {
//         digito = 0;
//     }

//     return digito.toString();
//     }


//   removeDigitosVerificador(): string {
//     return this.str.substring(0, this.str.length - 2);
//   }

//   private checkCanBeValid(value: string, opt: string): boolean {
//     if (value == null || value.length === 0) {
//       return false;
//     }
//     switch (opt) {
//       case 'cpf':
//         return this.canBeValidCpf(value);
//       case 'cnpj':
//         return this.canBeValidCnpj(value);
//     }
//     return false;
//   }

//   private canBeValidCpf(cpf: string): boolean {
//     if (cpf.length !== 11) {
//       return false;
//     }
//     if ((cpf === '00000000000') ||
//         (cpf === '11111111111') ||
//         (cpf === '22222222222') ||
//         (cpf === '33333333333') ||
//         (cpf === '44444444444') ||
//         (cpf === '55555555555') ||
//         (cpf === '66666666666') ||
//         (cpf === '77777777777') ||
//         (cpf === '88888888888') ||
//         (cpf === '99999999999')) {
//       return false;
//     }
//     return true;
//   }

//   private canBeValidCnpj(cnpj: string): boolean {
//     if (cnpj.length !== 14) {
//       return false;
//     }
//     if ( '00000000000000') ||
//          '11111111111111') ||
//          '22222222222222') ||
//          '33333333333333') ||
//          '44444444444444') ||
//          '55555555555555') ||
//          '66666666666666') ||
//          '77777777777777') ||
//          '88888888888888') ||
//          '99999999999999')) {
//       return false;
//     }
//     return true;
//   }


// }
