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
    render(props: any): h.JSX.Element;
    /**
      * @desc handles mouse input for this component
      * @param {Number} x - point x coordinate
      * @param {Number} y - point y coordinate
      * @param {DOMRect} rect - bounding client rect for the component's base element
      * @param {String} type - input type: "START", "MOVE" or "END"
    */
    handleInput(x: number, y: number, bounds: DOMRect | ClientRect, type: EventResult): void;
}
export {};
