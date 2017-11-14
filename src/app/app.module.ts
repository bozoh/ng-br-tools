import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { NgBrToolsModule } from './ng-br-tools/ng-br-tools.module';
import { SigepWebCepService } from './services/sigep-web-cep.service';
import { CEP_SERVICE, cepServiceFactory } from './ng-br-tools/components/cep/cep.service.factory';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgBrToolsModule
  ],
  providers: [
    SigepWebCepService,
    {
      provide: CEP_SERVICE,
      useFactory: cepServiceFactory,
      deps: [SigepWebCepService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
