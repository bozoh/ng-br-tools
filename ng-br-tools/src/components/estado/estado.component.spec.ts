import { fakeAsync, tick, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { EstadoComponent } from './estado.component';
import { LstEstadoDirective } from './../../directive/lst-estado.directive';
import { Estado } from './../../services/estado/estado.model';
import { ESTADO_SERVICE, EstadoServiceFactory } from './../../services/estado/estado.service.factory';
import { EstadoServiceIntfce } from './../../services/estado/estado.service.interface';


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
      declarations: [ EstadoComponent, LstEstadoDirective ],
      providers: [
        MockedEstadoService,
        {
          provide: ESTADO_SERVICE,
          useFactory: EstadoServiceFactory,
          deps: [MockedEstadoService]
        }
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(EstadoComponent);
      estadoComponent = fixture.componentInstance;
      estadoServiceTest = fixture.debugElement.injector.get(ESTADO_SERVICE);
      // TestBed.get(ESTADO_SERVICE);
      fixture.detectChanges();
    });
  }));

  it('Serviço de lista de estados está corretamente injetado', () => {
    expect(estadoServiceTest instanceof MockedEstadoService).toBeTruthy();
  });

  it('Deve emitir um estado quando for selecionato ', fakeAsync(() => {
    // Adicionando um subscribe para obter o estado clicado
    let estadoTest: Estado;
    estadoComponent.onEstado.subscribe((value) => estadoTest = value);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    // Simulando um click no primeiro ítem da lista de estado
    // para disparar o evento do emiter e capturar o estado
    const el = fixture.debugElement.query(By.css('#item'));
    expect(el).toBeDefined();
    expect(el).not.toBeNull();
    el.triggerEventHandler('click', null);
    tick();
    fixture.detectChanges();
    expect(estadoTest).toBeDefined('Nenhum estado retornado');
    expect(estadoTest.nome).toBe('Teste', 'O nome do estado é diferente');
    expect(estadoTest.sigla).toBe('TE', 'A sigla é diferente');

  }));
});
