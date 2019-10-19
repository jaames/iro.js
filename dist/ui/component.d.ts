import { Component } from 'preact';
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
export declare abstract class IroComponent<Props extends IroComponentProps, State> extends Component<Props, State> {
    uid: string;
    base: HTMLElement;
    constructor(props: Props);
    componentDidMount(): void;
    componentWillUnmount(): void;
    abstract handleInput(x: number, y: number, bounds: ClientRect | DOMRect, type: EventResult): any;
    handleEvent(e: MouseEvent & TouchEvent): void;
}
