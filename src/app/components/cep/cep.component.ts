import { StringFormatter } from './../../locallib/string-formatter.class';
import { CepService } from './cep.service';
import { Endereco } from './endereco.model';
import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ng-br-tools-cep',
  template: `<input #cep type="text" (input)="buscaCep(cep.value)">`,
  styleUrls: ['./cep.component.css'],

})
export class CepComponent implements OnInit {

  @ViewChild('cep') cepEl;

  @Input()
  placeholder;

  @Output()
  comEndereco: EventEmitter<Endereco>;
  constructor(private cepService: CepService) { }


  ngOnInit() {
    this.comEndereco = new EventEmitter<Endereco>();
    if (this.placeholder) {
      this.cepEl.nativeElement.placeholder = this.placeholder;
    }
  }

  buscaCep(cep: string) {
    let cepClear = cep;
    if (cep.length >= 8) {
      if (this.placeholder) {
        cepClear = StringFormatter.clearFormat(cep, this.placeholder);
      }
      this.comEndereco.emit(this.cepService.buscaCep(cepClear));
    }
  }

}
