import { h } from 'preact';
import { IroComponent, IroComponentProps, EventResult } from './component';
interface IroSliderProps extends IroComponentProps {
    sliderType: string;
}
interface IroSliderState {
}
export declare class IroSlider extends IroComponent<IroSliderProps, IroSliderState> {
    height: number;
    width: number;
    handleInput(x: number, y: number, bounds: DOMRect | ClientRect, type: EventResult): void;
    render(props: any): h.JSX.Element;
}
export {};
