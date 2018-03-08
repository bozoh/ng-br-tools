/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { StringFormatter, CNPJ_MASK } from '../locallib/string-formatter.class';
import { CnpjPatternPipe } from './cnpj-pattern.pipe';


describe('Pipe: ng-br-tools-cep-pattern-pipe', () => {
  let pipe: CnpjPatternPipe;
  beforeEach(() => {
    pipe = new CnpjPatternPipe();
  });

  it('Testando se o pipe chama o método maskedFormatter da classe StringFormatter', () => {
    spyOn(StringFormatter, 'maskedFormatter');
    const cnpj = '12345678900123';

    pipe.transform(cnpj);
    expect(StringFormatter.maskedFormatter)
      .toHaveBeenCalledWith(cnpj, CNPJ_MASK);
  });

});
