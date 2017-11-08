import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Endereco } from './endereco.model';

export interface CepServiceIntfce {
  init(): void;
  buscaCep(cep: string): Observable<Endereco> | Promise<Endereco>;
}
