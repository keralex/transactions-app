import { type FC } from 'react';
import type { TextProps } from './Text.interfaces';
import { baseVariants, colorVariants, weightVariants } from './Text.styles';

export const Text: FC<TextProps> = ({
    children,
    variant = 'body',
    weight = 'regular',
    color = 'dark',
    className = '',
    as: Component = 'p',
    ...props
}) => {
    const variantClass = baseVariants[variant];
    const weightClass = weightVariants[weight];
    const colorClass = colorVariants[color];

    return (
        <Component
            className={`${variantClass} ${weightClass} ${colorClass} ${className}`}
            {...props}
        >
            {children}
        </Component>
    );
};
