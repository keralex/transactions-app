import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Switch } from './Switch';

describe('<Switch />', () => {
    const onChange = vi.fn();

    beforeEach(() => {
        onChange.mockClear();
    });

    it('renders with correct label and aria attributes', () => {
        render(<Switch state={false} label="Toggle Dark Mode" onChange={onChange} />);

        const button = screen.getByRole('button', { name: /toggle dark mode/i });

        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('aria-label', 'Toggle Dark Mode');
        expect(button).toHaveAttribute('aria-pressed', 'false');
        expect(button).toHaveAttribute('data-checked', 'false');
    });

    it('renders with active state', () => {
        render(<Switch state={true} label="Active switch" onChange={onChange} />);
        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('aria-pressed', 'true');
        expect(button.className).toContain('bg-primary');
    });

    it('calls onChange with toggled value when clicked', async () => {
        render(<Switch state={false} label="Clickable" onChange={onChange} />);
        const button = screen.getByRole('button');

        await userEvent.click(button);
        expect(onChange).toHaveBeenCalledWith(true);
    });

    it('indicator moves to correct position', () => {
        const { container, rerender } = render(<Switch state={false} label="Moving" onChange={onChange} />);
        let thumb = container.querySelector('span');
        expect(thumb?.className).toContain('left-1');

        rerender(<Switch state={true} label="Moving" onChange={onChange} />);
        thumb = container.querySelector('span');
        expect(thumb?.className).toContain('left-[calc(100%-20px)]');
    });
});
