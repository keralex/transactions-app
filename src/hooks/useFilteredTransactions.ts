import { useMemo } from 'react';
import dayjs from 'dayjs';
import { useTransactions } from './useTransactions';
import { useTransactionFilter } from '../stores/useTransactionFilter';
import type { Transaction } from '../types/transactions';

interface UseFilteredTransactionsResult {
  filteredTransactions: Transaction[];
  total: number;
  amountParts: {
    integer: string;
    decimal: string;
  };
  isLoading: boolean;
  error: unknown;
}

export const useFilteredTransactions = (): UseFilteredTransactionsResult => {
  const { transactions, isLoading, error } = useTransactions();
  const { filter } = useTransactionFilter();

  const { filteredTransactions, total } = useMemo(() => {
    const now = dayjs();

    let sum = 0;
    const filtered = transactions.filter((t) => {
      const created = dayjs(t.createdAt);
      const isValid =
        (filter === 'daily' && created.isSame(now, 'day')) ||
        (filter === 'weekly' && created.isSame(now, 'week')) ||
        (filter === 'monthly' && created.isSame(now, 'month'));

      if (isValid) sum += t.amount;
      return isValid;
    });

    return {
      filteredTransactions: filtered,
      total: sum,
    };
  }, [transactions, filter]);

  const amountParts = useMemo(() => {
    const [integer, decimal = '00'] = total.toFixed(2).split('.');

    const formattedInteger = new Intl.NumberFormat('es-AR').format(
      Number(integer)
    );
    return {
      integer: formattedInteger,
      decimal,
    };
  }, [total]);

  return {
    filteredTransactions,
    total,
    amountParts,
    isLoading,
    error,
  };
};
