import { Container, Link } from '../../atoms';
import { useTransactionFilter } from '../../../stores/useTransactionFilter';
import { type FC } from 'react';

const options = [
    { label: 'Diario', value: 'daily' },
    { label: 'Semanal', value: 'weekly' },
    { label: 'Mensual', value: 'monthly' },
] as const;

const amountMap: any = {
    daily: '$5.000,00',
    weekly: '$35.000,00',
    monthly: '$120.000,00',
};

export const RevenueSummary: FC = () => {
    const { filter, setFilter } = useTransactionFilter();

    return (
        <Container
            className="p-4"
            isFlex
            direction="column"
            gap={4}
        >
            <h2 className="text-base font-semibold text-neutralDark">Tus cobros</h2>

            <div className="flex justify-between text-sm font-medium text-neutralDark">
                {options.map((opt) => (
                    <button
                        key={opt.value}
                        onClick={() => setFilter(opt.value)}
                        className={`px-2 py-1 ${filter === opt.value ? 'text-primary font-semibold relative' : 'opacity-60'
                            }`}
                    >
                        {opt.label}
                        {filter === opt.value && <div className="w-1 h-1 rounded-full bg-primary mx-auto mt-1" />}
                    </button>
                ))}
            </div>

            <p className="text-2xl font-semibold text-primary mt-2">
                + {amountMap[filter]}
            </p>

            <Link
                to="/metrics"
                iconName="analyze"
                iconSide="left"
                color="primary"
                size="md"
                className="mt-4"
                isBold
            >
                Ver métricas
            </Link>
        </Container>
    );
};
