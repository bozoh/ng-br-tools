import {
  Directive, ElementRef,
  Inject, EventEmitter,
  Output, Input, OnInit
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';

import {EstadoServiceIntfce} from '../services/estado/estado.service.interface';
import { Estado } from '../services/estado/estado.model';
import { ESTADO_SERVICE } from './../services/estado/estado.service.factory';


@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ng-br-tools-lst-estados]'
})
export class LstEstadoDirective implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('order-by') orderBy = 'nome';
  @Output() onEstados: EventEmitter<Estado[]> = new EventEmitter<Estado[]>();

  private _estadoService: EstadoServiceIntfce;
  constructor(private el: ElementRef,
    @Inject(ESTADO_SERVICE) estadoService: EstadoServiceIntfce ) {
      this._estadoService = estadoService;
    }

    ngOnInit(): void {
      // Carregando os estados
      let resp = this._estadoService.buscaEstados();
      if (resp instanceof Promise) {
        resp = Observable.fromPromise((<Promise<Estado[]>>resp));
      }
      (<Observable<Estado[]>>resp).map((estados: Estado[]) => {
        return this._sortEstados(estados, this.orderBy);
      }).subscribe( (e: Estado[]) => this.onEstados.emit(e));
  }

  private _sortEstados(lst: Estado[], por = 'nome'): Estado[] {
    if (lst.length <= 1) {
      return lst;
    }
    if (por === 'nome') {
      return lst.slice(0).sort((e1, e2) => {
          if (e1.nome === e2.nome) { return 0; }
            return (e1.nome < e2.nome ) ? -1 : 1;
        });
    } else if (por === 'sigla') {
      return lst.slice(0).sort((e1, e2) => {
        if (e1.sigla === e2.sigla) { return 0; }
          return (e1.sigla < e2.sigla ) ? -1 : 1;
      });
    }
  }
}
