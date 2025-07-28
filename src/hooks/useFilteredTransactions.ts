import { useMemo } from 'react';
import dayjs from 'dayjs';
import { useTransactions } from './useTransactions';
import { useTransactionFilter } from '../stores/useTransactionFilter';
import type { Transaction } from '../types/transactions';
import type { DateRange } from 'react-day-picker';

interface UseFilteredTransactionsResult {
  filteredTransactions: Transaction[];
  getTransactionsInRange: (range?: DateRange) => Transaction[];
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

  const getTransactionsInRange = (range?: DateRange) => {
    if (!range?.from || !range?.to) return [];

    const from = dayjs(range.from).startOf('day');
    const to = dayjs(range.to).endOf('day'); // incluye todo el día hasta las 23:59:59

    return transactions.filter((tx) => {
      const txDate = dayjs(tx.createdAt);
      return txDate.isSameOrAfter(from) && txDate.isSameOrBefore(to);
    });
  };

  return {
    filteredTransactions,
    getTransactionsInRange,
    total,
    amountParts,
    isLoading,
    error,
  };
};
