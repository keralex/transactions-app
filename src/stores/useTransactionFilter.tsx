import { create } from 'zustand';

type FilterType = 'daily' | 'weekly' | 'monthly';

interface FilterStore {
    filter: FilterType;
    setFilter: (value: FilterType) => void;
}

export const useTransactionFilter = create<FilterStore>((set) => ({
    filter: 'weekly', // default
    setFilter: (value) => set({ filter: value }),
}));
