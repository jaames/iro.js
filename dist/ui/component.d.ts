import { Component } from 'preact';
export declare enum EventResult {
    start = 0,
    move = 1,
    end = 2
}
interface Props {
    sliderType: any;
    onInput: any;
    wheelAngle: any;
    wheelDirection: any;
    width: any;
    padding: any;
    handleRadius: any;
    borderWidth: any;
}
interface State {
}
/**
 * Base component class for iro UI components
 * This extends the Preact component class to allow them to react to mouse/touch input events by themselves
 */
export default abstract class IroComponent extends Component<Props, State> {
    uid: string;
    base: HTMLElement;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    abstract handleInput(x: number, y: number, bounds: ClientRect | DOMRect, type: EventResult): any;
    handleEvent(e: MouseEvent | TouchEvent): void;
}
export {};
