import { useState, useMemo } from 'react';
import { Button, Container, Text } from '../../../components/atoms';
import { useTransactionFilter } from '../../../stores/useTransactionFilter';
import type { Metadata, } from '../../../types/transactions';
import { DateRangeCalendar } from '../../molecules/DateRangeCalendar';
import { Tag, RangeSlider } from '../../molecules';
import { FilterGroup } from '../../molecules/FilterGroup';

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
                label: `${n}  `
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
            className={`fixed top-0 pt-[56px] right-0 w-full h-[100vh] z-40 bg-background-base shadow-lg overflow-y-auto transition-transform duration-300 ease-in-out ${isVisible ? 'translate-x-0' : 'translate-x-full'} p-5`}
            aria-labelledby="filters-title"
        >
            <Button icon="chevron-left" iconSize={8} label="Filtros" variant="ghost" className=" top-4 left-4 z-10" onClick={onClose} />

            <Container className="px-5 pt-6 pb-2 flex justify-between items-center">
                <Text as="h2" variant='h2' id="filters-title" className=" font-semibold text-text-title">Todos los filtros</Text>
                <Button label="Limpiar" variant="ghost" className='text-primary text-[16px]' size="sm" onClick={resetAll} disabled={!hasActiveFilters} />
            </Container>

            <section className="flex flex-col px-5">
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
                    icon="card-alt"
                    isOpen={openSections.card}
                    onToggle={() => toggleSection('card')}
                >
                    {renderTags('card', selectedCards, toggleCard, resetCards)}
                </FilterGroup>


                <FilterGroup
                    label="Cuotas"
                    icon="calendar-bill"
                    isOpen={openSections.installments}
                    onToggle={() => toggleSection('installments')}
                >
                    {renderTags('installments', selectedInstallments, toggleInstallment, resetInstallments)}
                </FilterGroup>

                <FilterGroup
                    label="Monto"
                    icon="commission"
                    isOpen={openSections.amount}
                    onToggle={() => toggleSection('amount')}
                >
                    <RangeSlider value={amountRange} onValueChange={setAmountRange} />
                </FilterGroup>
                <FilterGroup
                    label="Métodos de cobro"
                    icon="categories"
                    isOpen={openSections.method}
                    onToggle={() => toggleSection('method')}
                >
                    {renderTags('method', selectedMethods, toggleMethod, resetMethods)}
                </FilterGroup>

            </section>
            <Container padding='md'>
                <Button
                    label="Aplicar filtros"
                    onClick={onClose}
                    disabled={!hasActiveFilters}
                    variant="primary"
                    className="w-full"
                />
            </Container>
        </aside>
    );
};

