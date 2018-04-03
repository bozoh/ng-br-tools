import { DataPatternPipe } from './pipes/data-pattern.pipe';
import { DataPatternDirective } from './directive/data-pattern.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgBrToolsValidators } from './validators/ng-br-tools-validators';
import { CNPJValidator } from './validators/cnpj.validator';
import { CPFValidator } from './validators/cpf.validator';
import { MaskPatternPipe } from './pipes/mask-pattern.pipe';
import { CnpjPatternPipe } from './pipes/cnpj-pattern.pipe';
import { CpfPatternPipe } from './pipes/cpf-pattern.pipe';
import { CepPatternPipe } from './pipes/cep-pattern.pipe';
import { CnpjPatternDirective } from './directive/cnpj-pattern.directive';
import { CpfPatternDirective } from './directive/cpf-pattern.directive';
import { CepPatternDirective } from './directive/cep-pattern.directive';
import { MaskPatternDirective } from './directive/mask-pattern.directive';
import { CepSearchDirective } from './directive/cep-search.directive';
import { LstEstadoDirective } from './directive/lst-estado.directive';


@NgModule({
  declarations: [
    MaskPatternDirective,
    CepPatternDirective,
    CepSearchDirective,
    CpfPatternDirective,
    CnpjPatternDirective,
    DataPatternDirective,
    LstEstadoDirective,
    MaskPatternPipe,
    CepPatternPipe,
    CpfPatternPipe,
    CnpjPatternPipe,
    DataPatternPipe,
    CPFValidator,
    CNPJValidator,
  ],
  imports: [
    CommonModule
  ],
  providers: [],
  exports:  [
    MaskPatternDirective,
    CepPatternDirective,
    CepSearchDirective,
    CpfPatternDirective,
    CnpjPatternDirective,
    DataPatternDirective,
    LstEstadoDirective,
    MaskPatternPipe,
    CepPatternPipe,
    CpfPatternPipe,
    CnpjPatternPipe,
    DataPatternPipe,
    CPFValidator,
    CNPJValidator,
    NgBrToolsValidators
  ],
})
export class NgBrToolsModule { }
