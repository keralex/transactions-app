
import { useRef, useState, type FC } from 'react';
import type { HeaderProps } from './Header.interfaces';
import { headerContainerClass, cornerStyle } from './Header.styles';
import { Button, Container, UalaLogo } from '../../atoms';
import { MobileMenu } from '../MobileMenu';

export const Header: FC<HeaderProps> = ({ onMenuClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
        onMenuClick?.();
    };




    return (
        <header>
            <style dangerouslySetInnerHTML={{ __html: cornerStyle }} />
            <Container className={`${headerContainerClass} h-[56px]`} isFlex>
                <Container isFlex justify="between" align="center" className="relative mx-auto h-full">
                    <div className="absolute left-0" ref={toggleRef}>
                        <Button
                            icon="menu"
                            variant="ghost"
                            onClick={handleToggle}
                            aria-label="Abrir menú de navegación"
                        />
                    </div>

                    <Container isFlex justify="center" className="flex-1">
                        <UalaLogo size={61} />
                    </Container>

                    {isOpen && <MobileMenu onClose={() => setIsOpen(false)} />}

                </Container>
            </Container>
        </header>
    );
};
