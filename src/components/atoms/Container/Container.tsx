import type { FC } from 'react';
import type { ContainerProps } from './Container.interfaces';
import {
    paddingOptions,
    marginOptions,
    flexDirectionOptions,
    justifyOptions,
    alignOptions,
    columnOptions,
    autoClass,
} from './Container.styles';

export const Container: FC<ContainerProps> = ({
    children,
    className = '',
    maxWidth,
    padding = 'none',
    margin = 'none',
    isFlex = false,
    direction = 'row',
    justify = 'start',
    align = 'start',
    gap,
    isGrid = false,
    columns = '1',
    wrap = false,
    hasBorder = false,
    borderColor = 'gray',
    isAuto = false,
    ...rest
}) => {
    const gridClass = isGrid ? `grid ${gap ? `gap-${gap}` : ''} ${columnOptions[columns]}` : '';
    const maxWClass = maxWidth ? `max-w-${maxWidth}` : '';
    const flexClass = isFlex
        ? `flex ${flexDirectionOptions[direction]} ${justifyOptions[justify]} ${alignOptions[align]} ${wrap ? 'flex-wrap' : ''}`
        : '';
    const borderClass = hasBorder
        ? `rounded-[8px] border ${borderColor === 'primary' ? 'border-primary' : 'border-light-gray'}`
        : '';

    const composedClassName = [
        className,
        paddingOptions[padding],
        marginOptions[margin],
        flexClass,
        gridClass,
        isAuto && autoClass,
        maxWClass,
        borderClass,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={composedClassName} {...rest}>
            {children}
        </div>
    );
};
