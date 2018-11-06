import { NegociacaoController } from './controllers/NegociacaoController.js';

const controller = new NegociacaoController();
const $ = document.querySelector.bind(document);

$('.form').addEventListener('submit', controller.adiciona.bind(controller));
$('#botao-apaga').addEventListener('click', controller.apaga.bind(controller));
$('#botao-importa').addEventListener('click', controller.importaNegociacoes.bind(controller));

const negociacao = { data: '2018-11-06', quantidade: 1, valor: 200 };
const headers = new Headers();
const body = JSON.stringify(negociacao);
const method = 'POST';

headers.set('Content-Type', 'application/json');

const config = {
  method,
  headers,
  body
};

fetch('/negociacoes', config)
  .then(() => console.log('Dados enviados com sucesso.'));
