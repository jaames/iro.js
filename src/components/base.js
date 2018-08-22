import {listen, unlisten} from "util/dom";

const EVENT_MOUSEDOWN = "mousedown",
      EVENT_MOUSEMOVE = "mousemove",
      EVENT_MOUSEUP = "mouseup",
      EVENT_TOUCHSTART = "touchstart",
      EVENT_TOUCHMOVE = "touchmove",
      EVENT_TOUCHEND = "touchend";

export default class baseComponent {

  constructor(parent, className) {
    var root = parent.svg.svg({
      class: className
    });
    listen(root.el, [EVENT_MOUSEDOWN, EVENT_TOUCHSTART], this, { passive:false });
    this.root = root;
    this.parent = parent;
  }

  handleEvent(e) {
    // Detect if the event is a touch event by checking if it has the `touches` property
    // If it is a touch event, use the first touch input
    e.preventDefault();
    var point = e.touches ? e.changedTouches[0] : e,
        // Get the screen position of the UI
        rect = this.root.el.getBoundingClientRect(),
        // Convert the screen-space pointer position to local-space
        x = point.clientX - rect.left,
        y = point.clientY - rect.top;
        
    var hsv;  
    var color = this.parent.color; 
    switch (e.type) {
      case EVENT_MOUSEDOWN:
      case EVENT_TOUCHSTART:
        // Attach event listeners
        listen(document, [EVENT_MOUSEMOVE, EVENT_TOUCHMOVE, EVENT_MOUSEUP, EVENT_TOUCHEND], this, { passive:false });
        hsv = this.input(x, y, "START");
        this.parent.emit("input:start", color);
        break;
      case EVENT_MOUSEMOVE:
      case EVENT_TOUCHMOVE:
        // Use the position to update the picker color
        hsv = this.input(x, y, "MOVE");
        break;
      case EVENT_MOUSEUP:
      case EVENT_TOUCHEND:
        hsv = this.input(x, y, "END");
        this.parent.emit("input:end", color);
        unlisten(document, [EVENT_MOUSEMOVE, EVENT_TOUCHMOVE, EVENT_MOUSEUP, EVENT_TOUCHEND], this);
        break;
    }
    if (hsv) color.hsv = hsv;
  }

}