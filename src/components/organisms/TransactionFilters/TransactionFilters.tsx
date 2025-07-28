import { useState, useMemo } from 'react';
import { Button, Icon, Text, Container } from '../../../components/atoms';
import { useTransactionFilter } from '../../../stores/useTransactionFilter';
import type { Metadata, CardType, PaymentMethodType } from '../../../types/transactions';
import { DateRangeCalendar } from '../../molecules/DateRangeCalendar';
import { Tag, RangeSlider } from '../../molecules';

interface Props {
    onClose: () => void;
    isVisible: boolean;
    metadata: Metadata;
}

export const TransactionFilters = ({ onClose, isVisible, metadata }: Props) => {
    const [openSections, setOpenSections] = useState({
        date: false,
        card: false,
        method: false,
        installments: false,
        amount: false,
    });

    const {
        selectedCards,
        selectedMethods,
        selectedInstallments,
        selectedDates,
        amountRange,
        toggleCard,
        toggleMethod,
        toggleInstallment,
        resetCards,
        resetMethods,
        resetInstallments,
        setSelectedDates,
        resetDates,
        setAmountRange,
        resetAmountRange,
        installmentOptions,
    } = useTransactionFilter();

    const hasActiveFilters = useMemo(() => {
        return (
            selectedCards.length > 0 ||
            selectedMethods.length > 0 ||
            selectedInstallments.length > 0 ||
            !!selectedDates ||
            amountRange[0] !== 0 ||
            amountRange[1] !== 2000
        );
    }, [selectedCards, selectedMethods, selectedInstallments, selectedDates, amountRange]);

    const tagOptions = {
        card: useMemo(() => [
            { value: 'all', label: 'Todas' },
            ...metadata.cards.map(({ value, label }) => ({ value, label }))
        ], [metadata.cards]),

        method: useMemo(() => [
            { value: 'all', label: 'Todos' },
            ...metadata.paymentMethods.map(({ value, label }) => ({ value, label }))
        ], [metadata.paymentMethods]),

        installments: useMemo(() => [
            { value: 'all', label: 'Todas' },
            ...[...installmentOptions].sort((a, b) => a - b).map(n => ({
                value: n,
                label: `${n} cuota${n > 1 ? 's' : ''}`
            }))
        ], [installmentOptions])
    };

    const toggleSection = (key: keyof typeof openSections) => {
        setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const resetAll = () => {
        resetCards();
        resetMethods();
        resetInstallments();
        resetDates();
        resetAmountRange();
        setOpenSections({ date: false, card: false, method: false, installments: false, amount: false });
    };

    const renderTags = (type: 'card' | 'method' | 'installments', selected: any[], toggle: any, reset: () => void) => (
        <ul className="flex flex-wrap gap-2 mt-2">
            {tagOptions[type].map((opt) => {
                const isAll = opt.value === 'all';
                const isSelected = isAll ? selected.length === 0 : selected.includes(opt.value);

                const handleClick = () => isAll ? reset() : toggle(opt.value);

                return (
                    <li key={opt.value}>
                        <Tag
                            text={opt.label}
                            value={String(opt.value)}
                            selected={isSelected}
                            onSelect={handleClick}
                        />
                    </li>
                );
            })}
        </ul>
    );

    return (
        <aside
            className={`fixed top-[56px] right-0 w-full h-[calc(100vh-56px)] z-50 bg-white shadow-lg overflow-y-auto transition-transform duration-300 ease-in-out ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}
            aria-labelledby="filters-title"
        >
            <Button icon="back" label="Volver" variant="ghost" className="absolute top-4 left-4 z-10" onClick={onClose} />

            <header className="px-5 pt-6 pb-2 flex justify-between items-center">
                <Text as="h2" id="filters-title" className="text-xl font-semibold text-text-dark">Filtros disponibles</Text>
                <Button label="Limpiar" variant="primary" size="sm" onClick={resetAll} disabled={!hasActiveFilters} />
            </header>

            <section className="flex flex-col gap-4 px-5">
                <FilterGroup
                    label="Fecha"
                    icon="calendar"
                    isOpen={openSections.date}
                    onToggle={() => toggleSection('date')}
                >
                    <DateRangeCalendar
                        label="Rango personalizado"
                        range={selectedDates}
                        onChange={setSelectedDates}
                        footer={<Button label="Borrar" onClick={resetDates} disabled={!selectedDates} variant="outline" size="sm" />}
                    />
                </FilterGroup>

                <FilterGroup
                    label="Tarjeta"
                    icon="card"
                    isOpen={openSections.card}
                    onToggle={() => toggleSection('card')}
                >
                    {renderTags('card', selectedCards, toggleCard, resetCards)}
                </FilterGroup>

                <FilterGroup
                    label="Métodos de cobro"
                    icon="method"
                    isOpen={openSections.method}
                    onToggle={() => toggleSection('method')}
                >
                    {renderTags('method', selectedMethods, toggleMethod, resetMethods)}
                </FilterGroup>

                <FilterGroup
                    label="Cuotas"
                    icon="installments"
                    isOpen={openSections.installments}
                    onToggle={() => toggleSection('installments')}
                >
                    {renderTags('installments', selectedInstallments, toggleInstallment, resetInstallments)}
                </FilterGroup>

                <FilterGroup
                    label="Monto"
                    icon="amount"
                    isOpen={openSections.amount}
                    onToggle={() => toggleSection('amount')}
                >
                    <RangeSlider value={amountRange} onValueChange={setAmountRange} />
                </FilterGroup>
            </section>

            <Button
                label="Aplicar filtros"
                onClick={onClose}
                disabled={!hasActiveFilters}
                variant="secondary"
                className="mx-5 my-6"
            />
        </aside>
    );
};

const FilterGroup = ({ label, icon, isOpen, onToggle, children }: {
    label: string;
    icon: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}) => (
    <div className="border-b pb-4">
        <button className="w-full flex items-center justify-between py-3" onClick={onToggle} aria-expanded={isOpen} aria-controls={`${label}-content`}>
            <Icon name={icon} size={20} className="mr-2" />
            <Text as="span" className="font-medium">{label}</Text>
        </button>
        <div id={`${label}-content`} hidden={!isOpen} className="mt-2">
            {children}
        </div>
    </div>
);
