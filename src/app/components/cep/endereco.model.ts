export class Endereco {
  // Modelo / xml retornado pelo correios
  // <bairro>Grajaú</bairro><cep>20540004</cep>
  // <cidade>Rio de Janeiro</cidade><complemento></complemento>
  // <complemento2>- de 872 ao fim - lado par</complemento2>
  // <end>Rua Barão de Mesquita</end>
  // <id>0</id>
  // <uf>RJ</uf>
  constructor (
    public end?: string,
    public bairro?: string,
    public cep?: string,
    public cidade?: string,
    public complemento?: string,
    public complemento2?: string,
    public uf?: string,
    public id?: number
  ) {}
}
