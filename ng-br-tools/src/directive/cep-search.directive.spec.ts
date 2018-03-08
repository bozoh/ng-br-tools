import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, EventEmitter } from '@angular/core';

import { Endereco } from './../services/cep/endereco.model';
import { CepServiceIntfce } from './../services/cep/cep.service.interface';
import { CEP_SERVICE, CepServiceFactory } from './../services/cep/cep.service.factory';
import { CepSearchDirective } from './cep-search.directive';


// Fixtures para testar
@Component({
  // tslint:disable-next-line:component-selector
  template: `
  <input ng-br-tools-cep-search (onEndereco)="setEndereco($event)" ng-br-tools-mask-pattern='##.###-###' >
  `
})
class TestCepDirectiveComponent {
  _endereco: Endereco;
  setEndereco(e) {
    this._endereco = e;
  }
}


class MockedCepService implements CepServiceIntfce {
  private endereco: Endereco;
  init(): void { }
  buscaCep(): Promise<Endereco> {
    return new Promise((resolve, err) => resolve(this.endereco));
  }
  setEndereco(e: Endereco): void {
    this.endereco = e;
  }
}

describe('Directive: Teste da Diretiva (ng-br-tools-cep)', () => {
  let fixture: ComponentFixture<TestCepDirectiveComponent>;
  let directive: CepSearchDirective;
  let tstService: CepServiceIntfce;
  let cepInput: HTMLInputElement;

  // Criando um endereço de teste para ser retornado
  // pelo Serviço
  const testeEndereco: Endereco = new Endereco();

  function sendEvents(value) {
    const event = new Event('input', null);
    cepInput.value = value;
    cepInput.dispatchEvent(event);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CepSearchDirective, TestCepDirectiveComponent],
      providers: [
        MockedCepService,
        {
          provide: CEP_SERVICE,
          useFactory: CepServiceFactory,
          deps: [MockedCepService]
        }
      ],
    });
    fixture = TestBed.createComponent(TestCepDirectiveComponent);
    tstService = fixture.debugElement.injector.get(CEP_SERVICE);
    directive = fixture.debugElement.query(By.directive(CepSearchDirective))
      .injector.get(CepSearchDirective);


    cepInput = fixture.debugElement
        .queryAll(By.directive(CepSearchDirective))[0].nativeElement as HTMLInputElement;

    // Inicializando o endereço de teste
    testeEndereco.endereco = 'Teste';
    testeEndereco.complemento = 'Complemento teste';
    testeEndereco.complemento2 = 'Complemento 2 teste';
    testeEndereco.bairro = 'Bairro Teste';
    testeEndereco.cep = '12345-123';
    testeEndereco.cidade = 'Cidade Teste';
    testeEndereco.uf = 'UF teste';

    // Atribuindo ao serviço
    (tstService as MockedCepService).setEndereco(testeEndereco);
  });

  it('Deve ter 1 instância', () => {
    fixture.detectChanges();
    const cepInputs = fixture.debugElement
        .queryAll(By.directive(CepSearchDirective));
    expect(cepInputs.length).toEqual(1);
  });

  it('Deve chamar o método buscaCep no serviço', () => {
    spyOn(tstService, 'buscaCep');
    sendEvents(testeEndereco.cep);
    fixture.detectChanges();

    expect(tstService.buscaCep).toHaveBeenCalled();
  });

  it('Não Deve chamar o método buscaCep no serviço CepService se o cep for menor que 8', () => {
    spyOn(tstService, 'buscaCep');
    const cepTxt = '12345';
    sendEvents(cepTxt);
    fixture.detectChanges();

    expect(tstService.buscaCep).not.toHaveBeenCalledWith(cepTxt);
  });

  it('Não Deve chamar o método buscaCep no serviço CepService com formatação', () => {
    spyOn(tstService, 'buscaCep');
    const cepTxt = '12345-123';
    sendEvents(cepTxt);
    fixture.detectChanges();
    expect(tstService.buscaCep).toHaveBeenCalled();
    expect(tstService.buscaCep).not.toHaveBeenCalledWith(cepTxt);
    expect(tstService.buscaCep).toHaveBeenCalledWith(cepTxt.replace('-', ''));
  });

  it('Deve emitir um endereço quando o cep for digitado', fakeAsync(() => {
    let endereco: Endereco;
    directive.onEndereco.subscribe((value) => endereco = value);
    sendEvents('12345-123');
    fixture.detectChanges();
    tick();

    expect(endereco.endereco).toBe(testeEndereco.endereco, 'O endereço é diferente');
    expect(endereco.bairro).toBe(testeEndereco.bairro, 'O bairro é diferente');
    expect(endereco.cep).toBe(testeEndereco.cep, 'O cep é diferente');
    expect(endereco.complemento).toBe(testeEndereco.complemento, 'O complemento é diferente');
    expect(endereco.complemento2).toBe(testeEndereco.complemento2, 'O complemento2 é diferente');
    expect(endereco.uf).toBe(testeEndereco.uf, 'A UF é diferente');
  }));
});
