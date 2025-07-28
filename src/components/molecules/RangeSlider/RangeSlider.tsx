'use client';

import * as Slider from '@radix-ui/react-slider';
import { useEffect, useState } from 'react';
import {
    sliderRoot,
    sliderTrack,
    sliderRange,
    sliderThumb,
    inputWrapper,
    input,
} from './RangeSlider.styles';

export interface RangeSliderProps {
    value: [number, number];
    onValueChange: (range: [number, number]) => void;
}

export const RangeSlider = ({ value, onValueChange }: RangeSliderProps) => {
    const [inputValues, setInputValues] = useState<[string, string]>([
        String(value[0]),
        String(value[1]),
    ]);

    useEffect(() => {
        setInputValues([String(value[0]), String(value[1])]);
    }, [value]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        idx: 0 | 1
    ) => {
        const txt = e.target.value;
        setInputValues((prev) => {
            const copy: [string, string] = [...prev];
            copy[idx] = txt;
            return copy;
        });
    };

    const commitInput = (idx: 0 | 1) => {
        const num = Number(inputValues[idx]);
        if (Number.isFinite(num)) {
            const clamped = Math.max(0, Math.min(2000, num));
            const next: [number, number] = [...value];
            next[idx] = clamped;
            if (next[0] > next[1]) next[idx === 0 ? 1 : 0] = clamped;
            onValueChange(next);
        } else {
            setInputValues([String(value[0]), String(value[1])]);
        }
    };

    return (
        <form className="w-full flex flex-col gap-4">
            <Slider.Root
                className={sliderRoot}
                value={value}
                min={0}
                max={2000}
                step={1}
                minStepsBetweenThumbs={1}
                onValueChange={onValueChange}
            >
                <Slider.Track className={sliderTrack}>
                    <Slider.Range className={sliderRange} />
                </Slider.Track>
                <Slider.Thumb className={sliderThumb} aria-label="Monto mínimo" />
                <Slider.Thumb className={sliderThumb} aria-label="Monto máximo" />
            </Slider.Root>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-neutral-600">Monto mínimo</span>
                    <div className={inputWrapper}>
                        <span className="text-neutral-700">$</span>
                        <input
                            className={input}
                            type="number"
                            value={inputValues[0]}
                            onChange={(e) => handleInputChange(e, 0)}
                            onBlur={() => commitInput(0)}
                            onKeyDown={(e) => e.key === 'Enter' && commitInput(0)}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-neutral-600">Monto máximo</span>
                    <div className={inputWrapper}>
                        <span className="text-neutral-700">$</span>
                        <input
                            className={input}
                            type="number"
                            value={inputValues[1]}
                            onChange={(e) => handleInputChange(e, 1)}
                            onBlur={() => commitInput(1)}
                            onKeyDown={(e) => e.key === 'Enter' && commitInput(1)}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
};
