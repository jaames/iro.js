import { IroColor, IroColorPickerOptions } from 'iro-core';
import { IroComponent } from './ui/component';
interface ColorPickerLayoutDefinition {
    component: IroComponent<any, any>;
    options: any;
}
export declare type ColorPickerProps = {
    display?: string;
    id?: null;
    layout?: ColorPickerLayoutDefinition[];
} & IroColorPickerOptions;
export declare type ColorPickerState = {
    color: IroColor;
} & ColorPickerProps;
export declare const IroColorPickerWidget: {
    (parent: any, props: any): any;
    prototype: any;
    __component: any;
};
export {};
