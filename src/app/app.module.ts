import { SigebWsCepService } from './locallib/services/sigeb-ws-cep.service';
import { CepComponent } from './components/cep/cep.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { CPFValidator } from './validators/cpf.validator';
import { MaskPatternDirective } from './directive/mask-pattern.directive';

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
    SigebWsCepService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
