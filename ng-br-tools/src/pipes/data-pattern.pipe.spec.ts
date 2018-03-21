import { TestBed, async } from '@angular/core/testing';
import { StringFormatter, DATA_MASK } from '../locallib/string-formatter.class';
import { DataPatternPipe } from './data-pattern.pipe';



describe('Pipe: ngBrToolsDataPatternPipe', () => {
  let pipe: DataPatternPipe;
  beforeEach(() => {
    pipe = new DataPatternPipe();
  });

  it('Testando se o pipe chama o método maskedFormatter da classe StringFormatter', () => {
    spyOn(StringFormatter, 'maskedFormatter');
    const data = '12345678';

    pipe.transform(data);
    expect(StringFormatter.maskedFormatter)
      .toHaveBeenCalledWith(data, DATA_MASK, ['D', 'M', 'A']);
  });

});
