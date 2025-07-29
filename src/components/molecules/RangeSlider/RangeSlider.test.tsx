import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RangeSlider } from './RangeSlider';

describe('<RangeSlider />', () => {
    const onValueChange = vi.fn();
    const defaultValue: [number, number] = [200, 1500];

    beforeEach(() => {
        onValueChange.mockClear();
    });

    it('renders with correct labels and values', () => {
        render(<RangeSlider value={defaultValue} onValueChange={onValueChange} />);

        expect(screen.getByText('Monto mínimo')).toBeInTheDocument();
        expect(screen.getByText('Monto máximo')).toBeInTheDocument();
        expect(screen.getByText('$200')).toBeInTheDocument();
        expect(screen.getByText('$1500')).toBeInTheDocument();
    });

    it('renders two thumbs with correct aria-labels', () => {
        render(<RangeSlider value={defaultValue} onValueChange={onValueChange} />);

        const thumbs = screen.getAllByRole('slider');
        expect(thumbs).toHaveLength(2);
        expect(screen.getByLabelText('Monto mínimo')).toBeInTheDocument();
        expect(screen.getByLabelText('Monto máximo')).toBeInTheDocument();
    });

    it('calls onValueChange when thumb is moved (keyboard simulation)', async () => {
        render(<RangeSlider value={defaultValue} onValueChange={onValueChange} />);

        const thumbs = screen.getAllByRole('slider');
        await userEvent.click(thumbs[0]);
        await userEvent.keyboard('{ArrowRight}');

        expect(onValueChange).toHaveBeenCalled();
    });

    it('shows updated values in UI when props change', () => {
        const { rerender } = render(<RangeSlider value={[100, 1000]} onValueChange={onValueChange} />);

        expect(screen.getByText('$100')).toBeInTheDocument();
        expect(screen.getByText('$1000')).toBeInTheDocument();

        rerender(<RangeSlider value={[500, 1600]} onValueChange={onValueChange} />);

        expect(screen.getByText('$500')).toBeInTheDocument();
        expect(screen.getByText('$1600')).toBeInTheDocument();
    });
});
