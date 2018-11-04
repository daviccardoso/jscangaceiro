import { ConnectionFactory } from '../util/ConnectionFactory.js';
import { NegociacaoDao } from '../domain/negociacao/NegociacaoDao.js';

export async function getNegociacaoDao() {
  let conn = await ConnectionFactory.getConnection();
  return new NegociacaoDao(conn);
}
