import { Observable } from 'rxjs/Observable';

import { Estado, EstadoServiceIntfce } from 'ng-br-tools';

export class LstEstadosSimplesService implements EstadoServiceIntfce {

  private readonly _imgFolder = 'assets/bandeiras';
  private _estados: Estado[] = [];
  init(): void {
      this._estados = [
        new Estado('Maranhão', 'MA', `${this._imgFolder}/MA.svg`),
        new Estado('Acre', 'AC', `${this._imgFolder}/AC.svg`),
        new Estado('Alagoas', 'AL', `${this._imgFolder}/AL.svg`),
        new Estado('Amazonas', 'AM', `${this._imgFolder}/AM.svg`),
        new Estado('Amapá', 'AP', `${this._imgFolder}/AP.svg`),
        new Estado('Bahia', 'BA', `${this._imgFolder}/BA.svg`),
        new Estado('Ceará', 'CE', `${this._imgFolder}/CE.svg`),
        new Estado('Distrito Federal', 'DF', `${this._imgFolder}/DF.svg`),
        new Estado('Espírito Santo', 'ES', `${this._imgFolder}/ES.svg`),
        new Estado('Goáis', 'GO', `${this._imgFolder}/GO.svg`),
        new Estado('Minas Gerais', 'MG', `${this._imgFolder}/MG.svg`),
        new Estado('Mato Grosso', 'MT', `${this._imgFolder}/MT.svg`),
        new Estado('Mato Grosso do Sul', 'MS', `${this._imgFolder}/MS.svg`),
        new Estado('Pará', 'PA', `${this._imgFolder}/PA.svg`),
        new Estado('Pernambuco', 'PE', `${this._imgFolder}/PE.svg`),
        new Estado('Paraíba', 'PB', `${this._imgFolder}/PB.svg`),
        new Estado('Piauí', 'PI', `${this._imgFolder}/PI.svg`),
        new Estado('Paraná', 'PR', `${this._imgFolder}/PR.svg`),
        new Estado('Rio de Janeiro', 'RJ', `${this._imgFolder}/RJ.svg`),
        new Estado('Rio Grande do Norte', 'RN', `${this._imgFolder}/RN.svg`),
        new Estado('Rondônia', 'RO', `${this._imgFolder}/RO.svg`),
        new Estado('Roraima', 'RR', `${this._imgFolder}/RR.svg`),
        new Estado('Rio Grande do Sul', 'RS', `${this._imgFolder}/RS.svg`),
        new Estado('Santa Catarina', 'SC', `${this._imgFolder}/SC.svg`),
        new Estado('Sergipe', 'SE', `${this._imgFolder}/SE.svg`),
        new Estado('São Paulo', 'SP', `${this._imgFolder}/SP.svg`),
        new Estado('Tocantins', 'TO', `${this._imgFolder}/TO.svg`)
    ];
  }
  buscaEstados(): Promise<Estado[]> {
    return new Promise((resolve, err) => resolve(this._estados));
  }

}
