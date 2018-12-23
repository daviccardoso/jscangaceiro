import { NegociacaoController } from './controllers/NegociacaoController.js';

const controller = new NegociacaoController();

const dataAtual = new Date();
const negociacao = {
  data: `${dataAtual.getFullYear()}/${dataAtual.getMonth() + 1}/${dataAtual.getDate()}`,
  quantidade: 3,
  valor: 125
};
const headers = new Headers();
const body = JSON.stringify(negociacao);
const method = 'POST';

headers.set('Content-Type', 'application/json');

const config = {
  method,
  headers,
  body
};

fetch('http://localhost:3000/negociacoes', config)
  .then(() => console.log('Dados enviados com sucesso.'));
