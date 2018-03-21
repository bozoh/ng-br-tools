import { Injectable } from "@angular/core";

export const CEP_MASK = '_____-___';
export const CNPJ_MASK = '__.___.___/____-__';
export const CPF_MASK = '___.___.___-__';
export const DATA_MASK = 'DD/MM/AAAA';

export class StringFormatter {

  private formattedMaskArray: string[];
  private unchangeMask: string;
  private maskCharsSet: Set<string> = new Set<string>();
  private readonly placeholderChar = '¬';
  private readonly emptyString = '';
  private caretPosition = 0;

  /**
   * Retorna um texto formatado usando uma máscara
   * @param txt Texto a ser formatado
   * @param mask máscara
   * @param maskChars (opcional) caracteres da máscara, por exemplo:
   * A máscara DD/MM/AAAA tem que passar o maskChars como ['D', 'M', 'A'], para máscaras
   * como __/__/____ o valor de maskChars é opcional pois é obtido automaticamente, ficando
   * igual a ['_']
   */
  public static maskedFormatter(txt: string, mask: string, maskChars: string[] = []): string {
    const strFmt = StringFormatter.getStringFormatter(mask, maskChars);
    return strFmt.format(txt);
  }

  /**
   * Retorna uma instância do StringFormatter
   * @param mask máscara
   * @param maskChars (opcional) caracteres da máscara, por exemplo:
   * A máscara DD/MM/AAAA tem que passar o maskChars como ['D', 'M', 'A'], para máscaras
   * como __/__/____ o valor de maskChars é opcional pois é obtido automaticamente, ficando
   * igual a ['_']
   */
  public static getStringFormatter(mask: string, maskChars: string[] = []): StringFormatter {
    return new StringFormatter(mask, maskChars);
  }

  /**
   * Remove a formatação de uma máscara de um texto
   * @param txt Texto a ser formatado
   * @param mask máscara
   * @param maskChars (opcional) caracteres da máscara, por exemplo:
   * A máscara DD/MM/AAAA tem que passar o maskChars como ['D', 'M', 'A'], para máscaras
   * como __/__/____ o valor de maskChars é opcional pois é obtido automaticamente, ficando
   * igual a ['_']
   */
  public static clearFormat(txt: string, mask: string, maskChars: string[] = []): string {
    const strFmt = StringFormatter.getStringFormatter(mask, maskChars);
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
    if (!maskCharsArray || maskCharsArray.length <= 0) {
      maskCharsArray = [this.getPlaceholderChar(mask)];
    }
    for (const chr of maskCharsArray) {
      const re = new RegExp(chr, 'gi');
      mask = mask.replace(re, this.placeholderChar);
    }

    this.formattedMaskArray = mask.split(this.emptyString);
    this.unchangeMask.split(this.emptyString).forEach((item) => this.maskCharsSet.add(item));
  }

  /**
   * Retorna um texto sem a formatação da máscara
   * @param maskedTxt Texto formatado
   */
  public stripMask(maskedTxt: string): string {
    // criando uma cópia do maskedTxt e removendo a marcação
    return [...maskedTxt.split(this.emptyString)].
      filter(char => (!this.maskCharsSet.has(char))).join(this.emptyString);
  }

  /**
   * Retorna a posição que o cursor deve ter
   */
  public getCaretPosition(): number {
    return this.caretPosition;
  }

  /**
   * Retorna o texto formatado
   * @param txt texto a ser formatado
   */
  public format(txt: string): string {
    this.caretPosition = 0;
    const inputArray = this.stripMask(txt).split(this.emptyString);
    let formattedStr = this.formattedMaskArray.map((char, index) => {
        if (char !== this.placeholderChar) {
          // this.caretPosition += 1;
          return char;
        }
        if (inputArray.length === 0) {
          return char;
        }
        // this.caretPosition += 1;
        return inputArray.shift();
    }).join(this.emptyString);

    const idx = formattedStr.indexOf(this.placeholderChar);
    if (idx !== -1 ) {
      this.caretPosition = idx;
      formattedStr = formattedStr.substring(0, idx) + this.unchangeMask.substr(idx);
    } else {
      this.caretPosition = this.unchangeMask.length;
    }
    return formattedStr;
  }

  private getPlaceholderChar(str: string): string {
    const strCountMap: Map<string, number> = new Map();
    let maxKey = this.emptyString;
    for (const key of str) {
      if (!strCountMap.has(key)) {
        strCountMap.set(key, 1);
      } else {
        strCountMap.set(key, strCountMap.get(key) + 1);
      }
      if (maxKey === this.emptyString || strCountMap.get(maxKey) < strCountMap.get(key)) {
        maxKey = key;
      }
    }
    return maxKey;
  }
}
