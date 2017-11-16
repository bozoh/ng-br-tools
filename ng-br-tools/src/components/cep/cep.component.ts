import {
  Component, OnInit, ViewChild,
  Input, Output, EventEmitter, Inject
} from '@angular/core';
import { Observable } from 'rxjs/Observable';


import { Endereco } from './endereco.model';
import { StringFormatter } from '../../locallib/string-formatter.class';
import { CepServiceIntfce } from './cep.service.interface';
import { CEP_SERVICE } from './cep.service.factory';




@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ng-br-tools-cep',
  template: `<input #cep [ngClass]="class" [ngStyle]="style" type="text" (input)="buscaCep(cep.value)">`,
  styleUrls: ['./cep.component.css'],

})
export class CepComponent implements OnInit {

  @ViewChild('cep') cepEl;

  private cepService: CepServiceIntfce = null;
  @Input() placeholder;
  @Input() style;
  @Input() class;

  /*
    Emite o endereço do cep digitado
  */
  @Output()
  onEndereco: EventEmitter<Endereco> = new EventEmitter<Endereco>();
  /*
   Emite o erro, principalemnte se o endereço não for encontrato
  */
  @Output()
  onError: EventEmitter<string> = new EventEmitter<string>();

  constructor(@Inject(CEP_SERVICE) cepService: CepServiceIntfce ) {
    this.cepService = cepService;
  }


  ngOnInit() {
    if (!this.cepService) {
      throw new Error('Attribute "cepSservice" is required');
    }
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
    if (cepClear.length === 8) {
      const resp = this.cepService.buscaCep(cepClear);

      if (resp instanceof Observable) {
        (<Observable<Endereco>>resp).subscribe(
          (e: Endereco) => {
            this.onEndereco.emit(e);
          },
          (err: string) => {
            this.onError.emit(err);
          }
        );
      } else {
        (<Promise<Endereco>>resp).then(
          (e: Endereco) => this.onEndereco.emit(e)
        ).catch(
          (err: string) => {
            this.onError.emit(err);
          }
        );
      }
    }
  }
}
