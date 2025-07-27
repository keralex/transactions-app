import { type FC } from 'react';
import type { TextProps } from './Text.interfaces';
import { baseVariants, weightVariants } from './Text.styles';

export const Text: FC<TextProps> = ({
    children,
    variant = 'body',
    weight = 'regular',
    className = '',
    as: Component = 'p',
    ...props
}) => {
    const variantClass = baseVariants[variant];
    const weightClass = weightVariants[weight];
    return (
        <Component
            className={`${variantClass} ${weightClass}  ${className} font-public`}
            {...props}
        >
            {children}
        </Component>
    );
};
