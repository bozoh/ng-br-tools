import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ng-br-tools-estados',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('hide-flags') _hideFlags = false;

  // tslint:disable-next-line:no-input-rename
  @Input('txt-position') _txtPosition;

  // tslint:disable-next-line:no-input-rename
  @Input('flg-position') _flagPosition;

  private _estados = [];
  constructor() {
    const estados = [
      {nome: 'Acre', value: 'AC'},
      {nome: 'Alagoas', value: 'AL'},
      {nome: 'Amazonas', value: 'AM'},
      {nome: 'Amapá', value: 'AP'},
      {nome: 'Bahia', value: 'BA'},
      {nome: 'Ceará', value: 'CE'},
      {nome: 'Distrito Federal', value: 'DF'},
      {nome: 'Espírito Santo', value: 'ES'},
      {nome: 'Goáis', value: 'GO'},
      {nome: 'Maranhão', value: 'MA'},
      {nome: 'Minas Gerais', value: 'MG'},
      {nome: 'Mato Grosso', value: 'MT'},
      {nome: 'Mato Grosso do Sul', value: 'MS'},
      {nome: 'Pará', value: 'PA'},
      {nome: 'Pernambuco', value: 'PE'},
      {nome: 'Paraíba', value: 'PB'},
      {nome: 'Piauí', value: 'PI'},
      {nome: 'Paraná', value: 'PR'},
      {nome: 'Rio de Janeiro', value: 'RJ'},
      {nome: 'Rio Grande do Norte', value: 'RN'},
      {nome: 'Rondônia', value: 'RO'},
      {nome: 'Roraima', value: 'RR'},
      {nome: 'Rio Grande do Sul', value: 'RS'},
      {nome: 'Santa Catarina', value: 'SC'},
      {nome: 'Sergipe', value: 'SE'},
      {nome: 'São Paulo', value: 'SP'},
      {nome: 'Tocantins', value: 'TO'}
    ];
    this._estados = estados.slice(0).sort((e1, e2) => {
      if (e1.nome === e2.nome) { return 0; }
      return (e1.nome < e2.nome ) ? -1 : 1;
    });
  }

  ngOnInit(): void {
    if (!(this._txtPosition) && (!this._flagPosition)) {
      // No position is set using default values
      this._flagPosition = 'left';
      this._txtPosition = 'right';
    } else if (!(this._txtPosition) && (this._flagPosition)) {
      // Only flag-position was set
      if (this._flagPosition === 'right') {
        // if is set to right i must set txtPos to left
        this._txtPosition = 'left';
      }
    } else if ((this._txtPosition) && !(this._flagPosition)) {
      // Only txt-position was set
      if (this._txtPosition === 'right') {
        // if is set to right i must set flagPos to left
        this._flagPosition = 'left';
      }
    } else if (this._flagPosition === this._txtPosition) {
      // Either flag and txt postition have the same value
      // so fallback to the default values
      this._flagPosition = 'left';
      this._txtPosition = 'right';
    }
  }

  txtPosition() {
    return this._txtPosition === 'left';
  }

  flgPosition() {
    return !this._flagPosition || this._flagPosition === 'left';
  }

  get hideFlags(): boolean {
    return this._hideFlags;
  }

  get estados(): any[] {
    return this._estados.slice(0);
  }


}
