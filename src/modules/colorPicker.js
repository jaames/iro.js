import wheel from "ui/wheel";
import slider from "ui/slider";
import dom from "util/dom";

import iroColor from "modules/color";
import iroStyleSheet from "modules/stylesheet";

// When the user starts to interact with a color picker's UI, a referece to that coloPicker will be stored globally
let activeColorWheel = false;

// Global mousemove + touchmove event handler
dom.listen(document, ["mousemove", "touchmove"], function (e) {
  // If there is an active colorWheel, call its mousemove handler
  if (activeColorWheel) activeColorWheel._mouseMove(e);
});

// Global mouseup + touchend event handler
dom.listen(document, ["mouseup", "touchend"], function (e) {
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
let colorWheel = function (el, opts) {
  if (!(this instanceof colorWheel)) return new colorWheel(el, opts);
  // event storage for `on` and `off`
  this._events = {};
  this._mouseTarget = false;
  this._onChange = false;
  // Create an iroStyleSheet for this colorWheel's CSS overrides
  this.stylesheet = new iroStyleSheet();
  this.css = opts.css || opts.styles || undefined;
  // Create an iroColor to store this colorWheel's selected color
  this.color = new iroColor(opts.color || "#fff");

  // Wait for the document to be ready, then init the UI
  dom.whenReady(function () {
    // If `el` is a string, use it to select an Element, else assume it's an element
    el = ("string" == typeof el) ? dom.$(el) : el;
    // Make sure the canvas wrapper is position:relative
    // This is because we'll be using position:absolute to stack the canvas layers
    el.style.cssText += "position:relative";
    // Find the width and height for the UI
    // If not defined in the options, try the HTML width + height attributes of the wrapper, else default to 320
    var width = opts.width || parseInt(dom.attr(el, "width")) || 320;
    var height = opts.height || parseInt(dom.attr(el, "height")) || 320;
    // Create UI layers
    // To support devices with hidpi screens, we scale the canvas so that it has more pixels, but still has the same size visually
    // This implementation is based on https://www.html5rocks.com/en/tutorials/canvas/hidpi/
    var pxRatio = devicePixelRatio || 1;
    // Create a layer for each name
    // Create a new canvas and add it to the page

    var svg = dom.append(el, dom.create("svg", "SVG"));
    dom.setAttr(svg, {
      viewBox: [0, 0, width, height].join(" "),
      width: width,
      height: height
    });
    svg.style.cssText += "position:absolute;top:0;left:0;"

    var canvas = dom.append(el, dom.create("canvas"));
    var ctx = canvas.getContext("2d");
    // Set the internal dimensions for the canvas
    canvas.width = width * pxRatio;
    canvas.height = height * pxRatio;
    // Set the visual dimensions for the canvas
    canvas.style.cssText += "width:" + width + "px;height:" + height + "px";
    // Scale the canvas context to counter the manual scaling of the element
    ctx.scale(pxRatio, pxRatio);

    this.el = el;
    this.canvas = canvas;
    this.ctx = ctx;
    // Calculate layout variables
    var padding = opts.padding + 2 || 6,
        borderWidth = opts.borderWidth || 0,
        markerRadius = opts.markerRadius || 8,
        sliderMargin = opts.sliderMargin || 24,
        sliderHeight = opts.sliderHeight || (markerRadius * 2) + (padding * 2) + (borderWidth * 2),
        bodyWidth = Math.min(height - sliderHeight - sliderMargin, width),
        wheelRadius = (bodyWidth / 2) - borderWidth,
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
      new wheel(ctx, svg, {
        cX: leftMargin + (bodyWidth / 2),
        cY: bodyWidth / 2,
        r: wheelRadius,
        rMax: wheelRadius - (markerRadius + padding),
        marker: marker,
        border: borderStyles
      }),
      new slider(ctx, svg, {
        sliderType: "v",
        x: leftMargin + borderWidth,
        y: bodyWidth + sliderMargin,
        w: bodyWidth - (borderWidth * 2),
        h: sliderHeight - (borderWidth * 2),
        r: (sliderHeight / 2) - borderWidth,
        marker: marker,
        border: borderStyles
      })
    ];
    // Whenever the selected color changes, trigger a colorWheel update too
    this.color.watch(this._update.bind(this), true);
    // Add handler for mousedown + touchdown events on this element
    dom.listen(el, ["mousedown", "touchstart"], this._mouseDown.bind(this));
  }.bind(this));
};

colorWheel.prototype = {
  /**
    * @desc Set a callback function that gets called whenever the selected color changes
    * @param {Function} callback The watch callback
    * @param {Boolean} callImmediately set to true if you want to call the callback as soon as it is added
  */
  watch: function (callback, callImmediately) {
    this.on("color:change", callback);
    this._onChange = callback;
    if (callImmediately) callback(this.color);
  },

  /**
    * @desc Remove the watch callback
  */
  unwatch: function () {
    this.off("color:change", this._onChange);
  },

  /**
    * @desc Set a callback function for an event
    * @param {String} eventType The name of the event to listen to, pass "*" to listen to all events
    * @param {Function} callback The watch callback
  */
  on: function (eventType, callback) {
    var events = this._events;
    (events[eventType] || (events[eventType] = [])).push(callback);
  },

  /**
    * @desc Remove a callback function for an event added with on()
    * @param {String} eventType The name of the event
    * @param {Function} callback The watch callback to remove from the event
  */
  off: function (eventType, callback) {
    var events = this._events;
    if (events[eventType]) {
      events[eventType].splice(events[eventType].indexOf(callback), 1);
    }
  },

  /**
    * @desc Emit an event
    * @param {String} eventType The name of the event to emit
    * @param {Object} data data to pass to all the callback functions
  */
  emit: function (eventType, data) {
    var events = this._events;
    (events[eventType] || []).map((callback) => { callback(data); });
    (events["*"] || []).map((callback) => { callback(data); });
  },

  /**
    * @desc Get the local-space X and Y pointer position from an input event
    * @param {Event} e A mouse or touch event
    * @return {Object} x and y coordinates from the top-left of the UI
    * @access protected
  */
  _getLocalPoint: function (e) {
    // Prevent default event behaviour, like scrolling
    e.preventDefault();
    // Detect if the event is a touch event by checking if it has the `touches` property
    // If it is a touch event, use the first touch input
    var point = e.touches ? e.changedTouches[0] : e,
        // Get the screen position of the UI
        rect = this.canvas.getBoundingClientRect();
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
  _handleInput: function (x, y) {
    // Use the active UI element to handle translating the input to a change in the color
    this.color.set(this._mouseTarget.input(x, y));
  },

  /**
    * @desc mousedown event handler
    * @param {Event} e A mouse or touch event
    * @access protected
  */
  _mouseDown: function (e) {
    // Get the local-space position of the mouse input
    var point = this._getLocalPoint(e),
        x = point.x,
        y = point.y;

    // Loop through each UI element and check if the point "hits" it
    this.ui.forEach((uiElement) => {
      // If the element is hit, this means the user has clicked the element and is trying to interact with it
      if (uiElement.checkHit(x, y)) {
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
  _mouseMove: function (e) {
    // If there is an active colorWheel (set in _mouseDown) then update the input as the user interacts with it
    if (this == activeColorWheel) {
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
  _update: function (newValue, oldValue, changes) {
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
  },
};

module.exports = colorWheel;
