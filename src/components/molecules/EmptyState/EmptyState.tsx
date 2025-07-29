import type { FC } from 'react'
import { Text } from '../../atoms'
import image from '../../../assets/icons/search-empty.svg';

interface EmptyStateProps {
    message?: string
}

export const EmptyState: FC<EmptyStateProps> = ({
    message = 'No hay resultados que mostrar. Podés probar usando los filtros.',
}) => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center px-4 py-10">
            <img
                src={image}
                alt="Sin resultados"
                className="w-[80px] h-[80px] mb-6"
            />
            <Text className="text-neutral-dark">
                {message}
            </Text>
        </div>
    )
}

