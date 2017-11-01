import { Pipe, PipeTransform } from '@angular/core';
import { StringFormatter, CNPJ_MASK } from '../locallib/string-formatter.class';

@Pipe({
  name: 'cnpj-pattern'
})
export class CnpjPatternPipe implements PipeTransform {

  transform(value: string): string {
    return StringFormatter.maskedFormatter(value, CNPJ_MASK);
  }

}
