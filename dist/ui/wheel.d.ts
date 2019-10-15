import { IroComponent, IroComponentProps, EventResult } from './component';
interface IroWheelProps extends IroComponentProps {
}
interface IroWheelState {
}
export declare class IroWheel extends IroComponent<IroWheelProps, IroWheelState> {
    private transformAngle;
    /**
      * @desc handles mouse input for this component
      * @param {Number} x - point x coordinate
      * @param {Number} y - point y coordinate
      * @param {DOMRect} rect - bounding client rect for the component's base element
      * @param {String} type - input type: "START", "MOVE" or "END"
    */
    handleInput(x: number, y: number, bounds: DOMRect | ClientRect, type: EventResult): void;
    render(props: any): JSX.Element;
}
export {};
