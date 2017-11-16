import { Pipe, PipeTransform } from '@angular/core';
import { StringFormatter, CPF_MASK } from '../locallib/string-formatter.class';

@Pipe({
  name: 'cpf-pattern'
})
export class CpfPatternPipe implements PipeTransform {

  transform(value: string): string {
    return StringFormatter.maskedFormatter(value, CPF_MASK);
  }

}
