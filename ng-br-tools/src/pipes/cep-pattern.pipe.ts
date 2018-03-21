import { Pipe, PipeTransform } from '@angular/core';
import { StringFormatter, CEP_MASK } from '../locallib/string-formatter.class';
import { MaskPatternPipe } from './mask-pattern.pipe';

@Pipe({
  name: 'ngBrToolsCepPatternPipe'
})
export class CepPatternPipe extends MaskPatternPipe implements PipeTransform {

  transform(value: string): string {
    return super.transform(value, CEP_MASK);
  }

}
