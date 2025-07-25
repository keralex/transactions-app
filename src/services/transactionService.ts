import type { TransactionsResponse } from '../types/transactions';

export const fetchTransactions = async (): Promise<TransactionsResponse> => {
  const response = await fetch(
    'https://uala-dev-challenge.s3.us-east-1.amazonaws.com/transactions.json'
  );

  if (!response.ok) {
    throw new Error('Error al obtener las transacciones');
  }

  return response.json();
};
