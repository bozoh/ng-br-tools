/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { MaskPatternPipe } from './mask-pattern.pipe';
import { StringFormatter } from '../locallib/string-formatter.class';

describe('Pipe: ngBrToolsMaskPatternPipe', () => {
  let pipe: MaskPatternPipe;
  beforeEach(() => {
    pipe = new MaskPatternPipe();
  });

  it('Testando se o pipe chama o método maskedFormatter da classe StringFormatter', () => {
    spyOn(StringFormatter, 'maskedFormatter');
    const cpf = '12345678900';
    const mask = '###.###.###-##';

    pipe.transform(cpf, mask);
    expect(StringFormatter.maskedFormatter)
      .toHaveBeenCalledWith(cpf, mask);
  });

});
