import { IroColor, IroColorValue } from 'iro-core';
interface HandleOrigin {
    x: number;
    y: number;
}
export interface ColorPickerProps {
    width: number;
    height: number;
    handleRadius: number;
    handleSvg: string;
    handleOrigin: HandleOrigin;
    color: IroColorValue;
    borderColor: string;
    borderWidth: number;
    display: string;
    id: null;
    wheelLightness: boolean;
    wheelAngle: number;
    wheelDirection: string;
    sliderHeight: number;
    sliderMargin: number;
    padding: number;
    layout: any;
}
export interface ColorPickerState extends ColorPickerProps {
    color: IroColor;
}
export declare const IroColorPickerWidget: {
    (parent: any, props: any): any;
    prototype: any;
    __component: any;
};
export {};
