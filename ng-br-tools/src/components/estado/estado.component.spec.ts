import { EstadoComponent } from './estado.component';
/* tslint:disable:no-unused-variable */
import { fakeAsync, tick, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Estado } from './estado.model';
import { EstadoServiceIntfce } from './estado.service.interface';
import { ESTADO_SERVICE, EstadoServiceFactory } from './estado.service.factory';



class MockedEstadoService implements EstadoServiceIntfce {
  init(): void { }
  buscaEstados(): Observable<Estado[]> | Promise<Estado[]> {
    return null;
  }
}

describe('EstadoComponent', () => {
  let estadoComponent: EstadoComponent;
  let fixture: ComponentFixture<EstadoComponent>;
  let estadoServiceTest: EstadoServiceIntfce;

  beforeEach(() => {
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
    });

    fixture = TestBed.createComponent(EstadoComponent);
    estadoComponent = fixture.componentInstance;
    estadoServiceTest = TestBed.get(ESTADO_SERVICE);
    fixture.detectChanges();
  });


  it('Deve chamar o método buscaEstados no serviço', () => {
    spyOn(estadoServiceTest, 'buscaEstados');
    fixture = TestBed.createComponent(EstadoComponent);
    estadoComponent = fixture.componentInstance;
    expect(estadoServiceTest.buscaEstados).toHaveBeenCalled();
  });


  it('Deve emitir um estado quando for selecionato ', fakeAsync(() => {
  //   spyOn(estadoServiceTest, 'buscaCep').and.returnValue(Observable.of(enderecoTest));
  //   let endereco: Endereco;
  //   estadoComponent.onEndereco.subscribe((value) => endereco = value);

  //   const cepEl = fixture.debugElement.query(By.css('input'));
  //   cepEl.nativeElement.value = cepTest;

  //   cepEl.triggerEventHandler('input', null);
  //   tick();

  //   expect(endereco.endereco).toBe(enderecoTest.endereco, 'O endereço é diferente');
  //   expect(endereco.bairro).toBe(enderecoTest.bairro, 'O bairro é diferente');
  //   expect(endereco.cep).toBe(enderecoTest.cep, 'O cep é diferente');
  //   expect(endereco.complemento).toBe(enderecoTest.complemento, 'O complemento é diferente');
  //   expect(endereco.complemento2).toBe(enderecoTest.complemento2, 'O complemento2 é diferente');
  //   expect(endereco.uf).toBe(enderecoTest.uf);
  }));

});
