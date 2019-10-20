import { Component } from 'preact';
import { IroColor, IroColorPickerOptions } from 'iro-core';
interface ColorPickerLayoutDefinition {
    component: Component;
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
