/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { StringFormatter, CPF_MASK } from '../locallib/string-formatter.class';
import { CpfPatternPipe } from './cpf-pattern.pipe';

describe('Pipe: ngBrToolsCpfPatternPipe', () => {
  let pipe: CpfPatternPipe;
  beforeEach(() => {
    pipe = new CpfPatternPipe();
  });

  it('Testando se o pipe chama o método maskedFormatter da classe StringFormatter', () => {
    spyOn(StringFormatter, 'maskedFormatter');
    const cpf = '12345678900';

    pipe.transform(cpf);
    expect(StringFormatter.maskedFormatter)
      .toHaveBeenCalledWith(cpf, CPF_MASK);
  });

});
