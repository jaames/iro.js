import IroComponent, { EventResult } from './component';
export default abstract class IroWheel extends IroComponent {
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
