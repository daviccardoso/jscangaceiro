const stores = ['negociacoes'];
let connection = null;
let close = null;

export class ConnectionFactory {
  constructor() {
    throw new Error('Não é possível criar instâncias dessa classe');
  }

  static getConnection() {
    return new Promise((resolve, reject) => {
      if (connection) return resolve(connection);

      const openRequest = indexedDB.open('jscangaceiro', 2);

      openRequest.addEventListener('upgradeneeded', e =>
        this._createStores(e.target.result)
      );

      openRequest.addEventListener('success', e => {
        connection = e.target.result;
        close = connection.close.bind(connection);

        connection.close = () => {
          throw new Error('Não é possível fechar diretamente a conexão.');
        }

        resolve(e.target.result);
      });

      openRequest.addEventListener('error', e =>
        reject(e.target.error.name)
      );

    });
  }

  static closeConnection() {
    if (connection) {
      close();
    }
  }

  static _createStores(connection) {
    stores.forEach(store => {
      if (connection.objectStoreNames.contains(store)) {
        connection.deleteObjectStore(store);
      }

      connection.createObjectStore(store, { autoIncrement: true });
    });
  }
}
