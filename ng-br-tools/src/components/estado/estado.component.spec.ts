/* tslint:disable:no-unused-variable */
import { fakeAsync, tick, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Estado } from './estado.model';
import { EstadoComponent } from './estado.component';
import { EstadoServiceIntfce } from './estado.service.interface';
import { ESTADO_SERVICE, EstadoServiceFactory } from './estado.service.factory';
import { debug } from 'util';



class MockedEstadoService implements EstadoServiceIntfce {
  init(): void { }
  buscaEstados(): Promise<Estado[]> {
    const estados: Estado[] = [new Estado('Teste', 'TE')];
    return new Promise((resolve, err) => resolve(estados));
  }
}

describe('EstadoComponent', () => {
  let estadoComponent: EstadoComponent;
  let fixture: ComponentFixture<EstadoComponent>;
  let estadoServiceTest: EstadoServiceIntfce;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadoComponent ],
      providers: [
        MockedEstadoService,
        {
          provide: ESTADO_SERVICE,
          useFactory: EstadoServiceFactory,
          deps: [MockedEstadoService]
        }
      ],
    }).compileComponents().then(() => {
      // fixture = TestBed.createComponent(EstadoComponent);
      // estadoComponent = fixture.componentInstance;
      estadoServiceTest = TestBed.get(ESTADO_SERVICE);
      // fixture.detectChanges();
    });
  }));

  it('Serviço de lista de estados está corretamente injetado', () => {
    expect(estadoServiceTest instanceof MockedEstadoService).toBeTruthy();
  });

  it('Deve chamar o método buscaEstados no serviço', () => {
    spyOn(estadoServiceTest, 'buscaEstados').and.callThrough();
    fixture = TestBed.createComponent(EstadoComponent);
    estadoComponent = fixture.componentInstance;
    fixture.detectChanges();
    expect(estadoServiceTest.buscaEstados).toHaveBeenCalled();
  });


  it('Deve emitir um estado quando for selecionato ', fakeAsync(() => {
    fixture = TestBed.createComponent(EstadoComponent);
    estadoComponent = fixture.componentInstance;
    let el: DebugElement;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      el = fixture.debugElement.query(By.css('#item'));
    });
    tick();
    expect(el).toBeDefined();
    expect(el).not.toBeNull();

    let estadoTest: Estado;
    estadoComponent.onEstado.subscribe((value) => estadoTest = value);
    el.triggerEventHandler('click', null);
    fixture.detectChanges();
    tick();

    // expect(estadoTest).toBeDefined('Nenhum estado retornado');
    // expect(estadoTest.nome).toBe('Teste', 'O nome do estado é diferente');
    // expect(estadoTest.sigla).toBe('TE', 'A sigla é diferente');
  }));
});
