import { ConnectionFactory } from '../util/ConnectionFactory.js';
import { NegociacaoDao } from '../domain/negociacao/NegociacaoDao.js';

export function getNegociacaoDao() {
  return ConnectionFactory
    .getConnection()
    .then(conn => new NegociacaoDao(conn));
}
