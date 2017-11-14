import { Pipe, PipeTransform } from '@angular/core';
import { StringFormatter } from '../locallib/string-formatter.class';

@Pipe({
  name: 'mask-pattern'
})
export class MaskPatternPipe implements PipeTransform {

  transform(value: string, mask: string): string {
    return StringFormatter.maskedFormatter(value, mask);
  }

}
