import { useState, type FC } from 'react';
import dayjs from 'dayjs';
import { useTransactions } from '../../../hooks/useTransactions';
import { useFilteredTransactions } from '../../../hooks/useFilteredTransactions';
import { TransactionHeader, TransactionItem } from '../../molecules';
import { Button, Container, Icon, Text } from '../../atoms';
import type { DateRange } from 'react-day-picker';
import { DateRangeCalendar } from '../../molecules/DateRangeCalendar';
import { downloadCsv } from '../../../utils/downloadTransactionCsv';
import { TransactionFilters } from '../TransactionFilters/TransactionFilters';

export const TransactionList: FC = () => {
    const { filteredTransactions, getTransactionsInRange, isLoading } = useFilteredTransactions();
    const { metadata } = useTransactions();
    const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [filtersOpen, setFiltersOpen] = useState(false);


    const toggleCalendar = () => setCalendarOpen(prev => !prev);

    const handleDownload = () => {
        const inRange = getTransactionsInRange(selectedRange);
        if (!inRange.length) return alert('No hay transacciones en este rango.');

        downloadCsv(inRange, getLabel);
        toggleCalendar();
    };
    const getLabel = (method: string) =>
        metadata.paymentMethods.find((m) => m.value === method)?.label ?? method;

    if (isLoading) return <p>Cargando transacciones...</p>;

    return (
        <Container className='px-5' >

            {calendarOpen && (
                <Container className="shadow-soft rounded-xl p-4 bg-white w-[90%] mx-auto flex flex-col gap-4">
                    <Container isFlex align="center" gap={2}>
                        <Icon name="calendar" size={30} className='mr-4' />
                        <Text variant="h3" weight='semibold' className="text-text-dark">Elegí las fechas que querés descargar </Text>
                    </Container>

                    <DateRangeCalendar
                        label="Seleccionar rango"
                        range={selectedRange}
                        onChange={setSelectedRange}
                        footer={
                            <Container isFlex justify="end" className='w-full gap-4'>
                                <Button
                                    label="cerrar"
                                    variant="outline"
                                    size="sm"
                                    onClick={toggleCalendar}
                                />
                                <Button
                                    label="Descargar"
                                    variant="primary"
                                    size="sm"
                                    onClick={handleDownload}
                                    disabled={!selectedRange}
                                />
                            </Container>
                        }
                    />
                </Container>
            )}
            <TransactionHeader
                onFilterClick={() => setFiltersOpen(true)}
                onExportClick={toggleCalendar}
            />

            <div className="flex flex-col divide-y divide-neutralHard ">
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
            <TransactionFilters
                isVisible={filtersOpen}
                onClose={() => setFiltersOpen(false)}
                metadata={metadata}
            />
        </Container>
    );
};
