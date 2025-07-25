import { type FC } from 'react';
import { Link } from '../Link';

interface UalaCompleteLogoProps {
    size?: number;
    to?: string;
}

export const UalaCompleteLogo: FC<UalaCompleteLogoProps> = ({ size = 120, to = '/' }) => {
    return (
        <Link to={to} aria-label="Ir a inicio" className="inline-block">
            <img
                src="/app/assets/logos/logo_complete.svg"
                alt="Ualá"
                width={size}
                height="auto"
                className="block"
            />
        </Link>
    );
};
