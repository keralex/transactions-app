import { type FC } from 'react';
import { Link } from '../Link';

interface UalaLogoProps {
    size?: number;
    to?: string;
}

export const UalaLogo: FC<UalaLogoProps> = ({ size = 120, to = '/' }) => {
    return (
        <Link to={to} aria-label="Ir a inicio" className="inline-block">
            <img
                src="/app/assets/logos/uala.svg"
                alt="Ualá"
                width={size}
                height="auto"
                className="block"
            />
        </Link>
    );
};
