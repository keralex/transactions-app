import { Button, Icon } from '../../atoms';
import {
    baseTagClasses,
    defaultTagClasses,
    selectedTagClasses,
} from './Tag.styles';

interface TagProps {
    text: string;
    value: string;
    selected?: boolean;
    onSelect: (value: string) => void;
}

/**
 * Tag is a molecule that wraps the base Button component
 * and renders a selectable filter chip with a label and optional close icon.
 */
export const Tag = ({ text, value, selected = false, onSelect, ...props }: TagProps) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onSelect(value);
    };

    const classes = `${baseTagClasses} ${selected ? selectedTagClasses : defaultTagClasses}`;

    return (
        <Button
            type="button"
            label={text}
            className={classes}
            aria-pressed={selected}
            onClick={handleClick}
            {...props}
        >
            {selected && <Icon name="close" size={12} />}
        </Button>
    );
};
