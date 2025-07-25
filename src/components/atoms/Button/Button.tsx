import type { FC, MouseEvent } from 'react';
import { Icon } from '../Icon';
import { buttonBaseStyles, buttonSizes, buttonVariants, buttonDisabled, iconDimensions } from './Button.styles';
import type { ButtonProps } from './Button.interfaces';

export const Button: FC<ButtonProps> = ({
    label,
    icon,
    iconPosition = 'left',
    variant = 'primary',
    size = 'md',
    isFullWidth = false,
    className = '',
    disabled = false,
    onClick,
    children,
    type = 'button',
    ...props
}) => {
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        if (!disabled && onClick) onClick(e);
    };

    const iconElement = (side: 'left' | 'right') =>
        icon && iconPosition === side ? (
            <Icon name={icon} size={iconDimensions[size]} className={label || children ? (side === 'left' ? 'mr-2' : 'ml-2') : ''} />
        ) : null;

    return (
        <button
            type={type}
            role="button"
            className={`
            ${buttonBaseStyles}
            ${buttonSizes[size]}    
            ${buttonVariants[variant]}
            ${buttonDisabled[variant]}
            ${isFullWidth ? 'w-full' : ''}
            ${className}
            `}
            onClick={handleClick}
            disabled={disabled}
            aria-disabled={disabled}
            {...props}
        >
            {iconElement('left')}
            {label || children}
            {iconElement('right')}
        </button>
    );
};
