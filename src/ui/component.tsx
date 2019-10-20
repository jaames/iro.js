import { Fragment, Component, h } from 'preact';
import { IroColor, IroColorPickerOptions } from 'iro-core';

// Listen to one or more events on an element
export function listen(el: EventTarget, eventList: string[], callback: any, params?: AddEventListenerOptions) {
  for (var i = 0; i < eventList.length; i++) {
    el.addEventListener(eventList[i], callback, params);
  }
};

// Remove an event listener on an element
export function unlisten(el: EventTarget, eventList: string[], callback: any, params?: AddEventListenerOptions) {
  for (var i = 0; i < eventList.length; i++) {
    el.removeEventListener(eventList[i], callback, params);
  }
};

enum EventType {
  MouseDown = 'mousedown',
  MouseMove = 'mousemove',
  MouseUp = 'mouseup',
  TouchStart = 'touchstart',
  TouchMove = 'touchstart',
  TouchEnd = 'touchend'
}

export enum EventResult {
  start,
  move,
  end
}

export interface IroComponentProps extends IroColorPickerOptions {
  color: IroColor;
  onInput: Function;
}

interface Props {
  onInput: Function;
}

interface State {}

// Base component class for iro UI components
// This extends the Preact component class to allow them to react to mouse/touch input events by themselves
export class IroComponentBase extends Component<Props, State> {
  public uid: string;
  public base: HTMLElement;

  constructor(props: Props) {
    super(props);
    // Generate unique ID for the component
    // This can be used to generate unique IDs for gradients, etc
    this.uid = (Math.random() + 1).toString(36).substring(5);
  }

  render(props) {

    const rootProps = {
      onMouseDown: this.handleEvent.bind(this),
      onTouchStart: this.handleEvent.bind(this)
    }

    const rootStyles = {
      overflow: 'visible',
      display: 'block'
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
    e.preventDefault();
    // Detect if the event is a touch event by checking if it has the `touches` property
    // If it is a touch event, use the first touch input
    const point = e.touches ? e.changedTouches[0] : e;
    const x = point.clientX;
    const y = point.clientY;

    // Get the screen position of the component
    const bounds = this.base.getBoundingClientRect();
    const inputHandler = this.props.onInput;

    switch (e.type) {
      case EventType.MouseDown:
      case EventType.TouchStart:
        listen(document, [EventType.MouseMove, EventType.TouchMove, EventType.MouseUp, EventType.TouchEnd], this, { passive: false });
        inputHandler(x, y, bounds, EventResult.start);
        break;
      case EventType.MouseMove:
      case EventType.TouchMove:
        inputHandler(x, y, bounds, EventResult.move);
        break;
      case EventType.MouseUp:
      case EventType.TouchEnd:
        inputHandler(x, y, bounds, EventResult.end);
        unlisten(document, [EventType.MouseMove, EventType.TouchMove, EventType.MouseUp, EventType.TouchEnd], this, { passive: false });
        break;
    }
  }


}
