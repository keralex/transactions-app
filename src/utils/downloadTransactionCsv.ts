import dayjs from 'dayjs';
import type { Transaction } from '../types/transactions';

export const downloadCsv = (
  data: Transaction[],
  getLabel: (method: string) => string
) => {
  const header = ['ID', 'Fecha', 'Monto', 'Método de pago'];
  const rows = data.map((tx) => [
    tx.id,
    dayjs(tx.createdAt).format('DD/MM/YYYY'),
    tx.amount.toFixed(2),
    getLabel(tx.paymentMethod),
  ]);

  const csvContent = [header, ...rows].map((row) => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute(
    'download',
    `transacciones_${dayjs().format('YYYY-MM-DD')}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
