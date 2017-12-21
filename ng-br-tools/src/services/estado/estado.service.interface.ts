import { Observable } from 'rxjs/Observable';
import { Estado } from './estado.model';



export interface EstadoServiceIntfce {
  init(): void;
  buscaEstados(): Observable<Estado[]> | Promise<Estado[]>;
}
