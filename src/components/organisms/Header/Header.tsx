
import { useEffect, useRef, useState, type FC } from 'react';
import type { HeaderProps } from './Header.interfaces';
import { headerContainerClass, cornerStyle, menuItems } from './Header.styles';
import { Button, Container, UalaLogo } from '../../atoms';
import { Link } from 'react-router-dom';

export const Header: FC<HeaderProps> = ({ onMenuClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const toggleRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
        onMenuClick?.();
    };

    const handleItemClick = () => setIsOpen(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isOpen &&
                menuRef.current &&
                toggleRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                !toggleRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

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

                    {isOpen && (
                        <div
                            ref={menuRef}
                            className="absolute top-full left-0 right-0 bg-white shadow-sm z-50"
                        >
                            <nav role="navigation" aria-label="Menú principal">
                                <Container isFlex direction="column" padding="md" gap={4}>
                                    {menuItems.map(({ href, label }) => (
                                        <Link
                                            key={href}
                                            to={href}
                                            color="dark"
                                            className="py-2"
                                            onClick={handleItemClick}
                                        >
                                            {label}
                                        </Link>
                                    ))}
                                </Container>
                            </nav>
                        </div>
                    )}
                </Container>
            </Container>
        </header>
    );
};
