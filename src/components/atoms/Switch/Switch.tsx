import type { MouseEvent } from 'react';

interface SwitchProps {
    state: boolean;
    label: string;
    onChange: (checked: boolean) => void;
}

export const Switch = ({ state, onChange, label }: SwitchProps) => {
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onChange(!state);
    };

    return (
        <button
            aria-label={label}
            aria-pressed={state}
            data-checked={state}
            onClick={handleClick}
            className={`relative flex items-center h-6 min-w-[44px] rounded-full transition-colors duration-200
        ${state ? 'bg-primary' : 'bg-neutral-dark'}`}
        >
            <span
                className={`absolute w-4 h-4 rounded-full bg-white transition-all duration-200
        ${state ? 'left-[calc(100%-20px)]' : 'left-1'}`}
            />
        </button>
    );
};

