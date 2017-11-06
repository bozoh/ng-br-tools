import { CEP_MASK } from './../../locallib/string-formatter.class';
import { Endereco } from './endereco.model';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CepComponent } from './cep.component';
import { CepService } from './cep.service';

describe('CepComponent', () => {
  let cepComponent: CepComponent;
  let fixture: ComponentFixture<CepComponent>;
  let cepServiceTest: CepService;
  const cepTest = '70002900';
  const cepTestFormatado = '70002-900';
  const enderecoTest = new Endereco(
    'SBN Quadra 1 Bloco A',
    'Asa Norte',
    '70002900',
    'Brasília',
    '',
    '',
    'DF',
    0
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CepComponent ],
      providers: [ CepService ]
    });
    fixture = TestBed.createComponent(CepComponent);
    cepComponent = fixture.componentInstance;
    cepServiceTest = fixture.debugElement.injector.get(CepService);

    fixture.detectChanges();
  });


  it('Deve chamar o método buscaCep no serviço', () => {
    spyOn(cepServiceTest, 'buscaCep');
    const cepEl = fixture.debugElement.query(By.css('input'));
    cepEl.nativeElement.value = cepTest;
    cepEl.triggerEventHandler('input', null);

    expect(cepServiceTest.buscaCep).toHaveBeenCalledWith(cepTest);
  });

  it('Não Deve chamar o método buscaCep no serviço CepService se o cep for menor que 8', () => {
    spyOn(cepServiceTest, 'buscaCep');
    const cepEl = fixture.debugElement.query(By.css('input'));
    const cepTxt = cepTest.substr(0, 4);
    cepEl.nativeElement.value = cepTxt;
    cepEl.triggerEventHandler('input', null);

    expect(cepServiceTest.buscaCep).not.toHaveBeenCalledWith(cepTxt);
  });

  it('Não Deve chamar o método buscaCep no serviço CepService com formatação', () => {
    spyOn(cepServiceTest, 'buscaCep');
    cepComponent.placeholder = CEP_MASK;
    const cepEl = fixture.debugElement.query(By.css('input'));
    cepEl.nativeElement.value = cepTestFormatado;
    cepEl.triggerEventHandler('input', null);

    expect(cepServiceTest.buscaCep).toHaveBeenCalledWith(cepTest);
  });

  it('Deve emitir um endereço quando o cep for digitado', () => {
    spyOn(cepServiceTest, 'buscaCep').and.returnValue(enderecoTest);
    let endereco: Endereco;
    cepComponent.comEndereco.subscribe((value) => endereco = value);

    const cepEl = fixture.debugElement.query(By.css('input'));
    cepEl.nativeElement.value = cepTest;

    cepEl.triggerEventHandler('input', null);

    expect(endereco.end).toBe(enderecoTest.end, 'O endereço é diferente');
    expect(endereco.bairro).toBe(enderecoTest.bairro, 'O bairro é diferente');
    expect(endereco.cep).toBe(enderecoTest.cep, 'O cep é diferente');
    expect(endereco.complemento).toBe(enderecoTest.complemento, 'O complemento é diferente');
    expect(endereco.complemento2).toBe(enderecoTest.complemento2, 'O complemento2 é diferente');
    expect(endereco.uf).toBe(enderecoTest.uf);
  });


});
