class Negociacoes {
    constructor(armadilha) {
        this._negociacoes = [];
        this._armadilha = armadilha;
        Object.freeze(this);
    }

    get volumeTotal() {
        return this._negociacoes
            .reduce((total, negociacao) =>
                total + negociacao.volume, 0);
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
        this._armadilha(this);
    }

    paraArray() {
        return [].concat(this._negociacoes);
    }

    esvazia() {
        this._negociacoes.length = 0;
        this._armadilha(this);
    }
}
