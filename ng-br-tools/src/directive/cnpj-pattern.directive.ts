import { Directive } from '@angular/core';
import { MaskPatternDirective } from './mask-pattern.directive';
import { CNPJ_MASK } from '../locallib/string-formatter.class';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[cnpj-pattern]'
})
export class CnpjPatternDirective extends MaskPatternDirective {

  ngOnInit(): void {
    this.pattern = CNPJ_MASK;
    super.ngOnInit();
  }
}
