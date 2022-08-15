import { h } from 'preact';
import { SliderShape, SliderType } from '@irojs/iro-core';
import { IroComponentProps } from './ComponentTypes';
interface IroSliderProps extends IroComponentProps {
    sliderType: SliderType;
    sliderShape: SliderShape;
    sliderSize: number;
    minTemperature: number;
    maxTemperature: number;
    showInput: boolean;
    showLabel: boolean;
    disabled: boolean;
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
