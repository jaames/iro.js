import { Component, h } from 'preact';
import { IroInputType } from './ComponentTypes';
interface Props {
    onInput: (x: number, y: number, type: IroInputType) => boolean | void;
}
interface State {
}
export declare class IroComponentWrapper extends Component<Props, State> {
    uid: string;
    base: HTMLElement;
    constructor(props: any);
    render(props: any): h.JSX.Element;
    handleEvent(e: MouseEvent & TouchEvent): void;
}
export {};
