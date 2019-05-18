import { Component } from 'preact';
import { listen, unlisten } from '../util/dom';

const EVENT_MOUSEDOWN = 'mousedown';
const EVENT_MOUSEMOVE = 'mousemove';
const EVENT_MOUSEUP = 'mouseup';
const EVENT_TOUCHSTART = 'touchstart';
const EVENT_TOUCHMOVE = 'touchmove';
const EVENT_TOUCHEND = 'touchend';


interface Props {
  sliderType: any,
  onInput: any,
  wheelAngle: any,
  wheelDirection: any,
  width: any,
  padding: any,
  handleRadius: any,
  borderWidth: any
}
interface State {

}

/**
 * Base component class for iro UI components
 * This extends the Preact component class to allow them to react to mouse/touch input events by themselves
 */
export default abstract class IroComponent extends Component<Props, State> {
  public uid: string;
  public base: any; //couldnt find it, put this to fix the compile errors #FIX

  constructor(props: any) {
    super(props, {});
    // Generate unique ID for the component
    // This can be used to generate unique IDs for gradients, etc
    this.uid = (Math.random() + 1).toString(36).substring(5);
  }
  
  //WHERE DOES this.base EVEN COME FROM!?

  componentDidMount() {
    listen(this.base, [EVENT_MOUSEDOWN, EVENT_TOUCHSTART], this, { passive: false });
  }

  componentWillUnmount() {
    unlisten(this.base, [EVENT_MOUSEDOWN, EVENT_TOUCHSTART], this);
  }

  abstract handleInput(x: any, y: any, bounds: any, type: any);

  // More info on handleEvent:
  // https://medium.com/@WebReflection/dom-handleevent-a-cross-platform-standard-since-year-2000-5bf17287fd38
  // TL;DR this lets us have a single point of entry for multiple events, and we can avoid callback/binding hell
  handleEvent(e: any) {
    e.preventDefault();
    // Detect if the event is a touch event by checking if it has the `touches` property
    // If it is a touch event, use the first touch input
    const point = e.touches ? e.changedTouches[0] : e;
    const x = point.clientX;
    const y = point.clientY;
    // Get the screen position of the component
    const bounds = this.base.getBoundingClientRect();

    switch (e.type) {
      case EVENT_MOUSEDOWN:
      case EVENT_TOUCHSTART:
        listen(document, [EVENT_MOUSEMOVE, EVENT_TOUCHMOVE, EVENT_MOUSEUP, EVENT_TOUCHEND], this, { passive: false });
        this.handleInput(x, y, bounds, 'START');
        break;
      case EVENT_MOUSEMOVE:
      case EVENT_TOUCHMOVE:
        this.handleInput(x, y, bounds, 'MOVE');
        break;
      case EVENT_MOUSEUP:
      case EVENT_TOUCHEND:
        this.handleInput(x, y, bounds, 'END');
        unlisten(document, [EVENT_MOUSEMOVE, EVENT_TOUCHMOVE, EVENT_MOUSEUP, EVENT_TOUCHEND], this, { passive: false });
        break;
    }
  }


}
