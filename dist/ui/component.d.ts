import { Component } from 'preact';
import { ColorPickerProps } from '../colorPicker';
export declare enum EventResult {
    start = 0,
    move = 1,
    end = 2
}
export interface IroComponentProps extends ColorPickerProps {
    onInput: Function;
}
/**
 * Base component class for iro UI components
 * This extends the Preact component class to allow them to react to mouse/touch input events by themselves
 */
export declare abstract class IroComponent<Props extends IroComponentProps, State> extends Component<Props, State> {
    uid: string;
    base: HTMLElement;
    constructor(props: Props);
    componentDidMount(): void;
    componentWillUnmount(): void;
    abstract handleInput(x: number, y: number, bounds: ClientRect | DOMRect, type: EventResult): any;
    handleEvent(e: MouseEvent & TouchEvent): void;
}
