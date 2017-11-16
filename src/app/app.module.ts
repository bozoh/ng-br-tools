import { NgBrToolsModule, CEP_SERVICE, cepServiceFactory } from 'ng-br-tools';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SigepWebCepService } from './services/sigep-web-cep.service';



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
