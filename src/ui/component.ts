import { Component } from 'preact';
import { listen, unlisten } from '../util/dom';
import { ColorPickerProps } from '../colorPicker';

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

export interface IroComponentProps extends ColorPickerProps {
  onInput: Function
}

/**
 * Base component class for iro UI components
 * This extends the Preact component class to allow them to react to mouse/touch input events by themselves
 */
export abstract class IroComponent<Props extends IroComponentProps, State> extends Component<Props, State> {
  public uid: string;
  public base: HTMLElement;

  constructor(props: Props) {
    super(props);
    // Generate unique ID for the component
    // This can be used to generate unique IDs for gradients, etc
    this.uid = (Math.random() + 1).toString(36).substring(5);
  }

  componentDidMount() {
    listen(this.base, [EventType.MouseDown, EventType.TouchStart], this, { passive: false });
  }

  componentWillUnmount() {
    unlisten(this.base, [EventType.MouseDown, EventType.TouchStart], this);
  }



  abstract handleInput(x: number, y: number, bounds: ClientRect | DOMRect, type: EventResult);

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

    switch (e.type) {
      case EventType.MouseDown:
      case EventType.TouchStart:
        listen(document, [EventType.MouseMove, EventType.TouchMove, EventType.MouseUp, EventType.TouchEnd], this, { passive: false });
        this.handleInput(x, y, bounds, EventResult.start);
        break;
      case EventType.MouseMove:
      case EventType.TouchMove:
        this.handleInput(x, y, bounds, EventResult.move);
        break;
      case EventType.MouseUp:
      case EventType.TouchEnd:
        this.handleInput(x, y, bounds, EventResult.end);
        unlisten(document, [EventType.MouseMove, EventType.TouchMove, EventType.MouseUp, EventType.TouchEnd], this, { passive: false });
        break;
    }
  }


}
