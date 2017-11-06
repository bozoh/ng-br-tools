export const CEP_MASK = '_____-___';
export const CNPJ_MASK = '__.___.___/____-__';
export const CPF_MASK = '___.___.___-__';

export class StringFormatter {

  public static maskedFormatter(input: string, mask: string): string {
    // O caracter que representa máscara deve ser o caracter mais comum na string
    // os demais são de formatação, então retorno o caracter mais comum
    const maskChr = StringFormatter.getMostCommonChar(mask);

    // Tranfomando a máscara em um array, mais fácil
    // para formatar o texto
    const maskArr = mask.split('');

    // Limpando a formatação antes de aplicar a máscara
    // e tranforamando em um array, pois simplifica o código
    const inputArr = StringFormatter.clearFormat(input, mask).split('');

    let currMaskChar = '';
    let newValue = '';
    while (inputArr.length > 0 && maskArr.length > 0) {
      currMaskChar = maskArr.shift();
      // Se o caracter da máscara for #, adiciona
      // um caracter do inputArr a string formatada
      // e remove o caracter do maskArr
      if (currMaskChar === maskChr) {
        newValue += inputArr.shift();
      } else {
        // Se o caracter da máscara não for #, adiciona esse
        // ao string formatada
        newValue += currMaskChar;
      }
    }
    return newValue + maskArr.join('');
  }

  public static clearFormat(str: string, mask: string): string {
    // O caracter que representa máscara deve ser o caracter mais comum na string
    // os demais são de formatação, então retorno o caracter mais comum
    const maskChr = StringFormatter.getMostCommonChar(mask);
    // Obtém os caracteres de formatação, removento os de máscara,
    // que vai ser usado para limpar a formatação
    const maskStr = mask.replace(maskChr, '').split('');
    // Fazendo uma cópia do input
    let retVal = str;
    for (const c of maskStr) {
      retVal = retVal.replace(c, '');
    }
    return retVal;
  }

  private static getMostCommonChar(str: string): string {
    const strCountArr: Map<string, number> = new Map();
    let maxKey = '';
    for (const key of str) {
      if (!strCountArr.has(key)) {
        strCountArr.set(key, 1);
      } else {
        strCountArr.set(key, strCountArr.get(key) + 1);
      }
      if (maxKey === '' || strCountArr.get(maxKey) < strCountArr.get(key)) {
        maxKey = key;
      }
    }
    return maxKey;
  }
}
