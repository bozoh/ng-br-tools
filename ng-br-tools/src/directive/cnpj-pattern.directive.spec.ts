import {  ComponentFixture, TestBed} from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { StringFormatter, CNPJ_MASK } from '../locallib/string-formatter.class';
import { CnpjPatternDirective } from './cnpj-pattern.directive';



@Component({
  // tslint:disable-next-line:component-selector
  template: `
    <input name="test-cnpj" type="text"
      ngBrToolsCnpjPattern />
    <input name="no-mask" type="text" />
  `
})
class TestCnpjPatternDirectiveComponent {}

describe('Directive: Teste da Diretiva ngBrToolsCnpjPattern', () => {
  let fixture: ComponentFixture<TestCnpjPatternDirectiveComponent>;
  let maskedInputs: DebugElement[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CnpjPatternDirective, TestCnpjPatternDirectiveComponent]
    });

    fixture = TestBed.createComponent(TestCnpjPatternDirectiveComponent);
    fixture.detectChanges(); // initial binding


    maskedInputs = fixture.debugElement
        .queryAll(By.directive(CnpjPatternDirective));
  });

  it ('Testando se existem 1 input com a diretiva', () => {
    expect(maskedInputs.length).toEqual(1);
  });

  it ('Testando se as máscaras estão atribuídas corretamente', () => {
    // cons maskDir = maskedInputs[0].injector.get(MaskPatternDirective) as MaskPatternDirective;
    const mask1 = maskedInputs[0].injector.get(CnpjPatternDirective).pattern;
    expect(mask1).toBe(CNPJ_MASK);
  });

  it('Testando se a diretiva chama o método maskedFormatter da classe StringFormatter', () => {
    const mockStrFmt = jasmine.createSpyObj('StringFormatter', ['format', 'getCaretPosition']);
    spyOn(StringFormatter, 'getStringFormatter').and.returnValue(mockStrFmt);

    const cnpj = '12345678900123';
    const input = maskedInputs[0].nativeElement as HTMLInputElement;
    const event = new KeyboardEvent('keyup', null);

    input.value = cnpj;
    input.dispatchEvent(event);
    fixture.detectChanges();


    expect(StringFormatter.getStringFormatter)
    .toHaveBeenCalledWith(CNPJ_MASK, [ ]);
    expect(mockStrFmt.format)
    .toHaveBeenCalledWith(cnpj);
    expect(mockStrFmt.getCaretPosition).toHaveBeenCalled();
  });
});

