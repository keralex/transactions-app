import { create } from 'zustand';
import type { DateRange } from 'react-day-picker';
import type { CardType, PaymentMethodType } from '../types/transactions';

type FilterType = 'daily' | 'weekly' | 'monthly';

interface FilterStore {
    // Primary view filter (home scope)
    filter: FilterType;
    setFilter: (value: FilterType) => void;

    // Advanced filters
    selectedCards: CardType[];
    selectedMethods: PaymentMethodType[];
    selectedInstallments: number[];
    selectedDates?: DateRange;
    amountRange: [number, number];
    installmentOptions: number[];

    // Setters and togglers for filters
    toggleCard: (card: CardType) => void;
    toggleMethod: (method: PaymentMethodType) => void;
    toggleInstallment: (installments: number) => void;
    setSelectedDates: (range?: DateRange) => void;
    setAmountRange: (range: [number, number]) => void;
    setInstallmentOptions: (options: number[]) => void;

    // Individual reset functions
    resetCards: () => void;
    resetMethods: () => void;
    resetInstallments: () => void;
    resetDates: () => void;
    resetAmountRange: () => void;

    // Reset all filters
    resetAll: () => void;
}

export const useTransactionFilter = create<FilterStore>((set, get) => ({
    // Default primary filter
    filter: 'weekly',
    setFilter: (value) => set({ filter: value }),

    // Advanced filters initial state
    selectedCards: [],
    selectedMethods: [],
    selectedInstallments: [],
    selectedDates: undefined,
    amountRange: [0, 2000],
    installmentOptions: [1, 2, 3, 6, 12],

    // Card selection toggle
    toggleCard: (card) => {
        const current = get().selectedCards;
        set({
            selectedCards: current.includes(card)
                ? current.filter((c) => c !== card)
                : [...current, card],
        });
    },

    // Payment method toggle
    toggleMethod: (method) => {
        const current = get().selectedMethods;
        set({
            selectedMethods: current.includes(method)
                ? current.filter((m) => m !== method)
                : [...current, method],
        });
    },

    // Installment toggle
    toggleInstallment: (n) => {
        const current = get().selectedInstallments;
        set({
            selectedInstallments: current.includes(n)
                ? current.filter((i) => i !== n)
                : [...current, n],
        });
    },

    // Setters for range and options
    setSelectedDates: (range) => set({ selectedDates: range }),
    setAmountRange: (range) => set({ amountRange: range }),
    setInstallmentOptions: (options) => set({ installmentOptions: options }),

    // Reset individual filters
    resetCards: () => set({ selectedCards: [] }),
    resetMethods: () => set({ selectedMethods: [] }),
    resetInstallments: () => set({ selectedInstallments: [] }),
    resetDates: () => set({ selectedDates: undefined }),
    resetAmountRange: () => set({ amountRange: [0, 2000] }),

    // Reset all at once
    resetAll: () =>
        set({
            selectedCards: [],
            selectedMethods: [],
            selectedInstallments: [],
            selectedDates: undefined,
            amountRange: [0, 2000],
        }),
}));
