import { Component } from 'preact';
import { listen, unlisten } from 'util/dom';

const EVENT_MOUSEDOWN = 'mousedown';
const EVENT_MOUSEMOVE = 'mousemove';
const EVENT_MOUSEUP = 'mouseup';
const EVENT_TOUCHSTART = 'touchstart';
const EVENT_TOUCHMOVE = 'touchmove';
const EVENT_TOUCHEND = 'touchend';

/**
 * Base component class for iro UI components
 * This extends the Preact component class to allow them to react to mouse/touch input events by themselves
 */
export default class IroComponent extends Component {

  constructor(props) {
    super(props);
    // Generate unique ID for the component
    // This can be used to generate unique IDs for gradients, etc
    this.uid = (Math.random() + 1).toString(36).substring(5);
  }
  
  componentDidMount() {
    listen(this.base, [EVENT_MOUSEDOWN, EVENT_TOUCHSTART], this, { passive: false });
  }

  componentWillUnmount() {
    unlisten(this.base, [EVENT_MOUSEDOWN, EVENT_TOUCHSTART], this);
  }

  // More info on handleEvent:
  // http://download-cdn.miitomo.com/native/20180125111639/manifests/v2_20180405_3_android/manifest.json
  // TL;DR this lets us have a single point of entry for multiple events, and we can avoid callback/binding hell
  handleEvent(e) {
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
        unlisten(document, [EVENT_MOUSEMOVE, EVENT_TOUCHMOVE, EVENT_MOUSEUP, EVENT_TOUCHEND], this);
        break;
    }
  }
}