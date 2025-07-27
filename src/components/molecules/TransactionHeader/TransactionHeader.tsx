import { type FC } from 'react';
import { Container, Icon, Text } from '../../atoms';

interface Props {
    onFilterClick?: () => void;
    onExportClick?: () => void;
}

export const TransactionHeader: FC<Props> = ({ onFilterClick, onExportClick }) => {
    return (
        <Container isFlex align='center' justify='between' className="mb-5 px-2">
            <Text variant="h2" weight="semibold" className='text-text-dark'>
                Historial de transacciones
            </Text>

            <div className="flex items-center gap-4">
                <button onClick={onFilterClick} aria-label="Filtrar transacciones" className='px-2'>
                    <Icon name="filter" size={24} customClass="text-primary" />
                </button>
                <button onClick={onExportClick} aria-label="Exportar historial" className='px-2'>
                    <Icon name="download" size={24} customClass="text-primary" />
                </button>
            </div>
        </Container>
    );
};
