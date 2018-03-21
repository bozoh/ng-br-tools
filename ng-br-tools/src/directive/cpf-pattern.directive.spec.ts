/* tslint:disable:no-unused-variable */
import {  ComponentFixture, TestBed} from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { StringFormatter, CPF_MASK } from '../locallib/string-formatter.class';
import { CpfPatternDirective } from './cpf-pattern.directive';


@Component({
  // tslint:disable-next-line:component-selector
  template: `
    <input name="test-cpf" type="text"
     ngBrToolsCpfPattern />
    <input name="no-mask" type="text" />
  `
})
class TestCpfPatternDirectiveComponent {}

describe('Directive: Teste da Diretiva ngBrToolsCpfPattern', () => {
  let fixture: ComponentFixture<TestCpfPatternDirectiveComponent>;
  let maskedInputs: DebugElement[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CpfPatternDirective, TestCpfPatternDirectiveComponent]
    });

    fixture = TestBed.createComponent(TestCpfPatternDirectiveComponent);
    fixture.detectChanges(); // initial binding


    maskedInputs = fixture.debugElement
        .queryAll(By.directive(CpfPatternDirective));
  });

  it ('Testando se existem 1 input com a diretiva', () => {
    expect(maskedInputs.length).toEqual(1);
  });

  it ('Testando se as máscaras estão atribuídas corretamente', () => {
    const mask1 = maskedInputs[0].injector.get(CpfPatternDirective).pattern;
    expect(mask1).toBe(CPF_MASK);
  });

  it('Testando se a diretiva chama o método maskedFormatter da classe StringFormatter', () => {
    const mockStrFmt = jasmine.createSpyObj('StringFormatter', ['format', 'getCaretPosition']);
    spyOn(StringFormatter, 'getStringFormatter').and.returnValue(mockStrFmt);

    const cpf = '12345678900';
    const input = maskedInputs[0].nativeElement as HTMLInputElement;
    const event = new KeyboardEvent('keyup', null);

    input.value = cpf;
    input.dispatchEvent(event);
    fixture.detectChanges();

    expect(StringFormatter.getStringFormatter)
    .toHaveBeenCalledWith(CPF_MASK, [ ]);
    expect(mockStrFmt.format)
    .toHaveBeenCalledWith(cpf);
    expect(mockStrFmt.getCaretPosition).toHaveBeenCalled();

  });
});

