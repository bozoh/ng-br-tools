import { CpfComponent } from './compoments/cpf/cpf.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { NgBrToolsModule, CEP_SERVICE,
  CepServiceFactory, ESTADO_SERVICE,
  EstadoServiceFactory } from 'ng-br-tools';
  import { SigepWebCepService } from './services/sigep-web-cep.service';
  import { LstEstadosSimplesService } from './services/lst-estados-simples.service';
  import { LstEstadosIBGEService } from './services/lst-estados-ibge.service';

@NgModule({
  declarations: [
    AppComponent,
    CpfComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgBrToolsModule
  ],
  providers: [
    SigepWebCepService,
    {
      provide: CEP_SERVICE,
      useFactory: CepServiceFactory,
      deps: [SigepWebCepService]
    },
    LstEstadosSimplesService,
    {
      provide: ESTADO_SERVICE,
      useFactory: EstadoServiceFactory,
      deps: [LstEstadosSimplesService]
    }
    // LstEstadosIBGEService,
    // {
    //   provide: ESTADO_SERVICE,
    //   useFactory: EstadoServiceFactory,
    //   deps: [LstEstadosIBGEService]
    // }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
