import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RevenueSummary } from './RevenueSummary';
import { MemoryRouter } from 'react-router-dom';

import * as FilterStore from '../../../stores/useTransactionFilter';
import * as FilteredHook from '../../../hooks/useFilteredTransactions';

vi.mock('../../../stores/useTransactionFilter', () => ({
    useTransactionFilter: vi.fn(),
}));

vi.mock('../../../hooks/useFilteredTransactions', () => ({
    useFilteredTransactions: vi.fn(),
}));

const mockUseTransactionFilter = FilterStore.useTransactionFilter as unknown as ReturnType<typeof vi.fn>;
const mockUseFilteredTransactions = FilteredHook.useFilteredTransactions as unknown as ReturnType<typeof vi.fn>;

describe('<RevenueSummary />', () => {
    const mockSetFilter = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders title, amount and link', () => {
        mockUseTransactionFilter.mockReturnValue({
            filter: 'weekly',
            setFilter: mockSetFilter,
        });

        mockUseFilteredTransactions.mockReturnValue({
            amountParts: { integer: '1.200', decimal: '50' },
            hasCustomFilters: false,
        });

        render(
            <MemoryRouter>
                <RevenueSummary />
            </MemoryRouter>
        );

        expect(screen.getByText('Tus cobros')).toBeInTheDocument();
        expect(screen.getByText('Diario')).toBeInTheDocument();
        expect(screen.getByText('Semanal')).toBeInTheDocument();
        expect(screen.getByText('Mensual')).toBeInTheDocument();
        expect(screen.getByText('+ $ 1.200')).toBeInTheDocument();
        expect(screen.getByText(',50')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /ver métricas/i })).toBeInTheDocument();
    });

    it('calls setFilter when a filter option is clicked', async () => {
        mockUseTransactionFilter.mockReturnValue({
            filter: 'weekly',
            setFilter: mockSetFilter,
        });

        mockUseFilteredTransactions.mockReturnValue({
            amountParts: { integer: '500', decimal: '00' },
            hasCustomFilters: false,
        });

        render(
            <MemoryRouter>
                <RevenueSummary />
            </MemoryRouter>
        );

        const dailyButton = screen.getByRole('button', { name: /diario/i });
        await userEvent.click(dailyButton);

        expect(mockSetFilter).toHaveBeenCalledWith('daily');
    });

    it('does not render filter buttons when hasCustomFilters is true', () => {
        mockUseTransactionFilter.mockReturnValue({
            filter: 'monthly',
            setFilter: mockSetFilter,
        });

        mockUseFilteredTransactions.mockReturnValue({
            amountParts: { integer: '0', decimal: '00' },
            hasCustomFilters: true,
        });

        render(
            <MemoryRouter>
                <RevenueSummary />
            </MemoryRouter>
        );

        expect(screen.queryByText('Diario')).not.toBeInTheDocument();
        expect(screen.queryByText('Semanal')).not.toBeInTheDocument();
        expect(screen.queryByText('Mensual')).not.toBeInTheDocument();
    });
});
