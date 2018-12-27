import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/js/modal.js';
import { NegociacaoController } from './controllers/NegociacaoController.js';

$('h1').on('click', () => alert('Foi clicado!'));
console.log('Função adicionada pelo Bootstrap:');
console.log($('h1').modal);

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

// fetch('http://localhost:3000/negociacoes', config)
//   .then(() => console.log('Dados enviados com sucesso.'));
