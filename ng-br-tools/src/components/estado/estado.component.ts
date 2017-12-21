import { Component, OnInit, Input, Inject, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';

import { Estado } from '../../services/estado/estado.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ng-br-tools-estados',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('hide-flags') _hideFlags = false;
  // tslint:disable-next-line:no-input-rename
  @Input('hide-nomes') _hideNomes = false;
  // tslint:disable-next-line:no-input-rename
  @Input('hide-siglas') _hideSiglas = false;

  // tslint:disable-next-line:no-input-rename
  @Input('txt-position') _txtPosition;

  // tslint:disable-next-line:no-input-rename
  @Input('flg-position') _flagPosition;

  // tslint:disable-next-line:no-input-rename
  @Input('order-by') _orderBy = 'nome';
  /*
  Emite o estado selecionado
  */
  @Output()
  onEstado: EventEmitter<Estado> = new EventEmitter<Estado>();
  /*
  Emite o erro, se não conseguir obtar a lista de estadaos
  */
  @Output()
  onError: EventEmitter<string> = new EventEmitter<string>();

  private _estados: Estado[];
  private _selectedIdx = -1;

  constructor() { }

  ngOnInit(): void {
    if (!(this._txtPosition) && (!this._flagPosition)) {
      // No position is set using default values
      this._flagPosition = 'left';
      this._txtPosition = 'right';
    } else if (!(this._txtPosition) && (this._flagPosition)) {
      // Only flag-position was set
      if (this._flagPosition === 'right') {
        // if is set to right i must set txtPos to left
        this._txtPosition = 'left';
      }
    } else if ((this._txtPosition) && !(this._flagPosition)) {
      // Only txt-position was set
      if (this._txtPosition === 'right') {
        // if is set to right i must set flagPos to left
        this._flagPosition = 'left';
      }
    } else if (this._flagPosition === this._txtPosition) {
      // Either flag and txt postition have the same value
      // so fallback to the default values
      this._flagPosition = 'left';
      this._txtPosition = 'right';
    }
 }

  setSelected(e: Estado, idx: number) {
    this._selectedIdx = idx;
    this.onEstado.emit(e);
  }

  getSelected(): number {
    return this._selectedIdx;
  }

  txtPosition() {
    return this._txtPosition === 'left';
  }

  flgPosition() {
    return !this._flagPosition || this._flagPosition === 'left';
  }

  get hideFlags(): boolean {
    return this._hideFlags;
  }

  get hideNomes(): boolean {
    return this._hideNomes;
  }

  get hideSiglas(): boolean {
    return this._hideSiglas;
  }

  set estados(e: Estado[]) {
    this._estados = e;
  }
  get estados(): Estado[] {
    return this._estados;
  }
}
