import { Component, h } from 'preact';
import { IroColor, IroColorPickerOptions } from '@irojs/iro-core';
import { IroColorPicker } from './ColorPicker';
export declare enum EventResult {
    start = 0,
    move = 1,
    end = 2
}
export interface IroComponentProps extends IroColorPickerOptions {
    parent: IroColorPicker;
    color: IroColor;
    onInput: Function;
}
interface Props {
    onInput: Function;
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
