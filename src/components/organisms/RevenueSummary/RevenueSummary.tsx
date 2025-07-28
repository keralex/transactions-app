import { Container, Link, Text } from '../../atoms';
import { useTransactionFilter } from '../../../stores/useTransactionFilter';
import { type FC } from 'react';
import { useFilteredTransactions } from '../../../hooks/useFilteredTransactions';

const options = [
    { label: 'Diario', value: 'daily' },
    { label: 'Semanal', value: 'weekly' },
    { label: 'Mensual', value: 'monthly' },
] as const;

export const RevenueSummary: FC = () => {
    const { filter, setFilter } = useTransactionFilter();
    const { amountParts } = useFilteredTransactions();
    return (
        <div className='bg-white '>
            <Container className=" bg-background-base p-4 pt-6 border-r border-[#DEE2EC] rounded-tr-[28px] border-tl-transparent  " isFlex direction="column" gap={4}>
                <Text as='h1' variant='h1' className='text-text-title pl-9' weight='semibold'>Tus cobros</Text>

                <div className="grid grid-cols-3 gap-0 text-sm font-medium w-full mt-6 mb-4">
                    {options.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => setFilter(opt.value)}
                            className={`font-public px-5 py-3 text-text-light font-normal ${filter === opt.value && 'font-semibold'
                                }`}
                        >
                            {opt.label}
                            {filter === opt.value && <div className="w-1 h-1 rounded-full bg-primary mx-auto mt-1" />}
                        </button>
                    ))}
                </div>
                <Container isFlex justify='center' align='center' className='mb-4 w-full'>
                    <Text as='p' className="text-[34px] text-text-dark" >
                        + $ {amountParts.integer}
                        <Text as='span' className="text-[22px] ">,{amountParts.decimal}</Text>
                    </Text>
                </Container>
                <Container isFlex justify='center' padding='lg' className='w-full'>
                    <Link
                        to="/metrics"
                        iconName="analyze"
                        iconSide="left"
                        color="primary"
                        size="md"
                        isBold
                    >
                        Ver métricas
                    </Link>
                </Container>
            </Container >
        </div>
    );
};
