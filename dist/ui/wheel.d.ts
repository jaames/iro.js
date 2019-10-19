import { h } from 'preact';
import { IroComponent, IroComponentProps, EventResult } from './component';
interface IroWheelProps extends IroComponentProps {
}
interface IroWheelState {
}
export declare class IroWheel extends IroComponent<IroWheelProps, IroWheelState> {
    handleInput(x: number, y: number, bounds: DOMRect | ClientRect, type: EventResult): void;
    render(props: any): h.JSX.Element;
}
export {};
