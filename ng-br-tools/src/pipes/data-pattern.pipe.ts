import { Pipe, PipeTransform } from '@angular/core';
import { StringFormatter, DATA_MASK } from './../locallib/string-formatter.class';

@Pipe({
  name: 'data-pattern'
})
export class DataPatternPipe implements PipeTransform {

  transform(value: string): string {
    return StringFormatter.maskedFormatter(value, DATA_MASK, ['D', 'M', 'A']);
  }
}
