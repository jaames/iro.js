import { h } from 'preact';
import { LayoutDirection } from '@irojs/iro-core';
import { SliderType } from '@irojs/iro-core';
interface IroLabelProps {
    sliderType: SliderType;
    layoutDirection: LayoutDirection;
    handleRadius: number;
}
export declare function IroLabel(props: IroLabelProps): h.JSX.Element;
export {};
