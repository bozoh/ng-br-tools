import {  ComponentFixture, TestBed} from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { StringFormatter, DATA_MASK } from '../locallib/string-formatter.class';
import { DataPatternDirective } from './data-pattern.directive';



@Component({
  // tslint:disable-next-line:component-selector
  template: `
    <input name="test-data" type="text"
    ngBrToolsDataPattern />
    <input name="no-mask" type="text" />
  `
})
class TestDataPatternDirectiveComponent {}

describe('Directive: Teste da Diretiva ngBrToolsDataPattern', () => {
  let fixture: ComponentFixture<TestDataPatternDirectiveComponent>;
  let maskedInputs: DebugElement[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataPatternDirective, TestDataPatternDirectiveComponent]
    });

    fixture = TestBed.createComponent(TestDataPatternDirectiveComponent);
    fixture.detectChanges(); // initial binding


    maskedInputs = fixture.debugElement
        .queryAll(By.directive(DataPatternDirective));
  });

  it ('Testando se existem 1 input com a diretiva', () => {
    expect(maskedInputs.length).toEqual(1);
  });

  it ('Testando se as máscaras estão atribuídas corretamente', () => {
    const mask1 = maskedInputs[0].injector.get(DataPatternDirective).pattern;
    const maskChars = maskedInputs[0].injector.get(DataPatternDirective).maskChars;
    expect(mask1).toBe(DATA_MASK);
    expect(maskChars).toBe('D,M,A');
  });

  it('Testando se a diretiva chama o método maskedFormatter da classe StringFormatter', () => {
    const mockStrFmt = jasmine.createSpyObj('StringFormatter', ['format', 'getCaretPosition']);
    spyOn(StringFormatter, 'getStringFormatter').and.returnValue(mockStrFmt);
    const data = '10101010';
    const input = maskedInputs[0].nativeElement as HTMLInputElement;
    const event = new KeyboardEvent('keyup', null);

    input.value = data;
    input.dispatchEvent(event);
    fixture.detectChanges();

    expect(StringFormatter.getStringFormatter)
    .toHaveBeenCalledWith(DATA_MASK, ['D', 'M', 'A']);
    expect(mockStrFmt.format)
    .toHaveBeenCalledWith(data);
    expect(mockStrFmt.getCaretPosition).toHaveBeenCalled();

  });
});

