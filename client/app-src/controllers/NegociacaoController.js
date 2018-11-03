import { Negociacoes } from '../domain/negociacao/Negociacoes.js';
import { NegociacoesView } from '../ui/views/NegociacoesView.js';
import { Mensagem } from '../ui/models/Mensagem.js';
import { MensagemView } from '../ui/views/MensagemView.js';
import { NegociacaoService } from '../domain/negociacao/NegociacaoService.js';
import { getNegociacaoDao } from '../util/DaoFactory.js';
import { DataInvalidaException } from '../ui/converters/DataInvalidaException.js';
import { Negociacao } from '../domain/negociacao/Negociacao.js';
import { Bind } from '../util/Bind.js';
import { DateConverter } from '../ui/converters/DateConverter.js';

export class NegociacaoController {
  constructor() {
    const $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');
    this._service = new NegociacaoService();
    this._negociacoes = new Bind(
      new Negociacoes(),
      new NegociacoesView('#negociacoes'),
      'adiciona', 'esvazia'
    );
    this._mensagem = new Bind(
      new Mensagem(),
      new MensagemView('#mensagemView'),
      'texto'
    );

    this._init();
  }

  _init() {
    getNegociacaoDao()
      .then(dao => dao.listaTodas())
      .then(negociacoes =>
        negociacoes.forEach(negociacao =>
          this._negociacoes.adiciona(negociacao)))
      .catch(err => this._mensagem.texto = err);
  }

  importaNegociacoes() {
    this._service.obterNegociacoesDoPeriodo()
      .then(negociacoes => {
        negociacoes.filter(novaNegociacao =>
          !this._negociacoes.paraArray().some(negociacaoExistente =>
            novaNegociacao.equals(negociacaoExistente)
          )
        )
          .forEach(negociacao => this._negociacoes.adiciona(negociacao));
        this._mensagem.texto = 'Negociações do período importadas com sucesso.';
      }
      ).catch(err => this._mensagem.texto = err);
  }

  adiciona(event) {
    try {
      event.preventDefault();

      const negociacao = this._criaNegociacao();

      getNegociacaoDao()
        .then(dao => dao.adiciona(negociacao))
        .then(() => {
          this._negociacoes.adiciona(negociacao);
          this._mensagem.texto = 'Negociação adicionada com sucesso.';
          this._limpaFormulario();
        })
        .catch(err => this._mensagem.texto = err);
    } catch (err) {
      if (err instanceof DataInvalidaException)
        this._mensagem.texto = err.message;
      else
        this._mensagem.texto = 'Um erro não esperado aconteceu. Entre em contato com o suporte.';
    }
  }

  apaga() {
    getNegociacaoDao()
      .then(dao => dao.apagaTodas())
      .then(() => {
        this._negociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso.';
      })
      .catch(err => this._mensagem.texto = err);
  }

  _limpaFormulario() {
    this._inputData.value = '';
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0.0;
    this._inputData.focus();
  }

  _criaNegociacao() {
    return new Negociacao(
      DateConverter.paraData(this._inputData.value),
      this._inputQuantidade.value,
      this._inputValor.value
    );
  }
}
