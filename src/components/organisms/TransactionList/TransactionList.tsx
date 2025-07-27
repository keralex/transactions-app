import { useState, type FC } from 'react';
import dayjs from 'dayjs';
import { useTransactions } from '../../../hooks/useTransactions';
import { useFilteredTransactions } from '../../../hooks/useFilteredTransactions';
import { TransactionHeader, TransactionItem } from '../../molecules';
import { Button, Container, Icon, Text } from '../../atoms';
import type { DateRange } from 'react-day-picker';
import { DateRangeCalendar } from '../../molecules/DateRangeCalendar';

export const TransactionList: FC = () => {
    const { filteredTransactions, isLoading } = useFilteredTransactions();
    const { metadata } = useTransactions();
    const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
    const [calendarOpen, setCalendarOpen] = useState(false);


    const toggleCalendar = () => setCalendarOpen(prev => !prev);
    const clearRange = () => setSelectedRange(undefined);

    const handleDownload = () => {
        console.log('Descargar desde:', selectedRange);
        // aquí iría lógica real cuando esté lista
    };

    const getLabel = (method: string) =>
        metadata.paymentMethods.find((m) => m.value === method)?.label ?? method;

    if (isLoading) return <p>Cargando transacciones...</p>;

    return (
        <Container className='px-5' >

            {calendarOpen && (
                <Container className="shadow-soft rounded-xl p-4 bg-white w-fit flex flex-col gap-4">
                    <Container isFlex align="center" gap={2}>
                        <Icon name="calendar" size={20} />
                        <Text variant="body" className="neutral-dark">Elegí las fechas que querés descargar </Text>
                    </Container>

                    <DateRangeCalendar
                        label="Seleccionar rango"
                        range={selectedRange}
                        onChange={setSelectedRange}
                        footer={
                            <Container isFlex gap={2} justify="end">
                                <Button
                                    label="Borrar"
                                    variant="outline"
                                    size="sm"
                                    onClick={clearRange}
                                    disabled={!selectedRange}
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
                // onFilterClick={() => navigate('/filters')}
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
        </Container>
    );
};
