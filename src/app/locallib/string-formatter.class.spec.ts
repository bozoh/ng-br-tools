import { StringFormatter } from './string-formatter.class';


describe('Local lib: StringFormatter => maskedFormatter', () => {
  const cpfMask = '###.###.###-##';
  const cnpjMask = '__.___.___/____-__';
  const celMask = '+00 (00) 0-0000-0000';
});


describe('Local lib: StringFormatter => maskedFormatter', () => {
  const cpfMask = '###.###.###-##';
  const cnpjMask = '__.___.___/____-__';
  const celMask = '+00 (00) 0-0000-0000';

  it('Testando a formatação de um CPF, só números sem formatação', () => {
    const cpf1 = '12345678900';

    expect(StringFormatter.maskedFormatter(cpf1, cpfMask)).toBe('123.456.789-00');
  });

  it('Testando a formatação de um CPF, com números e formatação', () => {
    const cpf1 = '123.456.789-00';

    expect(StringFormatter.maskedFormatter(cpf1, cpfMask)).toBe('123.456.789-00');
  });

  it('Testando a formatação de um CPF, inserido parcialmente, tem que formatar parcialemtente', () => {
    let cpf1 = '123.4';
    let cpf2 = '1234';
    expect(StringFormatter.maskedFormatter(cpf1, cpfMask)).toBe('123.4##.###-##');
    expect(StringFormatter.maskedFormatter(cpf2, cpfMask)).toBe('123.4##.###-##');

    cpf1 = '123.456.7';
    cpf2 = '1234567';
    expect(StringFormatter.maskedFormatter(cpf1, cpfMask)).toBe('123.456.7##-##');
    expect(StringFormatter.maskedFormatter(cpf2, cpfMask)).toBe('123.456.7##-##');

    cpf1 = '123.456.789-0';
    cpf2 = '1234567890';
    expect(StringFormatter.maskedFormatter(cpf1, cpfMask)).toBe('123.456.789-0#');
    expect(StringFormatter.maskedFormatter(cpf2, cpfMask)).toBe('123.456.789-0#');
  });

  it('Testando formatação de um CPF com mais 11 dígitos, só pega os 11 primeiros', () => {
    // 16 dígitos, mas cpf só tem 11 (E)
    const cpf1 = '12345678900EEEEE';
    expect(StringFormatter.maskedFormatter(cpf1, cpfMask)).toBe('123.456.789-00');

  });

  it('Testando formatação CNPJ', () => {
    // 16 dígitos, mas cnpj só tem catorze (E)
    const cpnpj1 = '00000000000000EEEE';
    expect(StringFormatter.maskedFormatter(cpnpj1, cnpjMask)).toBe('00.000.000/0000-00');
  });

  it('Testando formatação Telefone celular (com espaço em branco), com código do país e de área', () => {
    // também tem caracteres a mais (E)
    const cel1 = '0000000000000';
    expect(StringFormatter.maskedFormatter(cel1, celMask)).toBe('+00 (00) 0-0000-0000');
  });
});


