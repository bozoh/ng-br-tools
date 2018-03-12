import { Directive, OnInit } from '@angular/core';
import { MaskPatternDirective } from './mask-pattern.directive';
import { CEP_MASK } from '../locallib/string-formatter.class';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ngBrToolsCepPattern]'
})
export class CepPatternDirective extends MaskPatternDirective {

  ngOnInit(): void {
    this.pattern = CEP_MASK;
    super.ngOnInit();
  }
}
