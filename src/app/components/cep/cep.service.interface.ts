import { CepServiceIntfce } from './cep.service.interface';
import { Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs/Observable';


import { Endereco } from './endereco.model';


export interface CepServiceIntfce {
  init(): void;
  buscaCep(cep: string): Observable<Endereco> | Promise<Endereco>;
}

export let CEP_SERVICE = new InjectionToken<CepServiceIntfce>('cep.service');

export let cepServiceFactory = (cepService: CepServiceIntfce) => {
  cepService.init();
  return cepService;
};

