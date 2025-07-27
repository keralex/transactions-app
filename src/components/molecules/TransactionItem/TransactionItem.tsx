
import type { FC } from 'react';
import { Icon, Text } from '../../atoms';

interface Props {
    label: string;
    amount: string;
    date: string;
}

export const TransactionItem: FC<Props> = ({ label, amount, date }) => {
    return (
        <div className="flex items-center justify-between border-b border-border-neutral py-3 px-2">
            <div className="flex items-center gap-3">
                <div className="w-fit flex items-center justify-center border-2 border-success rounded-xl">
                    <Icon name="category-stores" size={32} customClass="text-success" />
                </div>
                <div className="flex flex-col">
                    <Text variant="h2" weight="semibold" className="text-text-dark">
                        {label}
                    </Text>
                    <Text variant="body" className="text-neutral-dark">Venta</Text>
                </div>
            </div>

            <div className="text-right">
                <Text variant="h2" weight="semibold" className="text-success">
                    +{amount}
                </Text>
                <Text variant="body" className="text-neutral-dark">{date}</Text>
            </div>
        </div>
    );
};
