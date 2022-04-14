import { h } from 'preact';
import { LayoutDirection } from '@irojs/iro-core';
import { IroColor, SliderType } from '@irojs/iro-core';
interface IroInputProps {
    sliderType: SliderType;
    activeColor: IroColor;
    layoutDirection: LayoutDirection;
    handleRadius: number;
    disabled: boolean;
    minTemperature: number;
    maxTemperature: number;
}
export declare function IroInput(props: IroInputProps): h.JSX.Element;
export declare namespace IroInput {
    var defaultProps: {
        disabled: boolean;
    };
}
export {};
