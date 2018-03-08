import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    MaskPatternPipe,
    CepPatternPipe,
    CpfPatternPipe,
    CnpjPatternPipe,
    CPFValidator,
    CNPJValidator,
    LstEstadoDirective,
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
    MaskPatternPipe,
    CepPatternPipe,
    CpfPatternPipe,
    CnpjPatternPipe,
    CPFValidator,
    CNPJValidator,
    LstEstadoDirective,
  ],
})
export class NgBrToolsModule { }
