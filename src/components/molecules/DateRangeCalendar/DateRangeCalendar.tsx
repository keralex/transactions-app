import { type DateRange, DayPicker } from 'react-day-picker';
import { type FC } from 'react';
import { es } from 'react-day-picker/locale';
import styles from './styles.module.scss';

interface Props {
    range: DateRange | undefined;
    onChange: (range: DateRange | undefined) => void;
    label?: string;
    footer?: React.ReactNode;
}

export const DateRangeCalendar: FC<Props> = ({
    range,
    onChange,
    label = 'Selector de fechas',
    footer,
}) => {
    return (
        <DayPicker
            mode="range"
            selected={range}
            onSelect={onChange}
            locale={es}
            classNames={styles}
            navLayout="around"
            startMonth={new Date(2024, 12)}
            aria-label={label}
            disabled={{ after: new Date() }}
            footer={footer && <div className={styles.calendarFooter}>{footer}</div>}
        />
    );
};
