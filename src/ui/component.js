import { Component } from "preact";
import { listen, unlisten } from "util/dom";

const EVENT_MOUSEDOWN = "mousedown",
      EVENT_MOUSEMOVE = "mousemove",
      EVENT_MOUSEUP = "mouseup",
      EVENT_TOUCHSTART = "touchstart",
      EVENT_TOUCHMOVE = "touchmove",
      EVENT_TOUCHEND = "touchend";

export default class IroComponent extends Component {

  componentDidMount() {
    listen(this.base, [EVENT_MOUSEDOWN, EVENT_TOUCHSTART], this, { passive:false });
  }

  componentWillUnmount() {
    unlisten(this.base, [EVENT_MOUSEDOWN, EVENT_TOUCHSTART], this);
  }

  handleEvent(e) {
    e.preventDefault();
    const { base } = this;
    // Detect if the event is a touch event by checking if it has the `touches` property
    // If it is a touch event, use the first touch input
    const point = e.touches ? e.changedTouches[0] : e;
    const x = point.clientX;
    const y = point.clientY;
    // Get the screen position of the component
    const rect = base.getBoundingClientRect();

    switch (e.type) {
      case EVENT_MOUSEDOWN:
      case EVENT_TOUCHSTART:
        listen(document, [EVENT_MOUSEMOVE, EVENT_TOUCHMOVE, EVENT_MOUSEUP, EVENT_TOUCHEND], this, { passive: false });
        this.handleInput(x, y, rect, "START");
        break;
      case EVENT_MOUSEMOVE:
      case EVENT_TOUCHMOVE:
        this.handleInput(x, y, rect, "MOVE");
        break;
      case EVENT_MOUSEUP:
      case EVENT_TOUCHEND:
        this.handleInput(x, y, rect, "END");
        unlisten(document, [EVENT_MOUSEMOVE, EVENT_TOUCHMOVE, EVENT_MOUSEUP, EVENT_TOUCHEND], this);
        break;
    }
  }
}