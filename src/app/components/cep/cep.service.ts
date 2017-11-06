import { Endereco } from './endereco.model';
import { Injectable } from '@angular/core';

@Injectable()
export class CepService {
  constructor() { }

  buscaCep(cep: string): Endereco {
    return null;
  }
}
