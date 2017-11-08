import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


import { CepServiceIntfce } from './../../components/cep/cep.service.interface';
import { Endereco } from './../../components/cep/endereco.model';

/**
 *  Essa é uma implementação de exemplo e não deve ser usada em produção
 *  deve-se implementar, no beckend, uma chamada que:
 *  1- faca a solicitação do cep e retorne um valor
 *  2- repasse a solicitação para o servidor desejado, e retorne a resposta (proxy)
 *
 *  Nesse exemplo é usado um proxy https://cors-anywhere.herokuapp.com/
 *  que possui o header Access-Control-Allow-Origin
 *  http://qnimate.com/same-origin-policy-in-nutshell/
 *  https://www.thepolyglotdeveloper.com/2014/08/bypass-cors-errors-testing-apis-locally/
 */
@Injectable()
export class SigebWsCepService implements CepServiceIntfce {
  proxy: string;
  private url: string;
  private opts: RequestOptions;
  init(): null {
    this.opts = new RequestOptions();
    this.opts.headers = this.setHeaders();
    this.url = 'https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente';
    // Esse proxy é necessário para evitar o No 'Access-Control-Allow-Origin', XHR Same origin
    // this.proxy = 'https://cors-anywhere.herokuapp.com/';
    this.proxy = '';
    return;
  }

  buscaCep(cep: string): Observable<Endereco> {
    return this.http.post(this.proxy + this.url, this.addSoapEnvelope(cep), this.opts)
      .map((res: Response) => this.parseXmlEndereco(res.text()));
  }
  private parseXmlEndereco(xml: string): Endereco {
    const parse = new DOMParser();
    const xmlData = parse.parseFromString(xml, 'application/xml');
    const retEnd = new Endereco();

    // <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    //   <soap:Body>
    //     <ns2:consultaCEPResponse xmlns:ns2="http://cliente.bean.master.sigep.bsb.correios.com.br/">
    //       <return>
    //         <bairro>Asa Norte</bairro>
    //         <cep>70002900</cep>
    //         <cidade>Brasília</cidade>
    //         <complemento></complemento>
    //         <complemento2></complemento2>
    //         <end>SBN Quadra 1 Bloco A</end>
    //         <id>0</id>
    //         <uf>DF</uf>
    //       </return>
    //     </ns2:consultaCEPResponse>
    //   </soap:Body>
    // </soap:Envelope>
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
// https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl
  constructor(private http: Http ) { }

}
