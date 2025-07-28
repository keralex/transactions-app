import { type FC, useRef, useEffect } from 'react';
import { menuItems, overlayClass, closeButtonClass } from './MobileMenu.styles';
import type { MobileMenuProps } from './MobileMenu.interfaces';
import { Button, Container, Link } from '../../atoms';
import { LogoBase } from '../../atoms/LogoBase/LogoBase';

export const MobileMenu: FC<MobileMenuProps> = ({ onClose }) => {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div
            ref={menuRef}
            className={overlayClass}
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
        >
            <Container isFlex direction="column" justify="start" padding="lg" className="w-full h-full">
                {/* Header del menú */}
                <Container isFlex justify="between" align="center" className="mb-6 w-full">
                    <LogoBase
                        src="/app/assets/logos/logo_complete.svg"
                        alt="Ualá Completo"
                        size={160}
                    />
                    <Button
                        icon="close"
                        variant="ghost"
                        onClick={onClose}
                        aria-label="Cerrar menú"
                        className={closeButtonClass}
                        size='sm'
                    />
                </Container>

                {/* Links del menú */}
                <nav role="navigation" aria-label="Opciones principales">
                    <Container isFlex direction="column" gap={6}>
                        {menuItems.map(({ href, label }) => (
                            <Link
                                key={href}
                                to={href}
                                color="dark"
                                size="lg"
                                isBold
                                onClick={onClose}
                                className="py-3"
                            >
                                {label}
                            </Link>
                        ))}
                    </Container>
                </nav>
            </Container>
        </div>
    );
};
