import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { TransactionList } from './TransactionList';

vi.mock('../../../hooks/useFilteredTransactions', () => ({
    useFilteredTransactions: vi.fn(),
}));

vi.mock('../../../hooks/useTransactions', () => ({
    useTransactions: vi.fn(),
}));

vi.mock('../../../utils/downloadTransactionCsv', () => ({
    downloadCsv: vi.fn(),
}));

import { useFilteredTransactions as _useFilteredTransactions } from '../../../hooks/useFilteredTransactions';
import { useTransactions as _useTransactions } from '../../../hooks/useTransactions';
import { downloadCsv as _downloadCsv } from '../../../utils/downloadTransactionCsv';

const useFilteredTransactions = _useFilteredTransactions as unknown as ReturnType<typeof vi.fn>;
const useTransactions = _useTransactions as unknown as ReturnType<typeof vi.fn>;

const mockTx = {
    id: 'tx1',
    createdAt: new Date('2024-08-01').toISOString(),
    amount: 1500,
    paymentMethod: 'qr',
};

const mockMetadata = {
    paymentMethods: [{ value: 'qr', label: 'Pago QR' }],
    cards: [],
};

describe('<TransactionList />', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        useFilteredTransactions.mockReturnValue({
            filteredTransactions: [mockTx],
            getTransactionsInRange: () => [mockTx],
            total: 1500,
            amountParts: { integer: '1.500', decimal: '00' },
            isLoading: false,
            error: null,
            hasCustomFilters: false,
        });

        useTransactions.mockReturnValue({
            metadata: mockMetadata,
            isLoading: false,
        });
    });

    it('shows loading when isLoading is true', () => {
        useFilteredTransactions.mockReturnValueOnce({
            filteredTransactions: [],
            getTransactionsInRange: () => [],
            total: 0,
            amountParts: { integer: '0', decimal: '00' },
            isLoading: true,
            error: null,
            hasCustomFilters: false,
        });

        render(<TransactionList />);
        expect(screen.getByText(/cargando transacciones/i)).toBeInTheDocument();
    });

    it('renders transactions with formatted data', () => {
        render(<TransactionList />);
        expect(screen.getByText('Pago QR')).toBeInTheDocument();
        expect(screen.getByTestId('transaction-amount')).toHaveTextContent('+$ 1.500,00');
        expect(screen.getByTestId('transaction-date')).toHaveTextContent('31/07/2024');
    });

    it('opens calendar when export button is clicked', async () => {
        render(<TransactionList />);
        const exportBtn = screen.getByRole('button', { name: /exportar historial/i });
        await userEvent.click(exportBtn);
        expect(screen.getByText(/elegí las fechas/i)).toBeInTheDocument();
    });



    it('opens filter panel when filter button is clicked', async () => {
        render(<TransactionList />);
        const filterBtn = screen.getByRole('button', { name: /filtrar/i });
        await userEvent.click(filterBtn);
        expect(screen.getByText('Todos los filtros')).toBeInTheDocument();
    });
});
