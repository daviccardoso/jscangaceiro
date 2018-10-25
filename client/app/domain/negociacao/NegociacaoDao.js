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

    listaTodos() {
        return new Promise((resolve, reject) => {

        });
    }
}
