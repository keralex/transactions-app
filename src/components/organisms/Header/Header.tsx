
import { useRef, useState, type FC } from 'react';
import type { HeaderProps } from './Header.interfaces';
import { headerContainerClass, cornerStyle } from './Header.styles';
import { Button, Container } from '../../atoms';
import { MobileMenu } from '../MobileMenu';
import { LogoBase } from '../../atoms/LogoBase/LogoBase';

export const Header: FC<HeaderProps> = ({ onMenuClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
        onMenuClick?.();
    };




    return (
        <header className='fixed w-full z-50'>
            <style dangerouslySetInnerHTML={{ __html: cornerStyle }} />
            <Container style={{ filter: 'drop-shadow(var(--elevation-shadow-soft))' }} className={`${headerContainerClass} h-[56px]`} isFlex>
                <Container isFlex justify="between" align="center" className="relative w-full mx-auto h-full">
                    <div className="absolute left-0" ref={toggleRef}>
                        <Button
                            icon="menu"
                            variant="ghost"
                            onClick={handleToggle}
                            aria-label="Abrir menú de navegación"
                        />
                    </div>

                    <Container isFlex justify="center" className="flex-1">
                        <LogoBase
                            src="/app/assets/logos/uala.svg"
                            alt="Ualá"
                            size={61}
                        />
                    </Container>

                    {isOpen && <MobileMenu onClose={() => setIsOpen(false)} />}

                </Container>
            </Container>
        </header>
    );
};
