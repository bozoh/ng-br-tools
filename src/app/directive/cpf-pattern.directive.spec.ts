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
      cpf-pattern />
    <input name="no-mask" type="text" />
  `
})
class TestCpfPatternDirectiveComponent {}

describe('Directive: Teste da Diretiva cpf-pattern', () => {
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

  it ('Testando se as máscaras estão atribuidas corretamente', () => {
    // cons maskDir = maskedInputs[0].injector.get(MaskPatternDirective) as MaskPatternDirective;
    const mask1 = maskedInputs[0].injector.get(CpfPatternDirective).pattern;
    expect(mask1).toBe(CPF_MASK);
  });

  it('Testando se a diretiva chama o método maskedFormatter da classe StringFormatter', () => {
    spyOn(StringFormatter, 'maskedFormatter');
    const cpf = '12345678900';
    const input = maskedInputs[0].nativeElement as HTMLInputElement;
    const event = new KeyboardEvent('input', null);

    input.value = cpf;
    input.dispatchEvent(event);
    fixture.detectChanges();

    expect(StringFormatter.maskedFormatter)
      .toHaveBeenCalledWith(cpf, CPF_MASK);
  });
});

