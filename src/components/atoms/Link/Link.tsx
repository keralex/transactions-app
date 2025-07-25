// src/components/atoms/Link/Link.tsx
import type { FC, KeyboardEvent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '../Icon';
import type { LinkProps } from './Link.interfaces';
import {
    sizeClasses,
    baseColors,
    hoverColors,
    iconDefaultSizes,
} from './Link.styles';

export const Link: FC<LinkProps> = ({
    children,
    href,
    to,
    isExternal = false,
    onClick,
    className = '',
    color = 'dark',
    size = 'md',
    isBold = false,
    iconName,
    iconSide = 'left',
    iconSize,
    ...props
}) => {
    const computedClass = `
    ${iconName ? 'inline-flex items-center' : ''}
    ${sizeClasses[size]}
    ${baseColors[color]} ${hoverColors[color]}
    ${isBold ? 'font-semibold' : 'font-normal'}
    cursor-pointer transition-colors duration-200
    ${className}
  `.trim();

    const icon = iconName ? (
        <Icon
            name={iconName}
            size={iconSize || iconDefaultSizes[size]}
            className={children ? (iconSide === 'left' ? 'mr-2' : 'ml-2') : ''}
        />
    ) : null;

    const content = (
        <>
            {iconSide === 'left' && icon}
            {children}
            {iconSide === 'right' && icon}
        </>
    );

    const handleKeyDown = (e: KeyboardEvent) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick(e as any);
        }
    };

    if (href && isExternal) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={computedClass}
                onClick={onClick}
                {...props}
            >
                {content}
            </a>
        );
    }

    if (to) {
        return (
            <RouterLink to={to} className={computedClass} onClick={onClick} {...props}>
                {content}
            </RouterLink>
        );
    }

    if (href) {
        return (
            <a href={href} className={computedClass} onClick={onClick} {...props}>
                {content}
            </a>
        );
    }

    if (onClick) {
        return (
            <span
                className={computedClass}
                onClick={onClick}
                role="button"
                tabIndex={0}
                onKeyDown={handleKeyDown}
                {...props}
            >
                {content}
            </span>
        );
    }

    return <span className={computedClass}>{content}</span>;
};
