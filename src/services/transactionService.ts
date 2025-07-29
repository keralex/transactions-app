import type { TransactionsResponse } from '../types/transactions';

export const fetchTransactions = async (): Promise<TransactionsResponse> => {
  const response = await fetch('/transactions.json');

  if (!response.ok) {
    throw new Error('Error al obtener las transacciones');
  }

  return response.json() as Promise<TransactionsResponse>;
};
