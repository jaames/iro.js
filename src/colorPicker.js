import wheel from "components/wheel";
import slider from "components/slider";
import svg from "util/svg";
import {whenReady} from "util/dom";
import iroColor from "./color";
import iroStyleSheet from "./stylesheet";

export default class colorPicker {
  /**
    * @constructor color wheel object
    * @param {Element | String} el - a DOM element or the CSS selector for a DOM element to use as a container for the UI
    * @param {Object} opts - options for this instance
  */
  constructor(el, opts) {
    opts = opts || {};
    // event storage for `on` and `off`
    this._events = {};
    this._mouseTarget = false;
    this._colorChangeActive = false;
    this.css = opts.css || opts.styles || undefined;
    // Wait for the document to be ready, then mount the UI
    whenReady(() => {this._mount(el, opts)});
  }

  /**
    * @desc mount the color picker UI into the DOM
    * @param {Element | String} el - a DOM element or the CSS selector for a DOM element to use as a container for the UI
    * @param {Object} opts - options for this instance
    * @access protected
  */
  _mount(el, opts) {
    // If `el` is a string, use it to select an Element, else assume it's an element
    el = ("string" == typeof el) ? document.querySelector(el) : el;
    // Find the width and height for the UI
    // If not defined in the options, try the HTML width + height attributes of the wrapper, else default to 320
    var width = opts.width || parseInt(el.width) || 320;
    var height = opts.height || parseInt(el.height) || 320;
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
    this.el = el;
    this.svg = new svg(el, width, height, opts.display);
    this.ui = [
      new wheel(this, {
        cX: leftMargin + bodyWidth / 2,
        cY: bodyWidth / 2,
        r: wheelRadius,
        rMax: wheelRadius - (markerRadius + padding),
        marker: marker,
        border: borderStyles,
        lightness: opts.wheelLightness == undefined ? true : opts.wheelLightness,
        anticlockwise: opts.anticlockwise
      }),
      new slider(this, {
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
    // Create an iroStyleSheet for this colorWheel's CSS overrides
    this.stylesheet = new iroStyleSheet();
    // Create an iroColor to store this colorWheel's selected color
    this.color = new iroColor();
    // Whenever the selected color changes, trigger a colorWheel update too
    this.color._onChange = this._update.bind(this);
    this.color.set(opts.color || opts.defaultValue || "#fff")
    // Hacky workaround for a couple of Safari SVG url bugs
    // See https://github.com/jaames/iro.js/issues/18
    // TODO: perhaps make this a seperate plugin, it's hacky and takes up more space than I'm happy with
    this.on("history:stateChange", (base) => {this.svg.updateUrls(base)});
    // Listen to events
    // listen(this.svg.el, [EVENT_MOUSEDOWN, EVENT_TOUCHSTART], this);
    this.emit("mount", this);
  }

  /**
    * @desc update the selected color
    * @param {Object} newValue - the new HSV values
    * @param {Object} oldValue - the old HSV values
    * @param {Object} changes - booleans for each HSV channel: true if the new value is different to the old value, else false
    * @access protected
  */
  _update(color, changes) {
    var rgb = color.rgbString;
    var css = this.css;
    // Loop through each UI element and update it
    for (var i = 0; i < this.ui.length; i++) {
      this.ui[i].update(color, changes); 
    }
    // Update the stylesheet too
    for (var selector in css) {
      var properties = css[selector];
      for (var prop in properties) {
        this.stylesheet.setRule(selector, prop, rgb);
      }
    } 
    // Prevent infinite loops if the color is set inside a `color:change` callback
    if (!this._colorChangeActive) {
      // While _colorChangeActive = true, this event cannot be fired
      this._colorChangeActive = true;
      this.emit("color:change", color, changes);
      this._colorChangeActive = false;
    }
  }

  /**
    * @desc Set a callback function for an event
    * @param {String} eventType The name of the event to listen to, pass "*" to listen to all events
    * @param {Function} callback The watch callback
  */
  on(eventType, callback) {
    var events = this._events;
    (events[eventType] || (events[eventType] = [])).push(callback);
  }

  /**
    * @desc Remove a callback function for an event added with on()
    * @param {String} eventType The name of the event
    * @param {Function} callback The watch callback to remove from the event
  */
  off(eventType, callback) {
    var eventList = this._events[eventType];
    if (eventList) eventList.splice(eventList.indexOf(callback), 1);
  }

  /**
    * @desc Emit an event
    * @param {String} eventType The name of the event to emit
    * @param {Array} args array of args to pass to callbacks
  */
  emit(eventType, ...args) {
    var events = this._events,
        callbackList = (events[eventType] || []).concat((events["*"] || []));
    for (var i = 0; i < callbackList.length; i++) {
      callbackList[i].apply(null, args); 
    }
  }
}