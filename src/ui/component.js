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
    console.log(this.root);
    listen(this.root, [EVENT_MOUSEDOWN, EVENT_TOUCHSTART], this, { passive:false });
  }

  componentWillUnmount() {
    unlisten(this.root, [EVENT_MOUSEDOWN, EVENT_TOUCHSTART], this);
  }

  handleEvent(e) {
    const { root } = this;
    // Detect if the event is a touch event by checking if it has the `touches` property
    // If it is a touch event, use the first touch input
    e.preventDefault();
    var point = e.touches ? e.changedTouches[0] : e;
    var x = point.clientX;
    var y = point.clientY;
    // Get the screen position of the component
    var rect = root.getBoundingClientRect();

    var hsv;  
    switch (e.type) {
      case EVENT_MOUSEDOWN:
      case EVENT_TOUCHSTART:
        listen(document, [EVENT_MOUSEMOVE, EVENT_TOUCHMOVE, EVENT_MOUSEUP, EVENT_TOUCHEND], this, { passive:false });
        hsv = this.input(x, y, rect, "START");
        // parent.emit("input:start", parent.color);
        break;
      case EVENT_MOUSEMOVE:
      case EVENT_TOUCHMOVE:
        // Use the position to update the picker color
        hsv = this.input(x, y, rect, "MOVE");
        break;
      case EVENT_MOUSEUP:
      case EVENT_TOUCHEND:
        hsv = this.input(x, y, rect, "END");
        // parent.emit("input:end", parent.color);
        unlisten(document, [EVENT_MOUSEMOVE, EVENT_TOUCHMOVE, EVENT_MOUSEUP, EVENT_TOUCHEND], this);
        break;
    }
    // if (hsv) parent.color.hsv = hsv;
  }

  input(x, y, rect, type) {

  }

}