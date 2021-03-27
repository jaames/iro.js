import { Fragment, Component, h } from 'preact';
import { IroInputType } from './ComponentTypes';

const enum InputEventType {
  MouseDown = 'mousedown',
  MouseMove = 'mousemove',
  MouseUp = 'mouseup',
  TouchStart = 'touchstart',
  TouchMove = 'touchmove',
  TouchEnd = 'touchend'
};

const SECONDARY_EVENTS = [InputEventType.MouseMove, InputEventType.TouchMove, InputEventType.MouseUp, InputEventType.TouchEnd];

interface Props {
  onInput: (x: number, y: number, type: IroInputType) => boolean | void;
}

interface State {}

// Base component class for iro UI components
// This extends the Preact component class to allow them to react to mouse/touch input events by themselves
export class IroComponentWrapper extends Component<Props, State> {
  public uid: string
  public base: HTMLElement;

  constructor(props) {
    super(props);
    // Generate unique ID for the component
    // This can be used to generate unique IDs for gradients, etc
    this.uid = (Math.random() + 1).toString(36).substring(5);
  }

  render(props) {
    const eventHandler = this.handleEvent.bind(this);

    let rootProps = {
      onMouseDown: eventHandler,
      // https://github.com/jaames/iro.js/issues/126
      // https://github.com/preactjs/preact/issues/2113#issuecomment-553408767
      ontouchstart: eventHandler,
      // onTouchStart: eventHandler,
    };

    const isHorizontal = props.layoutDirection === 'horizontal';
    const margin = props.margin === null ? props.sliderMargin : props.margin;

    const rootStyles = {
      overflow: 'visible',
      display: isHorizontal ? 'inline-block' : 'block'
    };

    // first component shouldn't have any margin
    if (props.index > 0) {
      rootStyles[isHorizontal ? 'marginLeft' : 'marginTop'] = margin;
    }

    return (
      <Fragment>
        { props.children(this.uid, rootProps, rootStyles) }
      </Fragment>
    )
  }

  // More info on handleEvent:
  // https://medium.com/@WebReflection/dom-handleevent-a-cross-platform-standard-since-year-2000-5bf17287fd38
  // TL;DR this lets us have a single point of entry for multiple events, and we can avoid callback/binding hell
  handleEvent(e: MouseEvent & TouchEvent) {
    const inputHandler = this.props.onInput;
    // Get the screen position of the component
    const bounds = this.base.getBoundingClientRect();
    // Prefect default browser action
    e.preventDefault();
    // Detect if the event is a touch event by checking if it has the `touches` property
    // If it is a touch event, use the first touch input
    const point = e.touches ? e.changedTouches[0] : e;
    const x = point.clientX - bounds.left;
    const y = point.clientY - bounds.top;
    switch (e.type) {
      case InputEventType.MouseDown:
      case InputEventType.TouchStart:
        const result = inputHandler(x, y, IroInputType.Start);
        if (result !== false) {
          SECONDARY_EVENTS.forEach(event => {
            document.addEventListener(event, this, { passive: false });
          });
        }
        break;
      case InputEventType.MouseMove:
      case InputEventType.TouchMove:
        inputHandler(x, y, IroInputType.Move);
        break;
      case InputEventType.MouseUp:
      case InputEventType.TouchEnd:
        inputHandler(x, y, IroInputType.End);
        SECONDARY_EVENTS.forEach(event => {
          document.removeEventListener(event, this, { passive: false } as EventListenerOptions);
        });
        break;
    }
  }


}
