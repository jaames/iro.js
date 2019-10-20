import { Component, h } from 'preact';
import { IroColor, IroColorPickerOptions } from 'iro-core';
export declare function listen(el: EventTarget, eventList: string[], callback: any, params?: AddEventListenerOptions): void;
export declare function unlisten(el: EventTarget, eventList: string[], callback: any, params?: AddEventListenerOptions): void;
export declare enum EventResult {
    start = 0,
    move = 1,
    end = 2
}
export interface IroComponentProps extends IroColorPickerOptions {
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
    constructor(props: Props);
    render(props: any): h.JSX.Element;
    handleEvent(e: MouseEvent & TouchEvent): void;
}
export {};
