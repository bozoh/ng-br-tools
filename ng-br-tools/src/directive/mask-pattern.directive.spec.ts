import { ComponentFixture, TestBed} from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { MaskPatternDirective } from './mask-pattern.directive';
import { By } from '@angular/platform-browser';
import { StringFormatter } from '../locallib/string-formatter.class';


@Component({
  // tslint:disable-next-line:component-selector
  template: `
    <input name="test-cpf-mask" name="test-cpf-mask" type="text"
      [ngBrToolsMaskPattern]="'###.###.###-##'" />
    <input name="test-cnpj-mask" type="text"
      [ngBrToolsMaskPattern]="'__.___.___/____-__'" [ngBrToolsShowPlacholder]="false"  />
    <input name="test-cel-mask" type="text"
      [ngBrToolsMaskPattern]="'+00 (00) 0-0000-0000'" />
      <input name="test-data-mask" type="text"
      [ngBrToolsMaskPattern]="'DD/MM/AAAA'" [ngBrToolsMaskChars]="'D,M,A'" />
    <input name="no-mask" type="text" />
  `
})
class TestMaskPatternDirectiveComponent {}

describe('Directive: Teste da Diretiva ngBrToolsMaskPattern', () => {
  let fixture: ComponentFixture<TestMaskPatternDirectiveComponent>;
  let maskedInputs: DebugElement[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaskPatternDirective, TestMaskPatternDirectiveComponent]
    });

    fixture = TestBed.createComponent(TestMaskPatternDirectiveComponent);
    fixture.detectChanges(); // initial binding


    maskedInputs = fixture.debugElement
        .queryAll(By.directive(MaskPatternDirective));
  });

  it ('Testando se existem 4 input com a diretiva', () => {
    expect(maskedInputs.length).toEqual(4);
  });

  it ('Testando se as máscaras estão atribuídas corretamente', () => {
    const mask1 = maskedInputs[0].injector.get(MaskPatternDirective).pattern;
    const mask2 = maskedInputs[1].injector.get(MaskPatternDirective).pattern;
    const mask3 = maskedInputs[2].injector.get(MaskPatternDirective).pattern;
    const mask4 = maskedInputs[3].injector.get(MaskPatternDirective).pattern;
    const maskChars = maskedInputs[3].injector.get(MaskPatternDirective).maskChars;

    expect(mask1).toBe('###.###.###-##');
    expect(mask2).toBe('__.___.___/____-__');
    expect(mask3).toBe('+00 (00) 0-0000-0000');
    expect(mask4).toBe('DD/MM/AAAA');
    expect(maskChars).toBe('D,M,A');
  });

  it('Testando se a diretiva chama o método maskedFormatter da classe StringFormatter', () => {
    spyOn(StringFormatter, 'maskedFormatter');
    const cpf = '12345678900';
    const event = new KeyboardEvent('keyup', null);

    const input1 = maskedInputs[0].nativeElement as HTMLInputElement;
    const mask1 = maskedInputs[0].injector.get(MaskPatternDirective).pattern;

    input1.value = cpf;
    input1.dispatchEvent(event);
    fixture.detectChanges();

    expect(StringFormatter.maskedFormatter)
      .toHaveBeenCalledWith(cpf, mask1, [ ]);
  });

  it('Testando se a diretiva chama o método maskedFormatter da classe StringFormatter com o ' +
      'valor de ngBrToolsMaskChars', () => {
    spyOn(StringFormatter, 'maskedFormatter');
    const data = '10101010';
    const event = new KeyboardEvent('keyup', null);

    const input1 = maskedInputs[3].nativeElement as HTMLInputElement;
    const mask1 = maskedInputs[3].injector.get(MaskPatternDirective).pattern;
    const maskChars = maskedInputs[3].injector.get(MaskPatternDirective).maskChars;
    const maskCharsArray = maskChars.split(',');

    input1.value = data;
    input1.dispatchEvent(event);
    fixture.detectChanges();

    expect(StringFormatter.maskedFormatter)
      .toHaveBeenCalledWith(data, mask1, maskCharsArray);
  });


  it('Testando se o placeholder some se o showPlaceholder = false', () => {
    const input1 = maskedInputs[1].nativeElement as HTMLInputElement;
    expect(input1.placeholder).toBe('');
  });
});
