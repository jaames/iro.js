import { Component, h } from 'preact';
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
    color: IroColor;
    colors: IroColor[];
    activeIndex?: number;
    onInput: (type: IroInputType) => void;
}
interface Props {
    onInput: (x: number, y: number, type: IroInputType) => void;
}
interface State {
}
export declare class IroComponentBase extends Component<Props, State> {
    uid: string;
    base: HTMLElement;
    constructor(props: any);
    render(props: any): h.JSX.Element;
    handleEvent(e: MouseEvent & TouchEvent): void;
}
export {};
