# NgBrTools
[![Build Status](https://travis-ci.org/bozoh/ng-br-tools.svg?branch=master)](https://travis-ci.org/bozoh/ng-br-tools)
[![Greenkeeper badge](https://badges.greenkeeper.io/bozoh/ng-br-tools.svg)](https://greenkeeper.io/)

Utilitário feito em angular 4/5 específico para sistemas brasileiros.

## O que essa lib possui

1. Validador e Formatador de CPF
1. Validador e Formatador de CNPJ
1. Formatador de texto genérico
1. Formatador de CEP e auxílio para a busca do CEP
1. Lista de estados

## Instalação

Para instalar basta utilizar o comando:

```bash
npm install ng-br-tools
```

## Servidor de exemplo

Esse repositório lib vem com um projeto de exemplo do uso da lib, para rodá-lo execute `npm start`. Depois só usar o endereço `http://localhost:4200/` em seu navegador.

## Como gerar um Build

O código fonte da lib se encontram na pasta `ng-br-tools`, e para fazer um build e gerar a lib deve executar `npm build:lib`

## Executando os testes

O projeto já está configurado para rodar qualquer teste criado tanto na lib como no projeto principal `app`, e para rodar o teste basta executar `npm test`.
