import type { FC } from 'react';
import dayjs from 'dayjs';
import { useTransactions } from '../../../hooks/useTransactions';
import { useFilteredTransactions } from '../../../hooks/useFilteredTransactions';
import { TransactionItem } from '../../molecules';

export const TransactionList: FC = () => {
    const { filteredTransactions, isLoading } = useFilteredTransactions();
    const { metadata } = useTransactions();

    const getLabel = (method: string) =>
        metadata.paymentMethods.find((m) => m.value === method)?.label ?? method;

    if (isLoading) return <p>Cargando transacciones...</p>;

    return (
        <div className="flex flex-col divide-y divide-neutralHard px-5">
            {filteredTransactions.map((tx) => (
                <TransactionItem
                    key={tx.id}
                    label={getLabel(tx.paymentMethod)}
                    amount={new Intl.NumberFormat('es-AR', {
                        style: 'currency',
                        currency: 'ARS',
                        minimumFractionDigits: 2,
                    }).format(tx.amount)}
                    date={dayjs(tx.createdAt).format('DD/MM/YYYY')}
                />
            ))}
        </div>
    );
};
