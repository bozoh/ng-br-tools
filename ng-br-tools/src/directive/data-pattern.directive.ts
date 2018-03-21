import { Directive } from '@angular/core';
import { MaskPatternDirective } from './mask-pattern.directive';
import { DATA_MASK } from '../locallib/string-formatter.class';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ngBrToolsDataPattern]'
})
export class DataPatternDirective extends MaskPatternDirective {

  ngOnInit(): void {
    this.pattern = DATA_MASK;
    this.maskChars = 'D,M,A';
    super.ngOnInit();
  }
}
