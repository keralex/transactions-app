// src/components/atoms/Icon/Icon.tsx
import { type FC } from 'react';
import { iconWrapperStyle } from './Icon.styles';
import { icons } from './icons';
import type { IconProps } from './Icon.interfaces';

export const Icon: FC<IconProps> = ({
    name,
    customClass = '',
    size = 24,
    ariaLabel,
    role = 'img',
    ...rest
}) => {
    const SvgIcon = icons[name];

    if (!SvgIcon) {
        console.warn(`Icon "${name}" no se encuentra registrado.`);
        return null;
    }

    return (
        <span
            className={`${iconWrapperStyle} ${customClass}`}
            style={{ width: size, height: size }}
            role={role}
            aria-label={ariaLabel ?? name}
            aria-hidden={ariaLabel ? undefined : true}
            dangerouslySetInnerHTML={{ __html: SvgIcon }}
            {...rest}
        />
    );
};
