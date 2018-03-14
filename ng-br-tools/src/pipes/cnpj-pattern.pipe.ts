import { Pipe, PipeTransform } from '@angular/core';
import { StringFormatter, CNPJ_MASK } from '../locallib/string-formatter.class';
import { MaskPatternPipe } from './mask-pattern.pipe';

@Pipe({
  name: 'ngBrToolsCnpjPatternPipe'
})
export class CnpjPatternPipe extends MaskPatternPipe implements PipeTransform {

  transform(value: string): string {
    return super.transform(value, CNPJ_MASK);
  }

}
