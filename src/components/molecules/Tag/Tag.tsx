import { Button, Icon } from '../../atoms';
import {
    selectedTagClasses,
} from './Tag.styles';

interface TagProps {
    text: string;
    value: string;
    selected?: boolean;
    onSelect: (value: string) => void;
}

export const Tag = ({ text, value, selected = false, onSelect, ...props }: TagProps) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onSelect(value);
    };

    const classes = `text-[14px] font-semibold ${selected && selectedTagClasses}`;

    return (
        <Button
            type="button"
            variant={'outline'}
            label={text}
            className={classes}
            aria-pressed={selected}
            onClick={handleClick}
            icon={selected ? "close" : ''}
            iconPosition='right'
            iconSize={10}
            {...props}
        >

        </Button>
    );
};
