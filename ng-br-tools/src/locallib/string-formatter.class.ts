export const CEP_MASK = '_____-___';
export const CNPJ_MASK = '__.___.___/____-__';
export const CPF_MASK = '___.___.___-__';

export class StringFormatter {

  private formattedMaskArray: string[];
  private unchangeMask: string;
  private maskCharsSet: Set<string> = new Set<string>();
  private readonly placeholderChar = '¬';

  /**
   * Retorna um texto formatado usanda uma máscara
   * @param txt Texto a ser formatado
   * @param mask máscara
   */
  public static maskedFormatter(txt: string, mask: string): string {
    const strFmt = new StringFormatter(mask);
    return strFmt.format(txt);
  }

  /**
   * Remove a formatação de uma máscara de um texto
   * @param txt texto formatado pela máscara mask
   * @param mask máscara
   */
  public static clearFormat(txt: string, mask: string): string {
    const strFmt = new StringFormatter(mask);
    return strFmt.stripMask(txt);
  }

  /**
   * Aplica uma máscara a uma string
   *
   * @param mask A máscara desejada
   * @param maskCharsArray (Opcional) um array contendo as strings da máscara, por exemplo
   * a máscara DD/MM/AAAA tem que passar o maskCharsArray como ['D', 'M', 'A'], para máscaras
   * como __/__/____ esse valor de maskCharsArray é opcional, ficando igual a ['_']
   */
  constructor(mask: string, maskCharsArray?: string[]) {
    this.unchangeMask = mask;
    if (!maskCharsArray) {
      maskCharsArray = [this.getPlaceholderChar(mask)];
    }
    for (const chr of maskCharsArray) {
      const re = new RegExp(chr, 'gi');
      mask = mask.replace(re, this.placeholderChar);
    }

    this.formattedMaskArray = mask.split('');
    this.formattedMaskArray.forEach((item) => this.maskCharsSet.add(item));
  }


  /**
   * Retorna um texto sem a formatação da máscara
   * @param maskedTxt Texto formatado
   */
  public stripMask(maskedTxt: string): string {
    // criando uma cópia do maskedTxt e removendo a marcação
    return [...maskedTxt.split('')].
      filter(char => (!this.maskCharsSet.has(char))).join('');
  }

  /**
   * Retorna o texto formatado
   * @param txt texto a ser formatado
   */
  public format(txt: string): string {
    const input = this.stripMask(txt).split('');
    let formattedStr = this.formattedMaskArray.map((char, idx) => {
        if (char !== this.placeholderChar) {
          return char;
        }
        if (input.length === 0) {
          return char;
        }
        return input.shift();
    }).join('');
    if (formattedStr.indexOf(this.placeholderChar) !== -1 ) {
      const idx = formattedStr.indexOf(this.placeholderChar);
      const fmt = formattedStr.substring(0, idx);
      formattedStr = fmt + this.unchangeMask.substr(idx);
    }
    return formattedStr;
  }

  private getPlaceholderChar(str: string): string {
    const strCountMap: Map<string, number> = new Map();
    let maxKey = '';
    for (const key of str) {
      if (!strCountMap.has(key)) {
        strCountMap.set(key, 1);
      } else {
        strCountMap.set(key, strCountMap.get(key) + 1);
      }
      if (maxKey === '' || strCountMap.get(maxKey) < strCountMap.get(key)) {
        maxKey = key;
      }
    }
    return maxKey;
  }
}
