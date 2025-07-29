import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DateRangeCalendar } from './DateRangeCalendar';
import type { DateRange } from 'react-day-picker';


describe('<DateRangeCalendar />', () => {
    const onChange = vi.fn();

    beforeEach(() => {
        onChange.mockClear();
    });

    it('renders with default label', () => {
        render(<DateRangeCalendar range={undefined} onChange={onChange} />);
        const calendar = screen.getByLabelText('Selector de fechas');
        expect(calendar).toBeInTheDocument();
    });

    it('renders with custom label', () => {
        render(<DateRangeCalendar range={undefined} onChange={onChange} label="Seleccionar fechas" />);
        const calendar = screen.getByLabelText('Seleccionar fechas');
        expect(calendar).toBeInTheDocument();
    });

    it('renders footer if provided', () => {
        render(
            <DateRangeCalendar
                range={undefined}
                onChange={onChange}
                footer={<div data-testid="calendar-footer">Calendario</div>}
            />
        );
        expect(screen.getByTestId('calendar-footer')).toBeInTheDocument();
    });

    it('does not render footer if not provided', () => {
        render(<DateRangeCalendar range={undefined} onChange={onChange} />);
        expect(screen.queryByTestId('calendar-footer')).not.toBeInTheDocument();
    });

    it('calls onChange when the component receives a new selection', () => {
        const onChange = vi.fn();

        const { rerender } = render(<DateRangeCalendar range={undefined} onChange={onChange} />);

        const newRange: DateRange = {
            from: new Date(2024, 10, 5),
            to: new Date(2024, 10, 10),
        };

        rerender(<DateRangeCalendar range={newRange} onChange={onChange} />);

        expect(onChange).not.toHaveBeenCalled();
    });
});
