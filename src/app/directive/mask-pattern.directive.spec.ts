import {  ComponentFixture, TestBed} from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { MaskPatternDirective } from './mask-pattern.directive';
import { By } from '@angular/platform-browser';
import { StringFormatter } from '../locallib/string-formatter.class';


@Component({
  // tslint:disable-next-line:component-selector
  template: `
    <input name="test-cpf-mask" name="test-cpf-mask" type="text"
      [mask-pattern]="'###.###.###-##'" />
    <input name="test-cnpj-mask" type="text"
      [mask-pattern]="'##.###.###/####-##'" [showPlaceholder]="false"  />
    <input name="test-cel-mask" type="text"
      [mask-pattern]="'+## (##) #-####-####'" placeholder="+00 (00) 0-0000-0000" />
    <input name="no-mask" type="text" />
  `
})
class TestMaskPatternDirectiveComponent {}

describe('Directive: Teste da Diretiva mask-pattern', () => {
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

  it ('Testando se existem 3 input com a diretiva', () => {
    expect(maskedInputs.length).toEqual(3);
  });

  it ('Testando se as máscaras estão atribuidas corretamente', () => {
    // cons maskDir = maskedInputs[0].injector.get(MaskPatternDirective) as MaskPatternDirective;
    const mask1 = maskedInputs[0].injector.get(MaskPatternDirective).pattern;
    const mask2 = maskedInputs[1].injector.get(MaskPatternDirective).pattern;
    const mask3 = maskedInputs[2].injector.get(MaskPatternDirective).pattern;

    expect(mask1).toBe('###.###.###-##');
    expect(mask2).toBe('##.###.###/####-##');
    expect(mask3).toBe('+## (##) #-####-####');
  });

  it('Testando se a diretiva chama o método maskedFormatter da classe StringFormatter', () => {
    spyOn(StringFormatter, 'maskedFormatter');
    const cpf = '12345678900';
    const input = maskedInputs[0].nativeElement as HTMLInputElement;
    const mask1 = maskedInputs[0].injector.get(MaskPatternDirective).pattern;
    const event = new KeyboardEvent('input', null);

    input.value = cpf;
    input.dispatchEvent(event);
    fixture.detectChanges();

    expect(StringFormatter.maskedFormatter)
      .toHaveBeenCalledWith(cpf, mask1);
  });


  it('Testando se o placeholder aparece por padrão', () => {
    const input1 = maskedInputs[0].nativeElement as HTMLInputElement;
    expect(input1.placeholder).toBe('###.###.###-##');
  });

  it('Testando se o placeholder some se o showPlaceholder = false', () => {
    const input1 = maskedInputs[1].nativeElement as HTMLInputElement;
    expect(input1.placeholder).toBe('');
  });

  it('Testando se o placeholder é preservado se for definido no input', () => {
    const input1 = maskedInputs[2].nativeElement as HTMLInputElement;
    expect(input1.placeholder).toBe('+00 (00) 0-0000-0000');
  });

});
