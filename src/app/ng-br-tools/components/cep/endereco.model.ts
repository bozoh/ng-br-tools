export class Endereco {
  constructor (
    public endereco?: string,
    public bairro?: string,
    public cep?: string,
    public cidade?: string,
    public complemento?: string,
    public complemento2?: string,
    public uf?: string,
    public id?: number
  ) {}
}
