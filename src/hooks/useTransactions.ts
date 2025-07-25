import { useQuery } from '@tanstack/react-query';
import { fetchTransactions } from '../services/transactionService';
import type { TransactionsResponse } from '../types/transactions';

export const useTransactions = () => {
  const { data, isLoading, error } = useQuery<TransactionsResponse>({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
    staleTime: 1000 * 60 * 5,
  });

  return {
    transactions: data?.transactions ?? [],
    metadata: data?.metadata ?? { cards: [], paymentMethods: [] },
    isLoading,
    error,
  };
};
