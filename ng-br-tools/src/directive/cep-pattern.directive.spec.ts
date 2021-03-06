/* tslint:disable:no-unused-variable */
import {  ComponentFixture, TestBed} from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { StringFormatter, CEP_MASK } from '../locallib/string-formatter.class';
import { CepPatternDirective } from './cep-pattern.directive';


@Component({
  // tslint:disable-next-line:component-selector
  template: `
    <input name="test-cep" type="text"
      ngBrToolsCepPattern >
    <input name="no-mask" type="text" >
  `
})
class TestCepPatternDirectiveComponent {}

describe('Directive: Teste da Diretiva (ngBrToolsCepPattern)', () => {
  let fixture: ComponentFixture<TestCepPatternDirectiveComponent>;
  let maskedInputs: DebugElement[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CepPatternDirective, TestCepPatternDirectiveComponent]
    });

    fixture = TestBed.createComponent(TestCepPatternDirectiveComponent);
    fixture.detectChanges(); // initial binding


    maskedInputs = fixture.debugElement
        .queryAll(By.directive(CepPatternDirective));
  });

  it ('Testando se existem 1 input com a diretiva', () => {
    expect(maskedInputs.length).toEqual(1);
  });

  it ('Testando se as máscaras estão atribuídas corretamente', () => {
    // cons maskDir = maskedInputs[0].injector.get(MaskPatternDirective) as MaskPatternDirective;
    const mask1 = maskedInputs[0].injector.get(CepPatternDirective).pattern;
    expect(mask1).toBe(CEP_MASK);
  });

  it('Testando se a diretiva chama o método maskedFormatter da classe StringFormatter', () => {
    const mockStrFmt = jasmine.createSpyObj('StringFormatter', ['format', 'getCaretPosition']);
    spyOn(StringFormatter, 'getStringFormatter').and.returnValue(mockStrFmt);
    const cep = '12345678';
    const input = maskedInputs[0].nativeElement as HTMLInputElement;
    const event = new KeyboardEvent('keyup', null);

    input.value = cep;
    input.dispatchEvent(event);
    fixture.detectChanges();

    expect(StringFormatter.getStringFormatter)
    .toHaveBeenCalledWith(CEP_MASK, [ ]);
    expect(mockStrFmt.format)
    .toHaveBeenCalledWith(cep);
    expect(mockStrFmt.getCaretPosition).toHaveBeenCalled();
  });
});

