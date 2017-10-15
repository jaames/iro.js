import wheel from "ui/wheel";
import slider from "ui/slider";
import svg from "ui/svg";
import iroColor from "modules/color";
import iroStyleSheet from "modules/stylesheet";

// Quick reference to the document object and some strings since we usethem more than once
const doc = document,
READYSTATE_COMPLETE = "complete",
READYSTATE_CHANGE = "readystatechange";

/**
* @desc listen to one or more events on an element
* @param {Element} el target element
* @param {ArrayOrString} eventList the events to listen to
* @param {Function} callback the event callback function
*/
function listen(el, eventList, callback) {
 for (var i = 0; i < eventList.length; i++) {
   el.addEventListener(eventList[i], callback);
 }
};

/**
* @desc remove an event listener on an element
* @param {Element} el target element
* @param {ArrayOrString} eventList the events to remove
* @param {Function} callback the event callback function
*/
function unlisten(el, eventList, callback) {
 for (var i = 0; i < eventList.length; i++) {
   el.removeEventListener(eventList[i], callback);
 }
};

/**
* @desc call callback when the page document is ready
* @param {Function} callback callback function to be called
*/
function whenReady(callback) {
 var _this = this;
 if (doc.readyState == READYSTATE_COMPLETE) {
   callback();
 }
 else {
   listen(doc, [READYSTATE_CHANGE], function stateChange(e) {
     if (doc.readyState == READYSTATE_COMPLETE) {
       callback();
       unlisten(doc, [READYSTATE_CHANGE], stateChange);
     }
   });
 }
};

// When the user starts to interact with a color picker's UI, a referece to that coloPicker will be stored globally
let activeColorWheel = false;

// Global mousemove + touchmove event handler
listen(document, ["mousemove", "touchmove"], function (e) {
  // If there is an active colorWheel, call its mousemove handler
  if (activeColorWheel) activeColorWheel._mouseMove(e);
});

// Global mouseup + touchend event handler
listen(document, ["mouseup", "touchend"], function (e) {
  // If there is an active colorWheel, stop it from handling input and clear the active colorWheel reference
  if (activeColorWheel) {
    e.preventDefault();
    activeColorWheel.emit("input:end");
    activeColorWheel._mouseTarget = false;
    activeColorWheel = false;
  }
});

/**
  @constructor color wheel object
  @param {ElementOrString} el - a DOM element or the CSS selector for a DOM element to use as a container for the UI
  @param {Object} opts - options for this instance
*/
const colorPicker = function(el, opts) {
  opts = opts || {};
  // event storage for `on` and `off`
  this._events = {};
  this._mouseTarget = false;
  this._onChange = false;
  // Create an iroStyleSheet for this colorWheel's CSS overrides
  this.stylesheet = new iroStyleSheet();
  this.css = opts.css || opts.styles || undefined;
  // Create an iroColor to store this colorWheel's selected color
  this.color = new iroColor(opts.color || opts.defaultValue || "#fff");
  // Wait for the document to be ready, then init the UI
  whenReady(() => {
    this._init(el, opts);
  });
}

colorPicker.prototype = {
  constructor: colorPicker,

  watch: function(callback, callImmediately) {
    this.on("color:change", callback);
    this._onChange = callback;
    if (callImmediately) callback(this.color);
  },

  unwatch: function() {
    this.off("color:change", this._onChange);
  },

    /**
    * @desc Set a callback function for an event
    * @param {String} eventType The name of the event to listen to, pass "*" to listen to all events
    * @param {Function} callback The watch callback
  */
  on: function(eventType, callback) {
    var events = this._events;
    (events[eventType] || (events[eventType] = [])).push(callback);
  },

  /**
    * @desc Remove a callback function for an event added with on()
    * @param {String} eventType The name of the event
    * @param {Function} callback The watch callback to remove from the event
  */
  off: function(eventType, callback) {
    var eventList = this._events[eventType];
    if (eventList) evenList.splice(eventList.indexOf(callback), 1);
  },

  /**
    * @desc Emit an event
    * @param {String} eventType The name of the event to emit
    * @param {Object} data data to pass to all the callback functions
  */
  emit: function(eventType, data) {
    var events = this._events;
    (events[eventType] || []).concat((events["*"] || [])).map((callback) => { callback(data); });
  },

  _init: function(el, opts) {
    // If `el` is a string, use it to select an Element, else assume it's an element
    el = ("string" == typeof el) ? document.querySelector(el) : el;
    // Find the width and height for the UI
    // If not defined in the options, try the HTML width + height attributes of the wrapper, else default to 320
    var width = opts.width || parseInt(el.width) || 320;
    var height = opts.height || parseInt(el.height) || 320;

    var svgRoot = new svg(el, width, height);

    this.el = el;
    this.svg = svgRoot;
    // Calculate layout variables
    var padding = opts.padding + 2 || 6,
        borderWidth = opts.borderWidth || 0,
        markerRadius = opts.markerRadius || 8,
        sliderMargin = opts.sliderMargin || 24,
        sliderHeight = opts.sliderHeight || markerRadius * 2 + padding * 2 + borderWidth * 2,
        bodyWidth = Math.min(height - sliderHeight - sliderMargin, width),
        wheelRadius = bodyWidth / 2 - borderWidth,
        leftMargin = (width - bodyWidth) / 2;
    var marker = {
      r: markerRadius
    };
    var borderStyles = {
      w: borderWidth,
      color: opts.borderColor || "#fff",
    };
    // Create UI elements
    this.ui = [
      new wheel(svgRoot, {
        cX: leftMargin + bodyWidth / 2,
        cY: bodyWidth / 2,
        r: wheelRadius,
        rMax: wheelRadius - (markerRadius + padding),
        marker: marker,
        border: borderStyles,
        anticlockwise: opts.anticlockwise
      }),
      new slider(svgRoot, {
        sliderType: "v",
        x: leftMargin + borderWidth,
        y: bodyWidth + sliderMargin,
        w: bodyWidth - borderWidth * 2,
        h: sliderHeight - borderWidth * 2,
        r: sliderHeight / 2 - borderWidth,
        marker: marker,
        border: borderStyles
      })
    ];
    // Whenever the selected color changes, trigger a colorWheel update too
    this.color.watch(this._update.bind(this), true);
    // Add handler for mousedown + touchdown events on this element
    listen(svgRoot.el, ["mousedown", "touchstart"], this._mouseDown.bind(this));
  },

  /**
    * @desc Get the local-space X and Y pointer position from an input event
    * @param {Event} e A mouse or touch event
    * @return {Object} x and y coordinates from the top-left of the UI
    * @access protected
  */
  _getLocalPoint: function(e) {
    // Detect if the event is a touch event by checking if it has the `touches` property
    // If it is a touch event, use the first touch input
    var point = e.touches ? e.changedTouches[0] : e,
        // Get the screen position of the UI
        rect = this.svg.el.getBoundingClientRect();
    // Convert the screen-space pointer position to local-space
    return {
      x: point.clientX - rect.left,
      y: point.clientY - rect.top
    };
  },

  /**
    * @desc Handle a pointer input at local-space point (x, y)
    * @param {Event} e A mouse or touch event
    * @return {Object} x and y coordinates from the top-left of the UI
    * @access protected
  */
  _handleInput: function(x, y) {
    // Use the active UI element to handle translating the input to a change in the color
    this.color.hsv = this._mouseTarget.input(x, y);
  },

  /**
    * @desc mousedown event handler
    * @param {Event} e A mouse or touch event
    * @access protected
  */
  _mouseDown: function(e) {
    // Get the local-space position of the mouse input
    var point = this._getLocalPoint(e),
        x = point.x,
        y = point.y;

    // Loop through each UI element and check if the point "hits" it
    this.ui.forEach((uiElement) => {
      // If the element is hit, this means the user has clicked the element and is trying to interact with it
      if (uiElement.checkHit(x, y)) {
        // Prevent default event behaviour, like scrolling
        e.preventDefault();
        // Set a reference to this colorWheel instance so that the global event handlers know about it
        activeColorWheel = this;
        // Set an internal reference to the uiElement being interacted with, for other internal event handlers
        this._mouseTarget = uiElement;
        // Emit input start event
        this.emit("input:start");
        // Finally, use the position to update the picked color
        this._handleInput(x, y);
      }
    });
  },

  /**
    * @desc mousemose event handler
    * @param {Event} e A mouse or touch event
    * @access protected
  */
  _mouseMove: function(e) {
    // If there is an active colorWheel (set in _mouseDown) then update the input as the user interacts with it
    if (this == activeColorWheel) {
      // Prevent default event behaviour, like scrolling
      e.preventDefault();
      // Get the local-space position of the mouse input
      var point = this._getLocalPoint(e);
      // Use the position to update the picker color
      this._handleInput(point.x, point.y);
    }
  },

  /**
    * @desc update the selected color
    * @param {Object} newValue - the new HSV values
    * @param {Object} oldValue - the old HSV values
    * @param {Object} changes - booleans for each HSV channel: true if the new value is different to the old value, else false
    * @access protected
  */
  _update: function(newValue, oldValue, changes) {
    var color = this.color;
    var rgb = color.rgbString;
    var css = this.css;
    // Loop through each UI element and update it
    this.ui.forEach(function (uiElement) {
      uiElement.update(color, changes);
    });
    // Update the stylesheet too
    for (var selector in css) {
      var properties = css[selector];
      for (var prop in properties) {
        this.stylesheet.setRule(selector, prop, rgb);
      }
    }
    // Call the color change event
    this.emit("color:change", color);
  }
}

module.exports = colorPicker;