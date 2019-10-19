import { IroColor, IroColorPickerOptions } from 'iro-core';
import { IroComponent } from './ui/component';
interface ColorPickerLayoutDefinition {
    component: IroComponent<any, any>;
    options: any;
}
export interface ColorPickerProps extends IroColorPickerOptions {
    display?: string;
    id?: null;
    layout?: ColorPickerLayoutDefinition[];
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
