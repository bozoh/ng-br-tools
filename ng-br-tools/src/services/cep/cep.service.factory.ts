import {InjectionToken} from '@angular/core';
import {CepServiceIntfce} from './cep.service.interface';

export let CEP_SERVICE = new InjectionToken<CepServiceIntfce>('cep.service');

export let CepServiceFactory = (cepService: CepServiceIntfce) => {
  cepService.init();
  return cepService;
};
