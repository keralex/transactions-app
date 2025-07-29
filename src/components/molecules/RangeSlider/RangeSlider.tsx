import * as Slider from '@radix-ui/react-slider';
import {
    sliderRoot,
    sliderTrack,
    sliderRange,
    sliderThumb,
} from './RangeSlider.styles';
import { Container } from '../../atoms';

export interface RangeSliderProps {
    value: [number, number];
    onValueChange: (range: [number, number]) => void;
}

export const RangeSlider = ({ value, onValueChange }: RangeSliderProps) => {

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
            <Container isFlex justify='between'>
                <div className="flex flex-col items-start  py-1 px-3 rounded-xl  border border-primary">
                    <span className=" text-neutral-dark text-[10px]">Monto mínimo</span>
                    <span className="text-[14px] text-text-dark">${value[0]}</span>
                </div>

                <div className="flex flex-col items-start  py-1 px-3 rounded-xl  border border-primary">
                    <span className=" text-neutral-dark text-[10px]">Monto máximo</span>
                    <span className="text-[14px] text-text-dark">${value[1]}</span>
                </div>
            </Container>
        </form>
    );
};
