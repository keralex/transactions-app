import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { TransactionFilters } from './TransactionFilters';
import { useTransactionFilter as _useTransactionFilter } from '../../../stores/useTransactionFilter';

vi.mock('../../../stores/useTransactionFilter', () => ({
    useTransactionFilter: vi.fn(),
}));

const useTransactionFilter = _useTransactionFilter as unknown as ReturnType<typeof vi.fn>;

const metadata = {
    cards: [{ value: 'visa', label: 'Visa' }],
    paymentMethods: [{ value: 'qr', label: 'QR' }],
};

const mockClose = vi.fn();

describe('<TransactionFilters />', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        useTransactionFilter.mockReturnValue({
            selectedCards: [],
            selectedMethods: [],
            selectedInstallments: [],
            selectedDates: undefined,
            amountRange: [0, 2000],
            toggleCard: vi.fn(),
            toggleMethod: vi.fn(),
            toggleInstallment: vi.fn(),
            resetCards: vi.fn(),
            resetMethods: vi.fn(),
            resetInstallments: vi.fn(),
            resetDates: vi.fn(),
            setSelectedDates: vi.fn(),
            setAmountRange: vi.fn(),
            resetAmountRange: vi.fn(),
            installmentOptions: [1, 3, 6],
        });
    });

    it('renders when visible', () => {
        render(<TransactionFilters onClose={mockClose} isVisible={true} metadata={metadata} />);
        expect(screen.getByText('Todos los filtros')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /aplicar filtros/i })).toBeInTheDocument();
    });

    it('is hidden when isVisible is false', () => {
        render(<TransactionFilters onClose={mockClose} isVisible={false} metadata={metadata} />);
        const aside = screen.getByRole('complementary');
        expect(aside.className).toContain('translate-x-full');
    });

    it('calls onClose when clicking back button', async () => {
        render(<TransactionFilters onClose={mockClose} isVisible={true} metadata={metadata} />);
        await userEvent.click(screen.getByTestId('go-back-button'));
        expect(mockClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when clicking apply button', async () => {
        useTransactionFilter.mockReturnValue({
            selectedCards: ['visa'],
            selectedMethods: [],
            selectedInstallments: [],
            selectedDates: undefined,
            amountRange: [0, 2000],
            toggleCard: vi.fn(),
            toggleMethod: vi.fn(),
            toggleInstallment: vi.fn(),
            resetCards: vi.fn(),
            resetMethods: vi.fn(),
            resetInstallments: vi.fn(),
            resetDates: vi.fn(),
            setSelectedDates: vi.fn(),
            setAmountRange: vi.fn(),
            resetAmountRange: vi.fn(),
            installmentOptions: [1, 3, 6],
        });

        render(<TransactionFilters onClose={mockClose} isVisible={true} metadata={metadata} />);
        const applyBtn = screen.getByRole('button', { name: /aplicar filtros/i });
        expect(applyBtn).toBeEnabled();
        await userEvent.click(applyBtn);
        expect(mockClose).toHaveBeenCalledTimes(1);
    });

    it('clears filters when clicking limpiar', async () => {
        const resetCards = vi.fn();
        const resetMethods = vi.fn();
        const resetInstallments = vi.fn();
        const resetDates = vi.fn();
        const resetAmountRange = vi.fn();

        useTransactionFilter.mockReturnValue({
            selectedCards: ['visa'],
            selectedMethods: [],
            selectedInstallments: [],
            selectedDates: undefined,
            amountRange: [100, 2000],
            toggleCard: vi.fn(),
            toggleMethod: vi.fn(),
            toggleInstallment: vi.fn(),
            resetCards,
            resetMethods,
            resetInstallments,
            resetDates,
            setSelectedDates: vi.fn(),
            setAmountRange: vi.fn(),
            resetAmountRange,
            installmentOptions: [1, 3, 6],
        });

        render(<TransactionFilters onClose={mockClose} isVisible={true} metadata={metadata} />);
        const limpiarBtn = screen.getByRole('button', { name: /limpiar/i });
        expect(limpiarBtn).toBeEnabled();

        await userEvent.click(limpiarBtn);

        expect(resetCards).toHaveBeenCalled();
        expect(resetMethods).toHaveBeenCalled();
        expect(resetInstallments).toHaveBeenCalled();
        expect(resetDates).toHaveBeenCalled();
        expect(resetAmountRange).toHaveBeenCalled();
    });

    it('disables limpiar button when no filters are active', () => {
        render(<TransactionFilters onClose={mockClose} isVisible={true} metadata={metadata} />);
        const limpiarBtn = screen.getByRole('button', { name: /limpiar/i });
        expect(limpiarBtn).toBeDisabled();
    });
});
