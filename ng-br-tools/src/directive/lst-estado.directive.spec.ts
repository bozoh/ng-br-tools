import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LstEstadoDirective } from './lst-estado.directive';
import { Component, DebugElement } from '@angular/core';

import { EstadoServiceIntfce } from './../services/estado/estado.service.interface';
import { Estado } from './../services/estado/estado.model';
import { ESTADO_SERVICE, EstadoServiceFactory } from './../services/estado/estado.service.factory';


// Fixtures para testar
@Component({
  // tslint:disable-next-line:component-selector
  template: `
  <select (ng-br-tools-lst-estados)="setEstados($event)"></select>
  <div ng-br-tools-lst-estados></div>
  `
})
class TestLstEstadoDirectiveComponent {
  _estados: Estado[];
  setEstados(e) {
    this._estados = e;
  }
}


class MockedEstadoService implements EstadoServiceIntfce {
  init(): void { }
  buscaEstados(): Promise<Estado[]> {
    const estados: Estado[] = [new Estado('Teste-01', 'TZ'), new Estado('Teste-02', 'TA')];
    return new Promise((resolve, err) => resolve(estados));
  }
}

describe('Directive: LstEstadoDirective (ng-br-tools-lst-estados)', () => {
  let fixture: ComponentFixture<TestLstEstadoDirectiveComponent>;
  let lstEstadoComponent: TestLstEstadoDirectiveComponent;
  let directive: LstEstadoDirective;
  let testService: EstadoServiceIntfce;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LstEstadoDirective, TestLstEstadoDirectiveComponent],
      providers: [
        MockedEstadoService,
        {
          provide: ESTADO_SERVICE,
          useFactory: EstadoServiceFactory,
          deps: [MockedEstadoService]
        }
      ],
    });
    fixture = TestBed.createComponent(TestLstEstadoDirectiveComponent);
    testService = fixture.debugElement.injector.get(ESTADO_SERVICE);
    directive = fixture.debugElement.query(By.directive(LstEstadoDirective))
      .injector.get(LstEstadoDirective);
    lstEstadoComponent = fixture.componentInstance;
  });

  it('Deve ter 2 instâncias', () => {
    fixture.detectChanges();
    const maskedInputs = fixture.debugElement
        .queryAll(By.directive(LstEstadoDirective));
    expect(maskedInputs.length).toEqual(2);
  });

  it('Deve chamar o método buscaEstados no serviço', fakeAsync(() => {
    spyOn(testService, 'buscaEstados').and.callThrough();
    fixture.detectChanges();
    expect(testService.buscaEstados).toHaveBeenCalled();
  }));

  it('Deve retornar uma lista de estados', fakeAsync(() => {
    let estados: Estado[] = [];
    directive.onEstados.subscribe((e) => estados = e);
    // Não posso chamar no beforeEach pois presciso fazer um subcribe no onEstados
    // e esse só é emitido na criação do componente
    fixture.detectChanges();
    tick();
    expect(estados.length).toEqual(2);
    expect(estados[0].nome).toEqual('Teste-01');
    expect(estados[0].sigla).toEqual('TZ');
    expect(estados[1].nome).toEqual('Teste-02');
    expect(estados[1].sigla).toEqual('TA');
  }));

  it('O componente deve conter uma lista de estados', fakeAsync(() => {
    // Não posso chamar no beforeEach pois presciso fazer um subcribe no onEstados
    // e esse só é emitido na criação do componente
    fixture.detectChanges();
    tick();
    const estados = lstEstadoComponent._estados;
    expect(estados.length).toEqual(2);
    expect(estados[0].nome).toEqual('Teste-01');
    expect(estados[0].sigla).toEqual('TZ');
    expect(estados[1].nome).toEqual('Teste-02');
    expect(estados[1].sigla).toEqual('TA');
  }));

  it('Deve por em ordem de nome do estado se o order-by="nome"', fakeAsync(() => {
    let estados: Estado[] = [];
    directive.orderBy = 'nome';
    directive.onEstados.subscribe((e) => estados = e);
    // Não posso chamar no beforeEach pois presciso fazer um subcribe no onEstados
    // e esse só é emitido na criação do componente
    fixture.detectChanges();
    tick();
    expect(estados[0].nome).toEqual('Teste-01');
    expect(estados[1].nome).toEqual('Teste-02');
  }));

  it('Deve por em ordem de sigla do estado se o order-by="sigla"', fakeAsync(() => {
    let estados: Estado[] = [];
    directive.orderBy = 'sigla';
    directive.onEstados.subscribe((e) => estados = e);
    // Não posso chamar no beforeEach pois presciso fazer um subcribe no onEstados
    // e esse só é emitido na criação do componente
    fixture.detectChanges();
    tick();
    expect(estados[0].nome).toEqual('Teste-02');
    expect(estados[1].nome).toEqual('Teste-01');
  }));
});
