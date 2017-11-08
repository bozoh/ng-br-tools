import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


import { CepServiceIntfce } from './../../components/cep/cep.service.interface';
import { Endereco } from './../../components/cep/endereco.model';


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
    this.proxy = 'https://cors-anywhere.herokuapp.com/';
    return;
  }

  buscaCep(cep: string): Observable<Endereco> {
    return this.http.post(this.proxy + this.url, this.addSoapEnvelope(cep), this.opts)
      .map((res: any) => this.parseXmlEndereco(res));
  }
  private parseXmlEndereco(res: Response): Endereco {
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

    //  Como esse serviço é só um exemplo, e não funciona devido ao XHR Same origin,
    //  No 'Access-Control-Allow-Origin', não foi feito um parser para a reposta SOAP,
    //  então sempre vai retornar o mesmo endereço
    return new Endereco(
      'SBN Quadra 1 Bloco A',
      'Asa Norte',
      '70002900',
      'Brasília',
      '',
      '',
      'DF',
      0
    );
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
