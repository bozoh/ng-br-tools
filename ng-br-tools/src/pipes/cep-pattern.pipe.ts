import { Pipe, PipeTransform } from '@angular/core';
import { StringFormatter, CEP_MASK } from '../locallib/string-formatter.class';

@Pipe({
  name: 'ng-br-tools-cep-pattern-pipe'
})
export class CepPatternPipe implements PipeTransform {

  transform(value: string): string {
    return StringFormatter.maskedFormatter(value, CEP_MASK);
  }

}
