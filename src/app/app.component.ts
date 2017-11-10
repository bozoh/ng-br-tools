import { Observable } from 'rxjs/Observable';
import { CepComponent } from './components/cep/cep.component';
import { Component, OnInit, Injectable, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Endereco } from './components/cep/endereco.model';
import { CepServiceIntfce } from './components/cep/cep.service.interface';
import { SigepWebCepService } from './locallib/services/sigep-web-cep.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(CepComponent) cepComponent: CepComponent;
  title = 'app';
  endereco: Endereco;
  hasEndereco = false;
  error: string;
  hasError = false;

  enderecoCep(e) {
    this.hasEndereco = true;
    this.hasError = false;
    this.endereco = e;
    console.log(e);
  }

  onError(e: string) {
    console.error('11111' + e);
    this.hasEndereco = false;
    this.endereco = null;
    this.error = e;
    this.hasError = true;
  }

  constructor(public cepService: SigepWebCepService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.cepComponent.onEndereco.catch((err) => {
    //   this.onError(err);
    //   return Observable.throw('-------------' + err);
    // });

  }
}
