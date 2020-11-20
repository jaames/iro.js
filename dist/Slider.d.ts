import { h } from 'preact';
import { SliderShape, SliderType } from '@irojs/iro-core';
import { IroComponentProps } from './ComponentTypes';
interface IroSliderProps extends IroComponentProps {
    sliderType: SliderType;
    sliderShape: SliderShape;
    minTemperature: number;
    maxTemperature: number;
}
export declare function IroSlider(props: IroSliderProps): h.JSX.Element;
export declare namespace IroSlider {
    var defaultProps: {
        sliderShape: string;
        sliderType: string;
        minTemperature: number;
        maxTemperature: number;
    };
}
export {};
