import { StringFormatter } from './../../locallib/string-formatter.class';
import { CepServiceIntfce } from './cep.service.interface';
import { Endereco } from './endereco.model';
import { Component, OnInit, Output, EventEmitter, Input, ViewChild, HostBinding } from '@angular/core';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ng-br-tools-cep',
  template: `<input #cep [ngClass]="class" [ngStyle]="style" type="text" (input)="buscaCep(cep.value)">`,
  styleUrls: ['./cep.component.css'],

})
export class CepComponent implements OnInit {

  @ViewChild('cep') cepEl;

  @Input() cepService: CepServiceIntfce = null;
  @Input() placeholder;
  @Input() style;
  @Input() class;


  @Output()
  comEndereco: EventEmitter<Endereco>;
  constructor() { }


  ngOnInit() {
    if (this.cepService) {
      this.cepService.init();
    } else {
      throw new Error('Attribute "cepSservice" is required');
    }
    this.comEndereco = new EventEmitter<Endereco>();
    if (this.placeholder) {
      this.cepEl.nativeElement.placeholder = this.placeholder;
    } else {
      this.cepEl.nativeElement.maxLength = 8;
    }
    if (this.style) {
      this.cepEl.nativeElement.style = this.style;
    }
    if (this.class) {
      this.cepEl.nativeElement.class = this.class;
    }
  }

  buscaCep(cep: string) {
    let cepClear = cep;
    if (this.placeholder) {
      cepClear = StringFormatter.clearFormat(cep, this.placeholder);
    }
    if (cepClear.length >= 8) {
        this.comEndereco.emit(this.cepService.buscaCep(cepClear));
    }
  }
}
