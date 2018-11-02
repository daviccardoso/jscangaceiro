class NegociacaoDao {
    constructor(connection) {
        this._connection = connection;
        this._store = 'negociacoes';
    }

    adiciona(negociacao) {
        return new Promise((resolve, reject) => {
            const request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(negociacao);

            request.addEventListener('success', e => resolve());
            request.addEventListener('error', e => {
                console.error(e.target.error);
                reject('Não foi possível salvar a negociação.');
            });
        });
    }

    listaTodas() {
        return new Promise((resolve, reject) => {
            const negociacoes = [];

            const cursor = this._connection
                .transaction([this._store], 'readonly')
                .objectStore(this._store)
                .openCursor();

            cursor.addEventListener('success', e => {
                const atual = e.target.result;

                if (atual) {
                    negociacoes.push(
                        new Negociacao(
                            atual.value._data,
                            atual.value._quantidade,
                            atual.value._valor
                        )
                    );

                    atual.continue();
                } else {
                    resolve(negociacoes);
                }
            });

            cursor.addEventListener('error', e => {
                console.error(e.target.error);
                reject('Não foi possível listar as negociações.');
            });
        });
    }

    apagaTodas() {
        return new Promise((resolve, reject) => {
            const request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear();

            request.addEventListener('success', () => resolve());
            request.addEventListener('error', e => {
                console.error(e.target.error);
                reject('Não foi possível apagar as negociações.');
            });
        });
    }
}
