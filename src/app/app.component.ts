import { Endereco } from './components/cep/endereco.model';
import { SigebWsCepService } from './locallib/services/sigeb-ws-cep.service';
import { CepServiceIntfce } from './components/cep/cep.service.interface';
import { Component, OnInit, Injectable, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent implements OnInit {
  title = 'app';

  enderecoCep(e) {
    console.log(e);
  }

  constructor(public cepService: SigebWsCepService) {
  }

  ngOnInit() {
  }
}
