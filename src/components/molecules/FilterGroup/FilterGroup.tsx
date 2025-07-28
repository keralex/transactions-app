import type { FC } from 'react';
import { Icon, Switch, Text } from '../../atoms';

interface FilterGroupProps {
    label: string;
    icon: string;
    isOpen: boolean;
    onToggle: (open: boolean) => void;
    children: React.ReactNode;
}

export const FilterGroup: FC<FilterGroupProps> = ({ label, icon, isOpen, onToggle, children }) => {
    return (
        <div >
            <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primaryLight">
                        <Icon name={icon} size={24} className="text-primary" />
                    </div>
                    <Text className="text-text-dark" weight='semibold'>{label}</Text>
                </div>
                <Switch state={isOpen} onChange={onToggle} label={label} />
            </div>
            {isOpen && <div className="mt-2">{children}</div>}
        </div>
    );
};
