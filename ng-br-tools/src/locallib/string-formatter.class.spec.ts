import { StringFormatter } from './string-formatter.class';


describe('Local lib: StringFormatter => maskedFormatter', () => {
  let cpfFmt;
  let cnpjFmt;
  let celFmt;
  let dateFmt;

  beforeAll(() => {
    cpfFmt = new StringFormatter('###.###.###-##');
    cnpjFmt = new StringFormatter('__.___.___/____-__');
    celFmt = new StringFormatter('+00 (00) 0-0000-0000');
    dateFmt = new StringFormatter('DD/MM/AAAA', ['D', 'M', 'A']);

  });

  it('Testando a formatação de um CPF, só números sem formatação', () => {
    const cpf1 = '12345678900';
    expect(cpfFmt.format(cpf1)).toBe('123.456.789-00');
  });

  it('Testando a formatação de um CPF, com números e formatação', () => {
    const cpf1 = '123.456.789-00';
    expect(cpfFmt.format(cpf1)).toBe('123.456.789-00');
  });

  it('Testando a formatação de um CPF, inserido parcialmente, tem que formatar parcialemtente', () => {
    let cpf1 = '123.4';
    let cpf2 = '1234';
    expect(cpfFmt.format(cpf1)).toBe('123.4##.###-##');
    expect(cpfFmt.format(cpf2)).toBe('123.4##.###-##');

    cpf1 = '123.456.7';
    cpf2 = '1234567';
    expect(cpfFmt.format(cpf1)).toBe('123.456.7##-##');
    expect(cpfFmt.format(cpf2)).toBe('123.456.7##-##');

    cpf1 = '123.456.789-0';
    cpf2 = '1234567890';
    expect(cpfFmt.format(cpf1)).toBe('123.456.789-0#');
    expect(cpfFmt.format(cpf2)).toBe('123.456.789-0#');
  });

  it('Testando a formatação de Datas', () => {
    // só números
    expect(dateFmt.format('10102010')).toBe('10/10/2010');

    // parcial só números
    expect(dateFmt.format('10')).toBe('10/MM/AAAA');
    expect(dateFmt.format('101')).toBe('10/1M/AAAA');
    expect(dateFmt.format('101020')).toBe('10/10/20AA');

    // mais caractéres que a máscara só numeros
    expect(dateFmt.format('10102010EEEEEE')).toBe('10/10/2010');

    // número e formatação
    expect(dateFmt.format('10/10/2010')).toBe('10/10/2010');

    // parcial números e formatação
    expect(dateFmt.format('10')).toBe('10/MM/AAAA');
    expect(dateFmt.format('10/1')).toBe('10/1M/AAAA');
    expect(dateFmt.format('10/10/20')).toBe('10/10/20AA');

    // mais caractéres que a máscara números e formatação
    expect(dateFmt.format('10/10/2010EEEEEE')).toBe('10/10/2010');
    expect(dateFmt.format('10/10/2010/EEEEEE')).toBe('10/10/2010');

  });

  it('Testando formatação de um CPF com mais 11 dígitos, só pega os 11 primeiros', () => {
    // 16 dígitos, mas cpf só tem 11 (E)
    const cpf1 = '12345678900EEEEE';
    expect(cpfFmt.format(cpf1)).toBe('123.456.789-00');

  });

  it('Testando formatação CNPJ', () => {
    // 16 dígitos, mas cnpj só tem catorze (E)
    const cpnpj1 = '00000000000000EEEE';
    expect(cnpjFmt.format(cpnpj1)).toBe('00.000.000/0000-00');
  });

  it('Testando formatação Telefone celular (com espaço em branco), com código do país e de área', () => {
    // também tem caracteres a mais (E)
    const cel1 = '0000000000000';
    expect(celFmt.format(cel1)).toBe('+00 (00) 0-0000-0000');
  });
});


