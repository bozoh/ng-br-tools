import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { CepServiceIntfce, Endereco } from 'ng-br-tools';





/**
 *  Essa é uma implementação de exemplo e não deve ser usada em produção
 *  deve-se implementar, no beckend, uma chamada que:
 *  1- faca a solicitação do cep e retorne um valor
 *  2- repasse a solicitação para o servidor desejado, e retorne a resposta (proxy)
 *
 *  http://qnimate.com/same-origin-policy-in-nutshell/
 *  https://www.thepolyglotdeveloper.com/2014/08/bypass-cors-errors-testing-apis-locally/
 *  https://juristr.com/blog/2016/11/configure-proxy-api-angular-cli/
 *  https://github.com/angular/angular-cli/issues/4322
 *  https://cors-anywhere.herokuapp.com/
 */
@Injectable()
export class SigepWebCepService implements CepServiceIntfce {
  private _proxy: string;
  private url: string;
  private opts: RequestOptions;

  constructor(private http: Http ) { }


  init(): null {
    this.opts = new RequestOptions();
    this.opts.headers = this.setHeaders();
    // Chama o proxy ao invés so endereço do SIGEP WEB dos correios.
    // Esse proxy é necessário para evitar o No 'Access-Control-Allow-Origin', XHR Same origin
    // pode ser comentado se iniciar o chrome com as opções --disable-web-security
    // --user-data-dir
    // @See https://www.thepolyglotdeveloper.com/2014/08/bypass-cors-errors-testing-apis-locally/
    //
    //this.url = 'https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente';
    this.url = '/AtendeCliente';

    return;
  }

  buscaCep(cep: string): Observable<Endereco> {
    return this.http.post(this.url, this.addSoapEnvelope(cep), this.opts)
    .map((res: Response) => this.parseXmlEndereco(res.text()))
    .catch((err: Response) => this.parseXmlError(err));
  }
  private parseXmlError(err: Response): ErrorObservable {
    let error: string;
    const parse = new DOMParser();
    const xmlData = parse.parseFromString(err.text(), 'application/xml');

    if (xmlData.getElementsByTagName('detail').length > 0) {
      error = xmlData.getElementsByTagName('detail').item(0).textContent.trim();
    } else {
      error = err.status + ' - ' + err.statusText;
    }
    return Observable.throw(error);
  }
  private parseXmlEndereco(xml: string): Endereco {
    const parse = new DOMParser();
    const xmlData = parse.parseFromString(xml, 'application/xml');
    const retEnd = new Endereco();

    retEnd.endereco = xmlData.getElementsByTagName('end').item(0).textContent.trim();
    retEnd.complemento = xmlData.getElementsByTagName('complemento').item(0).
    textContent.trim();
    retEnd.complemento2 = xmlData.getElementsByTagName('complemento2').item(0).
    textContent.trim();
    retEnd.bairro = xmlData.getElementsByTagName('bairro').item(0).textContent.trim();
    retEnd.cidade = xmlData.getElementsByTagName('cidade').item(0).textContent.trim();
    retEnd.cep = xmlData.getElementsByTagName('cep').item(0).textContent.trim();
    retEnd.uf = xmlData.getElementsByTagName('uf').item(0).textContent.trim();
    return retEnd;
  }

  private setHeaders(): Headers {
    const headers = new Headers();
    headers.set('Content-Type', 'text/xml;charset=UTF-8');
    return headers;

  }
  private addSoapEnvelope(cep: string): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:ns1="http://cliente.bean.master.sigep.bsb.correios.com.br/">
    <SOAP-ENV:Body>
    <ns1:consultaCEP>
    <cep>${cep}</cep>
    </ns1:consultaCEP>
    </SOAP-ENV:Body>
    </SOAP-ENV:Envelope>`;
  }

}
