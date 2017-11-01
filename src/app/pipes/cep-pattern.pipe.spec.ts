/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { StringFormatter, CEP_MASK } from '../locallib/string-formatter.class';
import { CepPatternPipe } from './cep-pattern.pipe';



describe('Pipe: CepPattern', () => {
  let pipe: CepPatternPipe;
  beforeEach(() => {
    pipe = new CepPatternPipe();
  });

  it('Testando se o pipe chama o método maskedFormatter da classe StringFormatter', () => {
    spyOn(StringFormatter, 'maskedFormatter');
    const cep = '12345678';

    pipe.transform(cep);
    expect(StringFormatter.maskedFormatter)
      .toHaveBeenCalledWith(cep, CEP_MASK);
  });

});
