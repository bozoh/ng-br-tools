import {  ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { MaskPatternDirective } from './mask-pattern.directive';
import { By } from '@angular/platform-browser';
import { fakeAsync } from '@angular/core/testing';
import { tick } from '@angular/core/testing';


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

  it('Testando a formatação de uma máscara de CPF, só adicioando os números, sem formatação', () => {
    const input = maskedInputs[0].nativeElement as HTMLInputElement;
    const event = new KeyboardEvent('input', null);

    input.value = '12345678900';
    input.dispatchEvent(event);
    fixture.detectChanges();

    expect(input.value).toBe('123.456.789-00');
  });

  it('Testando a formatação de uma máscara de CPF, adicioando os números e formatação', () => {
    // const inputCpfEl = fixture.debugElement.query(By.css('input'));
    const input = maskedInputs[0].nativeElement as HTMLInputElement;
    // const event = new KeyboardEvent('keyup', {'code': '65'});
    const event = new KeyboardEvent('input', null);

    input.value = '123.456.789-00';
    input.dispatchEvent(event);
    fixture.detectChanges();

    expect(input.value).toBe('123.456.789-00');
  });

  it('Testando a formatação de uma máscara de CPF, inserido parcialmente, tem que formatar parcialemtente', () => {
    const input = maskedInputs[0].nativeElement as HTMLInputElement;
    // const event = new KeyboardEvent('keyup', {'code': '65'});
    const event = new KeyboardEvent('input', null);

    input.value = '123.4';
    input.dispatchEvent(event);
    fixture.detectChanges();
    expect(input.value).toBe('123.4');

    input.value = '1234';
    input.dispatchEvent(event);
    fixture.detectChanges();
    expect(input.value).toBe('123.4');

    input.value = '123.456.7';
    input.dispatchEvent(event);
    fixture.detectChanges();
    expect(input.value).toBe('123.456.7');

    input.value = '1234567';
    input.dispatchEvent(event);
    fixture.detectChanges();
    expect(input.value).toBe('123.456.7');

    input.value = '123.456.789-0';
    input.dispatchEvent(event);
    fixture.detectChanges();
    expect(input.value).toBe('123.456.789-0');

    input.value = '1234567890';
    input.dispatchEvent(event);
    fixture.detectChanges();
    expect(input.value).toBe('123.456.789-0');
  });

  it('Testando formatação de uma máscara de CPF com mais 11 números, só pega os 11 primeiros', () => {
    const input = maskedInputs[0].nativeElement as HTMLInputElement;
    const event = new KeyboardEvent('input', null);

    // 16 dígitos, mas cpf só tem 11 (E)
    input.value = '12345678900EEEEE';
    input.dispatchEvent(event);
    fixture.detectChanges();
    expect(input.value).toBe('123.456.789-00');

  });

  it('Testando formatação CNPJ', () => {
    const input = maskedInputs[1].nativeElement as HTMLInputElement;
    const event = new KeyboardEvent('input', null);

    // 16 dígitos, mas cnpj só tem catorze (E)
    input.value = '00000000000000EEEE';
    input.dispatchEvent(event);
    fixture.detectChanges();
    expect(input.value).toBe('00.000.000/0000-00');

  });

  it('Testando formatação Telefone celular (com espaço em branco), com código do país e de área', () => {
    const input = maskedInputs[2].nativeElement as HTMLInputElement;
    const event = new KeyboardEvent('input', null);

    // também tem caracteres a mais (E)
    input.value = '0000000000000EEEE';
    input.dispatchEvent(event);
    fixture.detectChanges();
    expect(input.value).toBe('+00 (00) 0-0000-0000');

  });

  it('Testando se o placeholder aparece ou não', () => {
    const input1 = maskedInputs[0].nativeElement as HTMLInputElement;
    const input2 = maskedInputs[1].nativeElement as HTMLInputElement;
    const input3 = maskedInputs[2].nativeElement as HTMLInputElement;

    // Comportamento Padrão
    expect(input1.placeholder).toBe('###.###.###-##');
    // Se o showPlaceholde = false
    expect(input2.placeholder).toBe('');
    // Se já tiver um placeholder definido
    expect(input3.placeholder).toBe('+00 (00) 0-0000-0000');
  });

});
