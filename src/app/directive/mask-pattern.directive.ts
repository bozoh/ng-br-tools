import { Directive, Input, HostBinding, HostListener, OnInit } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[mask-pattern]'
})
export class MaskPatternDirective implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('mask-pattern') pattern = '';
  private patternStr: string[] = [];
  private patternArr: string[] = [];

  constructor() { }

  ngOnInit(): void {
    // Obtem os caracteres da mascara, diferente de #,
    // que vai ser usado para limpar a formatação
    this.patternStr = this.pattern.replace(/#/gi, '').split('');
    // Tranfomando a máscara em um array, mais fácil
    // para formatar o texto
    this.patternArr = this.pattern.split('');
  }

  private clearFormat(str: string): string {
    let retVal = str;
    for (const c of this.patternStr) {
      retVal = retVal.replace(c, '');
    }

    return retVal;
  }

  @HostListener('input', ['$event'])  onkeyup(e) {
    // Copiando o valor da máscara
    const pttr = [...this.patternArr];
    const input = e.target;
    // Limpando a formatação, e copiando o valor do input
    // e tranformando em um array
    const inputValue = this.clearFormat(input.value).split('');
    let pttrChar = '';
    let newValue = '';
    while (inputValue.length > 0 && pttr.length > 0) {
      pttrChar = pttr.shift();
      if (pttrChar === '#') {
        newValue += inputValue.shift();
      } else {
        newValue += pttrChar;
      }
    }
    input.value = newValue;
  }

}
