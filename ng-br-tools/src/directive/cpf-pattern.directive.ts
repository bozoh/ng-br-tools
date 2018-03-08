import { Directive } from '@angular/core';
import { MaskPatternDirective } from './mask-pattern.directive';
import { CPF_MASK } from '../locallib/string-formatter.class';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ng-br-tools-cpf-pattern]'
})
export class CpfPatternDirective extends MaskPatternDirective {

  ngOnInit(): void {
    this.pattern = CPF_MASK;
    super.ngOnInit();
  }
}
