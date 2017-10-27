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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
