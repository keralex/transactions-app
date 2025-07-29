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
  hasCustomFilters: boolean;
  error: unknown;
}

export const useFilteredTransactions = (): UseFilteredTransactionsResult => {
  const { transactions, isLoading, error } = useTransactions();
  const {
    filter,
    selectedCards,
    selectedMethods,
    selectedInstallments,
    selectedDates,
    amountRange,
  } = useTransactionFilter();

  const hasCustomFilters = useMemo(() => {
    return (
      selectedCards.length > 0 ||
      selectedMethods.length > 0 ||
      selectedInstallments.length > 0 ||
      selectedDates !== undefined ||
      amountRange[0] > 0 ||
      amountRange[1] < 2000
    );
  }, [
    selectedCards,
    selectedMethods,
    selectedInstallments,
    selectedDates,
    amountRange,
  ]);

  const { filteredTransactions, total } = useMemo(() => {
    const now = dayjs();

    const filtered = transactions.filter((tx) => {
      const created = dayjs(tx.createdAt);

      if (hasCustomFilters) {
        const isInDateRange =
          !selectedDates ||
          ((!selectedDates.from ||
            created.isSameOrAfter(dayjs(selectedDates.from).startOf('day'))) &&
            (!selectedDates.to ||
              created.isSameOrBefore(dayjs(selectedDates.to).endOf('day'))));

        const isInAmountRange =
          tx.amount >= amountRange[0] && tx.amount <= amountRange[1];

        const matchesCard =
          selectedCards.length === 0 || selectedCards.includes(tx.card);

        const matchesMethod =
          selectedMethods.length === 0 ||
          selectedMethods.includes(tx.paymentMethod);

        const matchesInstallment =
          selectedInstallments.length === 0 ||
          selectedInstallments.includes(tx.installments);

        return (
          isInDateRange &&
          isInAmountRange &&
          matchesCard &&
          matchesMethod &&
          matchesInstallment
        );
      }

      return (
        (filter === 'daily' && created.isSame(now, 'day')) ||
        (filter === 'weekly' && created.isSame(now, 'week')) ||
        (filter === 'monthly' && created.isSame(now, 'month'))
      );
    });

    const sum = filtered.reduce((acc, tx) => acc + tx.amount, 0);

    return {
      filteredTransactions: filtered,
      total: sum,
    };
  }, [
    transactions,
    filter,
    hasCustomFilters,
    selectedCards,
    selectedMethods,
    selectedInstallments,
    selectedDates,
    amountRange,
  ]);

  const amountParts = useMemo(() => {
    const [integer, decimal = '00'] = total.toFixed(2).split('.');
    const formattedInteger = new Intl.NumberFormat('es-AR').format(
      Number(integer)
    );

    return { integer: formattedInteger, decimal };
  }, [total]);

  const getTransactionsInRange = (range?: DateRange) => {
    if (!range?.from || !range?.to) return [];

    const from = dayjs(range.from).startOf('day');
    const to = dayjs(range.to).endOf('day');

    return transactions.filter((tx) => {
      const txDate = dayjs(tx.createdAt);
      return txDate.isSameOrAfter(from) && txDate.isSameOrBefore(to);
    });
  };
  return {
    filteredTransactions,
    getTransactionsInRange,
    hasCustomFilters,
    total,
    amountParts,
    isLoading,
    error,
  };
};
