import { type FC } from 'react';
import type { TextProps } from './Text.interfaces';
import { baseVariants, weightVariants } from './Text.styles';

export const Text: FC<TextProps> = ({
    children,
    variant = 'body',
    weight = 'regular',
    color = 'text-dark',
    className = '',
    as: Component = 'p',
    ...props
}) => {
    const variantClass = baseVariants[variant];
    const weightClass = weightVariants[weight];
    const colorClass = `text-${color}`;
    return (
        <Component
            className={`${variantClass} ${weightClass} ${colorClass} ${className} font-public`}
            {...props}
        >
            {children}
        </Component>
    );
};
