import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { EstadoServiceIntfce, Estado } from 'ng-br-tools';





/**
 *  Essa é uma implementação de exemplo e não deve ser usada em produção
 *  deve-se implementar, no beckend, uma chamada que:
 *  1- faca a solicitação e retorne uma lista de endereços
 *  2- repasse a solicitação para o servidor desejado, e retorne a resposta (proxy)
 *
 *  http://qnimate.com/same-origin-policy-in-nutshell/
 *  https://www.thepolyglotdeveloper.com/2014/08/bypass-cors-errors-testing-apis-locally/
 *  https://juristr.com/blog/2016/11/configure-proxy-api-angular-cli/
 *  https://github.com/angular/angular-cli/issues/4322
 *  https://cors-anywhere.herokuapp.com/
 */
@Injectable()
export class LstEstadosIBGEService implements EstadoServiceIntfce {
  private _proxy: string;
  private url: string;
  private opts: RequestOptions;
  constructor(private http: Http ) { }


  init(): null {
    // Chama o proxy ao invés so endereço da API e localidades do IBGE.
    // @See https://servicodados.ibge.gov.br/api/docs/localidades

    this.url = '/localidades/estados';
    return;
  }

  buscaEstados(): Observable<Estado[]> {
    return this.http.get(this.url)
    .map(this._parseEstados)
    .catch(this._parseError);
  }

  private _parseEstados(res: Response): EstadoIBGE[] {
    const estados: EstadoIBGE[] = res.json();
    estados.map((e: EstadoIBGE) => e.bandeira = `assets/bandeiras/${e.sigla}.svg`);
    return estados;
  }

  private _parseError(err: any): ErrorObservable {
    const errMsg = (err.message) ? err.message :
        err.status ? `${err.status} - ${err.statusText}` : 'Server error';
    console.error(errMsg); // log to console
    return Observable.throw(errMsg);
  }

}

export class EstadoIBGE extends Estado {
  constructor(id?: number, nome?: string, sigla?: string, regiao?: any) {
    const imgFolder = 'assets/bandeiras';
    super(nome, sigla, `${imgFolder}/${sigla}.svg`);
  }
}
