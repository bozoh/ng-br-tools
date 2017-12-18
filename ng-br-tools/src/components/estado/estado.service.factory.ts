import {InjectionToken} from '@angular/core';
import { Estado } from './estado.model';
import { EstadoServiceIntfce} from './estado.service.interface';


export let ESTADO_SERVICE = new InjectionToken<EstadoServiceIntfce>('estado.service');

export let EstadoServiceFactory = (estadoService: EstadoServiceIntfce) => {
  estadoService.init();
  return estadoService;
};
