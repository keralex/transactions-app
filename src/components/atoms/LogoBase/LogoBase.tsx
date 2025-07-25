import type { FC } from 'react';
import { Link } from '../Link';

interface LogoBaseProps {
    src: string;
    alt: string;
    size?: number;
    to?: string;
    className?: string;
}

export const LogoBase: FC<LogoBaseProps> = ({
    src,
    alt,
    size = 120,
    to = '/',
    className = '',
}) => (
    <Link to={to} aria-label={`Ir a ${alt}`} className="inline-block">
        <img
            src={src}
            alt={alt}
            width={size}
            height="auto"
            className={`block ${className}`}
        />
    </Link>
);
