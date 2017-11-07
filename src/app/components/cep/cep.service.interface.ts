import { Endereco } from './endereco.model';
import { Injectable } from '@angular/core';

export interface CepServiceIntfce {
  init(): null;
  buscaCep(cep: string): Endereco;
}
