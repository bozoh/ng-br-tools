import { Pipe, PipeTransform } from '@angular/core';
import { StringFormatter, CPF_MASK } from '../locallib/string-formatter.class';

@Pipe({
  name: 'ng-br-tools-cpf-pattern-pipe'
})
export class CpfPatternPipe implements PipeTransform {

  transform(value: string): string {
    return StringFormatter.maskedFormatter(value, CPF_MASK);
  }

}
