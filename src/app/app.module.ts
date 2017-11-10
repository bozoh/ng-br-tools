import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { CepComponent } from './components/cep/cep.component';
import { AppComponent } from './app.component';
import { CPFValidator } from './validators/cpf.validator';
import { MaskPatternDirective } from './directive/mask-pattern.directive';
import { SigepWebCepService } from './locallib/services/sigep-web-cep.service';

@NgModule({
  declarations: [
    AppComponent,
    CPFValidator,
    MaskPatternDirective,
    CepComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [
    SigepWebCepService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
