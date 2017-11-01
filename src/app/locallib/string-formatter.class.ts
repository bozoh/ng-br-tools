export const CEP_MASK = '#####-###';
export const CNPJ_MASK = '##.###.###/####-##';
export const CPF_MASK = '###.###.###-##';

export class StringFormatter {

  public static maskedFormatter(input: string, mask: string): string {
    // Tranfomando a máscara em um array, mais fácil
    // para formatar o texto
    const maskArr = mask.split('');
    // Limpando a formatação antes de aplicar a máscara
    // e tranforamando em um array, pois simplifica o código
    const inputArr = StringFormatter.clearFormat(input, mask).split('');

    let maskChar = '';
    let newValue = '';
    while (inputArr.length > 0 && maskArr.length > 0) {
      maskChar = maskArr.shift();
      // Se o caracter da máscara for #, adiciona
      // um caracter do inputArr a string formatada
      // e remove o caracter do maskArr
      if (maskChar === '#') {
        newValue += inputArr.shift();
      } else {
        // Se o caracter da máscara não for #, adiciona esse
        // ao string formatada
        newValue += maskChar;
      }
    }
    return newValue;
  }

  private static clearFormat(str: string, mask: string): string {
    // Obtém os caracteres da máscara, diferente de #,
    // que vai ser usado para limpar a formatação
    const maskStr = mask.replace(/#/gi, '').split('');
    // Fazendo uma cópia do input
    let retVal = str;
    for (const c of maskStr) {
      retVal = retVal.replace(c, '');
    }
    return retVal;
  }
}
