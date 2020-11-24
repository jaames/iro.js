import { IroColor, IroColorPickerOptions } from '@irojs/iro-core';
import { IroColorPicker } from './ColorPicker';
export declare const enum IroInputType {
    Start = 0,
    Move = 1,
    End = 2
}
export interface IroComponentProps extends IroColorPickerOptions {
    parent: IroColorPicker;
    index: number;
    id?: string;
    color: IroColor;
    colors: IroColor[];
    activeIndex?: number;
    onInput: (type: IroInputType, id: string) => void;
}
