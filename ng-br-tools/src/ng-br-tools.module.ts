import { EstadoComponent } from './components/estado/estado.component';
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
import { CepComponent } from './components/cep/cep.component';


@NgModule({
  declarations: [
    CepComponent,
    MaskPatternDirective,
    CepPatternDirective,
    CpfPatternDirective,
    CnpjPatternDirective,
    MaskPatternPipe,
    CepPatternPipe,
    CpfPatternPipe,
    CnpjPatternPipe,
    CPFValidator,
    CNPJValidator,
    EstadoComponent,
  ],
  imports: [
    CommonModule
  ],
  providers: [],
  exports: [
    CepComponent,
    MaskPatternDirective,
    CepPatternDirective,
    CpfPatternDirective,
    CnpjPatternDirective,
    MaskPatternPipe,
    CepPatternPipe,
    CpfPatternPipe,
    CnpjPatternPipe,
    CPFValidator,
    CNPJValidator,
    EstadoComponent,
  ],
})
export class NgBrToolsModule { }
