import { CepPatternDirective } from './cep-pattern.directive';
import {
  Directive, ElementRef,
  Inject, EventEmitter,
  Output, Input, OnInit, HostListener, AfterViewInit, AfterViewChecked
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';

import { Endereco } from './../services/cep/endereco.model';
import { CepServiceIntfce } from './../services/cep/cep.service.interface';
import { CEP_SERVICE } from './../services/cep/cep.service.factory';
import { StringFormatter, CEP_MASK } from '../locallib/string-formatter.class';
import { MaskPatternDirective } from './mask-pattern.directive';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ng-br-tools-cep-search]'
})
export class CepSearchDirective {
  // tslint:disable-next-line:no-input-rename
  @Output() onEndereco: EventEmitter<Endereco> = new EventEmitter<Endereco>();
  @Output() onError: EventEmitter<any> = new EventEmitter<any>();
  private _cepService: CepServiceIntfce;
  private _pattern;

  constructor(
    private cepEl: ElementRef,
    @Inject(CEP_SERVICE) cepService: CepServiceIntfce
  ) {
    this._cepService = cepService;
  }

  @HostListener('input', ['$event'])
  onInput(e) {
    const inputValue: string = (e.target as HTMLInputElement).value;
    const cepClear = StringFormatter.clearFormat(inputValue,
      this._pattern ? this._pattern : CEP_MASK);
    if (cepClear.length === 8) {
      this.doSearch(cepClear);
    }
  }

  private doSearch(cep: string): void {
    const resp = this._cepService.buscaCep(cep);
    if (resp instanceof Observable) {
      (resp as Observable<Endereco>).subscribe(
        (e: Endereco) => {
          this.onEndereco.emit(e);
        },
        (err: string) => {
          this.onError.emit(err);
        }
      );
    } else {
      (resp as Promise<Endereco>)
        .then((e: Endereco) => this.onEndereco.emit(e))
        .catch((err: string) => {
          this.onError.emit(err);
        });
    }
  }
}
