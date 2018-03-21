import { Pipe, PipeTransform } from '@angular/core';
import { MaskPatternPipe } from './mask-pattern.pipe';
import { StringFormatter, CPF_MASK } from '../locallib/string-formatter.class';

@Pipe({
  name: 'ngBrToolsCpfPatternPipe'
})
export class CpfPatternPipe extends MaskPatternPipe implements PipeTransform {
  transform(value: string): string {
    return super.transform(value, CPF_MASK);
  }
}
