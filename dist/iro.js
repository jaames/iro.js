/*!
 * iro.js
 * ----------------
 * Author: James Daniel (github.com/jaames | rakujira.jp)
 * Last updated: Mon Apr 24 2017
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["iro"] = factory();
	else
		root["iro"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var round = Math.round;

module.exports = {
  name: "rgb",

  fromHsv: function fromHsv(hsv) {
    var r, g, b, i, f, p, q, t;
    var h = hsv.h / 360,
        s = hsv.s / 100,
        v = hsv.v / 100;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
      case 0:
        r = v, g = t, b = p;break;
      case 1:
        r = q, g = v, b = p;break;
      case 2:
        r = p, g = v, b = t;break;
      case 3:
        r = p, g = q, b = v;break;
      case 4:
        r = t, g = p, b = v;break;
      case 5:
        r = v, g = p, b = q;break;
    }
    return { r: round(r * 255), g: round(g * 255), b: round(b * 255) };
  },

  toHsv: function toHsv(rgb) {
    // Modified from https://github.com/bgrins/TinyColor/blob/master/tinycolor.js#L446
    var r = rgb.r / 255,
        g = rgb.g / 255,
        b = rgb.b / 255;
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b),
        delta = max - min;
    var hue;
    switch (max) {
      case min:
        hue = 0;
        break;
      case r:
        hue = (g - b) / delta + (g < b ? 6 : 0);
        break;
      case g:
        hue = (b - r) / delta + 2;
        break;
      case b:
        hue = (r - g) / delta + 4;
        break;
    }
    hue /= 6;
    return {
      h: round(hue * 360),
      s: round(max === 0 ? 0 : delta / max * 100),
      v: round(max * 100)
    };
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _hsl = __webpack_require__(3);

var _hsl2 = _interopRequireDefault(_hsl);

var _rgb = __webpack_require__(0);

var _rgb2 = _interopRequireDefault(_rgb);

var _hslString = __webpack_require__(9);

var _hslString2 = _interopRequireDefault(_hslString);

var _rgbString = __webpack_require__(10);

var _rgbString2 = _interopRequireDefault(_rgbString);

var _hexString = __webpack_require__(8);

var _hexString2 = _interopRequireDefault(_hexString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var colorModels = [_hsl2.default, _rgb2.default, _hslString2.default, _rgbString2.default, _hexString2.default];

/**
  @constructor color object
  @param {String} str (optional) CSS color string to use as the start color for this element
*/
var color = function color(str) {
  var _this = this;

  if (!(this instanceof color)) return new color(str);
  // The watch callback function for this color will be stored here
  this._onChange = false;
  // The default color value
  this._value = { h: undefined, s: undefined, v: undefined };
  this.register("hsv", {
    get: this.get,
    set: this.set
  });
  // Loop through each external color model and register it
  colorModels.forEach(function (model) {
    _this.register(model.name, {
      set: function set(value) {
        this.hsv = model.toHsv(value);
      },
      get: function get() {
        return model.fromHsv(this.hsv);
      }
    });
  });
  if (str) this.fromString(str);
};

color.prototype = {

  /**
    * @desc Register a new color model on this instance
    * @param {String} name The name of the color model
    * @param {Object} descriptor The property descriptor (see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#Description)
  */
  register: function register(name, descriptor) {
    Object.defineProperty(this, name, descriptor);
  },

  /**
    * @desc Set a callback function that gets called whenever the selected color changes
    * @param {Function} callback The watch callback
    * @param {Boolean} callImmediately set to true if you want to call the callback as soon as it is added
  */
  watch: function watch(callback, callImmediately) {
    this._onChange = callback;
    if (callImmediately) this.forceUpdate();
  },

  /**
    * @desc Remove the watch callback
  */
  unwatch: function unwatch() {
    this.watch(false);
  },

  /**
    * @desc Force an update
  */
  forceUpdate: function forceUpdate() {
    var value = this._value;
    this._onChange(value, value, { h: true, s: true, v: true });
  },

  /**
    * @desc Set the color from a HSV value
    * @param {Object} newValue - HSV object
  */
  set: function set(newValue) {
    // Loop through the channels and check if any of them have changed
    var changes = {};
    var oldValue = this._value;
    for (var channel in oldValue) {
      if (!newValue.hasOwnProperty(channel)) newValue[channel] = oldValue[channel];
      changes[channel] = !(newValue[channel] == oldValue[channel]);
    }
    // Update the old value
    this._value = newValue;
    // If the value has changed, call hook callback
    var callback = this._onChange;
    if ((changes.h || changes.s || changes.v) && "function" == typeof callback) callback(newValue, oldValue, changes);
  },

  /**
    * @desc Get the HSV value
    * @return HSV object
  */
  get: function get() {
    return this._value;
  },

  /**
    * @desc Set the color from a CSS string
    * @param {String} str - HEX, rgb, or hsl color string
  */
  fromString: function fromString(str) {
    if (/^rgb/.test(str)) {
      this.rgbString = str;
    } else if (/^hsl/.test(str)) {
      this.hslString = str;
    } else if (/^#[0-9A-Fa-f]/.test(str)) {
      this.hexString = str;
    }
  }
};

module.exports = color;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _dom = __webpack_require__(6);

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var doc = document;

/**
  @constructor stylesheet writer
  @param {Object} overrides - an object representing the CSS rules that this stylesheet updates
*/
var stylesheet = function stylesheet(overrides) {
  // Create a new style element
  var style = _dom2.default.create("style");
  // Webkit apparently requires a text node to be inserted into the style element
  // (according to https://davidwalsh.name/add-rules-stylesheets)
  _dom2.default.append(style, doc.createTextNode(""));
  // Add that stylesheet to the document <head></head>
  _dom2.default.append(doc.head, style);
  this.style = style;
  // Create a reference to the style element's CSSStyleSheet object
  // CSSStyleSheet API: https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet
  var sheet = style.sheet;
  this.sheet = sheet;
  // Get a reference to the sheet's CSSRuleList object
  // CSSRuleList API: https://developer.mozilla.org/en-US/docs/Web/API/CSSRuleList
  this.rules = sheet.rules || sheet.cssRules;
  // We'll store references to all the CSSStyleDeclaration objects that we change here, keyed by the CSS selector they belong to
  // CSSStyleDeclaration API: https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration
  this.map = {};
};

stylesheet.prototype = {

  /**
    * @desc Turns the stylesheet "on", allowing the styles to be rendered
  */
  on: function on() {
    this.sheet.disabled = false;
  },

  /**
    * @desc Turns the stylesheet "off", preventing the styles from being rendered
  */
  off: function off() {
    this.sheet.disabled = true;
  },

  /**
    * @desc Set a specific rule for a given selector
    * @param {String} selector - the CSS selector for this rule (e.g. "body", ".class", "#id")
    * @param {String} property - the CSS property to set (e.g. "background-color", "font-family", "z-index")
    * @param {String} value    - the new value for the rule (e.g. "rgb(255, 255, 255)", "Helvetica", "99")
  */
  setRule: function setRule(selector, property, value) {
    var sheet = this.sheet;
    var rules = sheet.rules || sheet.cssRules;
    var map = this.map;
    // Convert property from camelCase to snake-case
    property = property.replace(/([A-Z])/g, function ($1) {
      return "-" + $1.toLowerCase();
    });
    if (!map.hasOwnProperty(selector)) {
      // If the selector hasn't been used yet we want to insert the rule at the end of the CSSRuleList, so we use its length as the index value
      var index = rules.length;
      // Prepare the rule declaration text, since both insertRule and addRule take this format
      var declaration = property + ": " + value;
      // Insert the new rule into the stylesheet
      try {
        // Some browsers only support insertRule, others only support addRule, so we have to use both
        sheet.insertRule(selector + " {" + declaration + ";}", index);
      } catch (e) {
        sheet.addRule(selector, declaration, index);
      } finally {
        // Because safari is perhaps the worst browser in all of history, we have to remind it to keep the sheet rules up-to-date
        rules = sheet.rules || sheet.cssRules;
        // Add our newly inserted rule's CSSStyleDeclaration object to the internal map
        map[selector] = rules[index].style;
      }
    } else {
      map[selector].setProperty(property, value);
    }
  },

  /**
    * @desc Get an object representing the current css styles
    * @return {Object} css object
  */
  getCss: function getCss() {
    var map = this.map;
    var ret = {};
    for (var selector in map) {
      var ruleSet = map[selector];
      ret[selector] = {};
      for (var i = 0; i < ruleSet.length; i++) {
        var property = ruleSet[i];
        ret[selector][property] = ruleSet.getPropertyValue(property);
      }
    }
    return ret;
  },

  /**
    * @desc Get the stylesheet text
    * @return {String} css text
  */
  getCssText: function getCssText() {
    var map = this.map;
    var ret = [];
    for (var selector in map) {
      ret.push(selector.replace(/,\W/g, ",\n") + " {\n\t" + map[selector].cssText.replace(/;\W/g, ";\n\t") + "\n}");
    }
    return ret.join("\n");
  }
};

module.exports = stylesheet;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var round = Math.round;

module.exports = {
  name: "hsl",

  fromHsv: function fromHsv(hsv) {
    var s = hsv.s / 100,
        v = hsv.v / 100;
    var p = (2 - s) * v;
    s = s == 0 ? 0 : s * v / (p < 1 ? p : 2 - p);
    return {
      h: hsv.h,
      s: round(s * 100),
      l: round(p * 50)
    };
  },

  toHsv: function toHsv(hsl) {
    var s = hsl.s / 50,
        l = hsl.l / 100;
    s *= l <= 1 ? l : 2 - l;
    return {
      h: hsl.h,
      s: round(2 * s / (l + s) * 100),
      v: round((l + s) * 100)
    };
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function addColorStops(gradient, colorStops) {
  colorStops.forEach(function (stop) {
    gradient.addColorStop(stop.at, stop.color);
  });
  return gradient;
};

module.exports = {
  linear: function linear(ctx, x1, y1, x2, y2, colorStops) {
    return addColorStops(ctx.createLinearGradient(x1, y1, x2, y1), colorStops);
  },
  radial: function radial(ctx, x, y, min, max, colorStops) {
    return addColorStops(ctx.createRadialGradient(x, y, min, x, y, max), colorStops);
  }
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
  * @constructor marker UI
  * @param {Object} ctx - canvas 2d context to draw on
  * @param {Object} opts - options
*/
var marker = function marker(ctx, opts) {
  this.opts = opts;
  this._ctx = ctx;
  this._last = false;
};

marker.prototype = {
  /**
    * @desc Draw a ring (only used internally)
    * @param {Number} x - centerpoint x coordinate
    * @param {Number} y - centerpoint y coordinate
    * @param {String} color - css color of the ring
    * @param {Number} lineWidth - width of the ring stroke
    * @private
  */
  _ring: function _ring(x, y, color, lineWidth) {
    var ctx = this._ctx;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.arc(x, y, this.opts.r, 0, 2 * Math.PI);
    ctx.stroke();
  },

  /**
    * @desc move markerpoint to centerpoint (x, y) and redraw
    * @param {Number} x - point x coordinate
    * @param {Number} y - point y coordinate
  */
  move: function move(x, y) {
    // Get the current position
    var last = this._last;
    var radius = this.opts.r + 4;
    // Clear the current marker
    if (last) this._ctx.clearRect(last.x - radius, last.y - radius, radius * 2, radius * 2);
    // Redraw at the new coordinates
    this._ring(x, y, "#333", 4);
    this._ring(x, y, "#fff", 2);
    // Update the position
    this._last = { x: x, y: y };
  }
};

module.exports = marker;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Quick reference to the document object and some strings since we usethem more than once
var doc = document,
    READYSTATE_COMPLETE = "complete",
    READYSTATE_CHANGE = "readystatechange";

/**
 * @desc iterate a list (or create a one-item list from a string), calling callback with each item
 * @param {ArrayOrString} list an array or string, callback will be called for each array item, or once if a string is given
 * @param {Function} callback a function to call for each item, the item will be passed as the first parameter
 * @access private
*/
function iterateList(list, callback) {
  list = "string" == typeof list ? [list] : list;
  list.forEach(callback);
};

module.exports = {
  /**
   * @desc find a html element that matches a CSS selector
   * @param {String} selector the CSS selector to be used to target a HTML element
   * @return {Element} the HTML element that matches the selector given
  */
  $: function $(selector) {
    return doc.querySelector(selector);
  },

  /**
   * @desc create a new HTML element
   * @param {String} tagName the tag type of the element to create
   * @return {Element} the newly created HTML element
  */
  create: function create(tagName) {
    return doc.createElement(tagName);
  },

  /**
   * @desc append a child element to an element
   * @param {Element} el the parent element to append to
   * @param {Element} child the child element to append
   * @return {Element} the child element, now appended to the parent
  */
  append: function append(el, child) {
    return el.appendChild(child);
  },

  /**
   * @desc get an element's attribute by name
   * @param {Element} el target element
   * @param {String} attrName the name of the attribute to get
   * @return {String} the value of the attribute
  */
  attr: function attr(el, attrName) {
    return el.getAttribute(attrName);
  },

  /**
   * @desc listen to one or more events on an element
   * @param {Element} el target element
   * @param {ArrayOrString} eventList the events to listen to
   * @param {Function} callback the event callback function
  */
  listen: function listen(el, eventList, callback) {
    iterateList(eventList, function (eventName) {
      el.addEventListener(eventName, callback);
    });
  },

  /**
   * @desc remove an event listener on an element
   * @param {Element} el target element
   * @param {ArrayOrString} eventList the events to remove
   * @param {Function} callback the event callback function
  */
  unlisten: function unlisten(el, eventList, callback) {
    iterateList(eventList, function (eventName) {
      el.removeEventListener(eventName, callback);
    });
  },

  /**
   * @desc call callback when the page document is ready
   * @param {Function} callback callback function to be called
  */
  whenReady: function whenReady(callback) {
    var _this = this;
    if (doc.readyState == READYSTATE_COMPLETE) {
      callback();
    } else {
      _this.listen(doc, READYSTATE_CHANGE, function stateChange(e) {
        if (doc.readyState == READYSTATE_COMPLETE) {
          callback();
          _this.unlisten(doc, READYSTATE_CHANGE, stateChange);
        }
      });
    }
  }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _wheel = __webpack_require__(12);

var _wheel2 = _interopRequireDefault(_wheel);

var _slider = __webpack_require__(11);

var _slider2 = _interopRequireDefault(_slider);

var _dom = __webpack_require__(6);

var _dom2 = _interopRequireDefault(_dom);

var _color = __webpack_require__(1);

var _color2 = _interopRequireDefault(_color);

var _stylesheet = __webpack_require__(2);

var _stylesheet2 = _interopRequireDefault(_stylesheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// When the user starts to interact with a color picker's UI, a referece to that coloPicker will be stored globally
var activeColorWheel = false;

// Global mousemove + touchmove event handler
_dom2.default.listen(document, ["mousemove", "touchmove"], function (e) {
  // If there is an active colorWheel, call its mousemove handler
  if (activeColorWheel) activeColorWheel._mouseMove(e);
});

// Global mouseup + touchend event handler
_dom2.default.listen(document, ["mouseup", "touchend"], function (e) {
  // If there is an active colorWheel, stop it from handling input and clear the active colorWheel reference
  if (activeColorWheel) {
    e.preventDefault();
    activeColorWheel._mouseTarget = false;
    activeColorWheel = false;
  }
});

/**
  @constructor color wheel object
  @param {ElementOrString} el - a DOM element or the CSS selector for a DOM element to use as a container for the UI
  @param {Object} opts - options for this instance
*/
var colorWheel = function colorWheel(el, opts) {
  if (!(this instanceof colorWheel)) return new colorWheel(el, opts);

  this._mouseTarget = false;
  this._onChange = false;
  // Create an iroStyleSheet for this colorWheel's CSS overrides
  this.stylesheet = new _stylesheet2.default();
  this.css = opts.css || opts.styles || undefined;
  // Create an iroColor to store this colorWheel's selected color
  this.color = new _color2.default(opts.color || "#fff");

  // Wait for the document to be ready, then init the UI
  _dom2.default.whenReady(function () {
    // If `el` is a string, use it to select an Element, else assume it's an element
    el = "string" == typeof el ? _dom2.default.$(el) : el;
    // Make sure the canvas wrapper is position:relative
    // This is because we'll be using position:absolute to stack the canvas layers
    el.style.cssText += "position:relative";
    // Find the width and height for the UI
    // If not defined in the options, try the HTML width + height attributes of the wrapper, else default to 320
    var width = opts.width || parseInt(_dom2.default.attr(el, "width")) || 320;
    var height = opts.height || parseInt(_dom2.default.attr(el, "height")) || 320;
    // Create UI layers
    // To support devices with hidpi screens, we scale the canvas so that it has more pixels, but still has the same size visually
    // This implementation is based on https://www.html5rocks.com/en/tutorials/canvas/hidpi/
    var pxRatio = devicePixelRatio || 1;
    // Multiply the visual width and height by the pixel ratio
    // These dimensions will be used as the internal pixel dimensions for the canvas
    var pxWidth = width * pxRatio;
    var pxHeight = height * pxRatio;
    // When we make new layers we'll add them to this object
    var layers = {};
    var layerNames = ["main", "over"];
    // Create a layer for each name
    layerNames.forEach(function (name, index) {
      // Create a new canvas and add it to the page
      var canvas = _dom2.default.append(el, _dom2.default.create("canvas"));
      var ctx = canvas.getContext("2d");
      var style = canvas.style;
      // Set the internal dimensions for the canvas
      canvas.width = pxWidth;
      canvas.height = pxHeight;
      // Set the visual dimensions for the canvas
      style.cssText += "width:" + width + "px;height:" + height + "px";
      // Scale the canvas context to counter the manual scaling of the element
      ctx.scale(pxRatio, pxRatio);
      // Since we're creating multiple "layers" from seperate canvas we need them to be visually stacked ontop of eachother
      // Here, any layer that isn't the first will be forced to the same position relative to their wrapper element
      // The first layer isn't forced, so the space it takes up will still be considered in page layout
      if (index != 0) style.cssText += "position:absolute;top:0;left:0";
      layers[name] = {
        ctx: ctx,
        canvas: canvas
      };
    });
    this.el = el;
    this.layers = layers;
    // Calculate layout variables
    var padding = opts.padding + 2 || 6,
        sliderMargin = opts.sliderMargin || 24,
        markerRadius = opts.markerRadius || 8,
        sliderHeight = opts.sliderHeight || markerRadius * 2 + padding * 2,
        bodyWidth = Math.min(height - sliderHeight - sliderMargin, width),
        leftMargin = (width - bodyWidth) / 2;
    var marker = {
      r: markerRadius
    };
    // Create UI elements
    this.ui = [new _wheel2.default(layers, {
      cX: leftMargin + bodyWidth / 2,
      cY: bodyWidth / 2,
      r: bodyWidth / 2,
      rMax: bodyWidth / 2 - (markerRadius + padding),
      marker: marker
    }), new _slider2.default(layers, {
      sliderType: "v",
      x: leftMargin,
      y: bodyWidth + sliderMargin,
      w: bodyWidth,
      h: sliderHeight,
      r: sliderHeight / 2,
      marker: marker
    })];
    // Whenever the selected color changes, trigger a colorWheel update too
    this.color.watch(this._update.bind(this), true);
    // Add handler for mousedown + touchdown events on this element
    _dom2.default.listen(el, ["mousedown", "touchstart"], this._mouseDown.bind(this));
  }.bind(this));
};

colorWheel.prototype = {
  /**
    * @desc Set a callback function that gets called whenever the selected color changes
    * @param {Function} callback The watch callback
    * @param {Boolean} callImmediately set to true if you want to call the callback as soon as it is added
  */
  watch: function watch(callback, callImmediately) {
    this._onChange = callback;
    if (callImmediately) callback(this.color);
  },

  /**
    * @desc Remove the watch callback
  */
  unwatch: function unwatch() {
    this.watch(null);
  },

  /**
    * @desc Get the local-space X and Y pointer position from an input event
    * @param {Event} e A mouse or touch event
    * @return {Object} x and y coordinates from the top-left of the UI
    * @access protected
  */
  _getLocalPoint: function _getLocalPoint(e) {
    // Prevent default event behaviour, like scrolling
    e.preventDefault();
    // Detect if the event is a touch event by checking if it has the `touches` property
    // If it is a touch event, use the first touch input
    var point = e.touches ? e.changedTouches[0] : e,

    // Get the screen position of the UI
    rect = this.layers.main.canvas.getBoundingClientRect();
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
  _handleInput: function _handleInput(x, y) {
    // Use the active UI element to handle translating the input to a change in the color
    this.color.set(this._mouseTarget.input(x, y));
  },

  /**
    * @desc mousedown event handler
    * @param {Event} e A mouse or touch event
    * @access protected
  */
  _mouseDown: function _mouseDown(e) {
    var _this = this;

    // Get the local-space position of the mouse input
    var point = this._getLocalPoint(e),
        x = point.x,
        y = point.y;

    // Loop through each UI element and check if the point "hits" it
    this.ui.forEach(function (uiElement) {
      // If the element is hit, this means the user has clicked the element and is trying to interact with it
      if (uiElement.checkHit(x, y)) {
        // Set a reference to this colorWheel instance so that the global event handlers know about it
        activeColorWheel = _this;
        // Set an internal reference to the uiElement being interacted with, for other internal event handlers
        _this._mouseTarget = uiElement;
        // Finally, use the position to update the picked color
        _this._handleInput(x, y);
      }
    });
  },

  /**
    * @desc mousemose event handler
    * @param {Event} e A mouse or touch event
    * @access protected
  */
  _mouseMove: function _mouseMove(e) {
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
  _update: function _update(newValue, oldValue, changes) {
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
    // Call the watch callback if one is set
    var callback = this._onChange;
    if ("function" == typeof callback) callback(color, changes);
  }
};

module.exports = colorWheel;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _rgb = __webpack_require__(0);

var _rgb2 = _interopRequireDefault(_rgb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  name: "hexString",

  fromHsv: function fromHsv(hsv) {
    var color = _rgb2.default.fromHsv(hsv),
        r = color.r,
        g = color.g,
        b = color.b;
    // If each RGB channel's value is a multiple of 17, we can use HEX shorthand notation
    var useShorthand = r % 17 == 0 && g % 17 == 0 && b % 17 == 0,

    // If we're using shorthand notation, divide each channel by 17
    divider = useShorthand ? 17 : 1,

    // bitLength of each channel (for example, F is 4 bits long while FF is 8 bits long)
    bitLength = useShorthand ? 4 : 8,

    // Target length of the string (ie "#FFF" or "#FFFFFF")
    strLength = useShorthand ? 4 : 7,

    // Combine the channels together into a single integer
    int = r / divider << bitLength * 2 | g / divider << bitLength | b / divider,

    // Convert that integer to a hex string
    str = int.toString(16);
    // Add right amount of left-padding
    return "#" + new Array(strLength - str.length).join("0") + str;
  },

  toHsv: function toHsv(hex) {
    // Strip any "#" characters
    hex = hex.replace(/#/g, '');
    // Prefix the hex string with "0x" which indicates a number in hex notation, then convert to an integer
    var int = parseInt("0x" + hex),

    // If the length of the input is only 3, then it is a shorthand hex color
    isShorthand = hex.length == 3,

    // bitMask for isolating each channel
    bitMask = isShorthand ? 0xF : 0xFF,

    // bitLength of each channel (for example, F is 4 bits long while FF is 8 bits long)
    bitLength = isShorthand ? 4 : 8,

    // If we're using shorthand notation, multiply each channel by 17
    multiplier = isShorthand ? 17 : 1;

    return _rgb2.default.toHsv({
      r: (int >> bitLength * 2 & bitMask) * multiplier,
      g: (int >> bitLength & bitMask) * multiplier,
      b: (int & bitMask) * multiplier
    });
  }
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _hsl = __webpack_require__(3);

var _hsl2 = _interopRequireDefault(_hsl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  name: "hslString",

  fromHsv: function fromHsv(hsv) {
    var color = _hsl2.default.fromHsv(hsv);
    return "hsl" + (color.a ? "a" : "") + "(" + color.h + ", " + color.s + "%, " + color.l + "%" + (color.a ? ", " + color.a : "") + ")";
  },

  toHsv: function toHsv(hslString) {
    var parsed = hslString.match(/(hsla?)\((\d+)(?:\D+?)(\d+)(?:\D+?)(\d+)(?:\D+?)?([0-9\.]+?)?\)/i);
    return _hsl2.default.toHsv({
      h: parseInt(parsed[2]),
      s: parseInt(parsed[3]),
      l: parseInt(parsed[4])
    });
  }
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _rgb = __webpack_require__(0);

var _rgb2 = _interopRequireDefault(_rgb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  name: "rgbString",

  fromHsv: function fromHsv(hsv) {
    var color = _rgb2.default.fromHsv(hsv);
    return "rgb" + (color.a ? "a" : "") + "(" + color.r + ", " + color.g + ", " + color.b + (color.a ? ", " + color.a : "") + ")";
  },

  toHsv: function toHsv(rgbString) {
    var parsed = rgbString.match(/(rgba?)\((\d+)(?:\D+?)(\d+)(?:\D+?)(\d+)(?:\D+?)?([0-9\.]+?)?\)/i);
    return _rgb2.default.toHsv({
      r: parseInt(parsed[2]),
      g: parseInt(parsed[3]),
      b: parseInt(parsed[4])
    });
  }
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _gradient = __webpack_require__(4);

var _gradient2 = _interopRequireDefault(_gradient);

var _marker = __webpack_require__(5);

var _marker2 = _interopRequireDefault(_marker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
  * @constructor slider UI
*/
var slider = function slider(layers, opts) {
  this._ctx = layers.main.ctx;
  opts.x1 = opts.x;
  opts.y1 = opts.y;
  opts.x2 = opts.x + opts.w;
  opts.y2 = opts.y + opts.h;

  // "range" limits how far the slider's marker can travel, and where it stops and starts along the X axis
  opts.range = {
    min: opts.x + opts.r,
    max: opts.x2 - opts.r,
    w: opts.w - opts.r * 2
  };
  opts.sliderType = opts.sliderType || "v";
  this.type = "slider";
  this.marker = new _marker2.default(layers.over.ctx, opts.marker);
  this._opts = opts;
};

slider.prototype = {
  /**
    * @desc redraw this UI element
  */
  draw: function draw() {
    var ctx = this._ctx;
    var opts = this._opts;
    var x1 = opts.x1,
        y1 = opts.y1,
        x2 = opts.x2,
        y2 = opts.y2,
        w = opts.w,
        h = opts.h,
        r = opts.r;

    // Clear the existing UI
    ctx.clearRect(x1, y1, w, h);

    // Draw a rounded rect
    // Modified from http://stackoverflow.com/a/7838871
    ctx.beginPath();
    ctx.moveTo(x1 + r, y1);
    ctx.arcTo(x2, y1, x2, y2, r);
    ctx.arcTo(x2, y2, x1, y2, r);
    ctx.arcTo(x1, y2, x1, y1, r);
    ctx.arcTo(x1, y1, x2, y1, r);
    ctx.closePath();

    // I plan to have different slider "types" in the future
    // (I'd like to add a transparency slider at some point, for example)
    var fill;

    // For now the only type is "V", meaning this slider adjusts the HSV V channel
    if (opts.sliderType == "v") {
      fill = _gradient2.default.linear(ctx, x1, y1, x2, y2, [{ at: 0, color: "#000" }, { at: 1, color: "#fff" }]);
    }

    ctx.fillStyle = fill;
    ctx.fill();
  },

  /**
    * @desc updates this element to represent a new color value
    * @param {Object} color - an iroColor object with the new color value
    * @param {Object} changes - an object that gives a boolean for each HSV channel, indicating whether ot not that channel has changed
  */
  update: function update(color, changes) {
    var opts = this._opts;
    var range = opts.range;
    var hsv = color.hsv;
    if (opts.sliderType == "v" && changes.v) {
      var percent = hsv.v / 100;
      this.marker.move(range.min + percent * range.w, opts.y1 + opts.h / 2);
      if (!this._hasDrawn) {
        this.draw();
        this._hasDrawn = true;
      }
    }
  },

  /**
    * @desc Takes a point at (x, y) and returns HSV values based on this input -- use this to update a color from mouse input
    * @param {Number} x - point x coordinate
    * @param {Number} y - point y coordinate
    * @return {Object} - new HSV color values (some channels may be missing)
  */
  input: function input(x, y) {
    var opts = this._opts;
    var range = opts.range;
    var dist = Math.max(Math.min(x, range.max), range.min) - range.min;
    return {
      v: Math.round(100 / range.w * dist)
    };
  },

  /**
    * @desc Check if a point at (x, y) is inside this element
    * @param {Number} x - point x coordinate
    * @param {Number} y - point y coordinate
    * @return {Boolean} - true if the point is a "hit", else false
  */
  checkHit: function checkHit(x, y) {
    var opts = this._opts;
    return x > opts.x1 && x < opts.x2 && y > opts.y1 && y < opts.y2;
  }
};

module.exports = slider;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _gradient = __webpack_require__(4);

var _gradient2 = _interopRequireDefault(_gradient);

var _marker = __webpack_require__(5);

var _marker2 = _interopRequireDefault(_marker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Quick references to reused math functions
var PI = Math.PI,
    pow = Math.pow,
    sqrt = Math.sqrt,
    abs = Math.abs,
    round = Math.round;

/**
  * @constructor hue wheel UI
*/
var wheel = function wheel(layers, opts) {
  this._ctx = layers.main.ctx;
  this._opts = opts;
  this.type = "wheel";
  this.marker = new _marker2.default(layers.over.ctx, opts.marker);
};

wheel.prototype = {

  /**
    * @desc redraw this UI element
    * @param {Number} value - The hsv value component to use when drawing
  */
  draw: function draw(value) {
    var ctx = this._ctx;
    var opts = this._opts;
    var x = opts.cX,
        y = opts.cY,
        radius = opts.r;

    // Clear the area where the wheel will be drawn
    ctx.clearRect(x - radius, y - radius, radius * 2, radius * 2);
    ctx.lineWidth = radius;

    // The hue wheel is basically drawn with a series of thin "pie slices" - one slice for each hue degree
    // Here we calculate the angle for each slice, in radians
    var sliceAngle = 2 * PI / 360;

    // Create a loop to draw each slice
    for (var hue = 0, sliceStart = 0; hue < 360; hue++, sliceStart += sliceAngle) {
      // Create a HSL color for the slice using the current hue value
      ctx.strokeStyle = "hsl(" + hue + ",100%," + value / 2 + "%)";
      ctx.beginPath();
      // For whatever reason (maybe a rounding issue?) the slices had a slight gap between them, which caused rendering artifacts
      // So we make them overlap ever so slightly by adding a tiny value to the slice angle
      ctx.arc(x, y, radius / 2, sliceStart, sliceStart + sliceAngle + 0.02);
      ctx.stroke();
    }

    // Create a radial gradient for "saturation"
    var hslString = "hsla(0,0%," + value + "%,";
    ctx.fillStyle = _gradient2.default.radial(ctx, x, y, 0, opts.rMax, [
    // The center of the color wheel should be pure white (0% saturation)
    { at: 0, color: hslString + "1)" },
    // It gradially tapers to transparent white (or, visually, 100% saturation color already drawn) at the edge of the wheel
    { at: 1, color: hslString + "0)" }]);
    // Draw a rect using the gradient as a fill style
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  },

  /**
    * @desc updates this element to represent a new color value
    * @param {Object} color - an iroColor object with the new color value
    * @param {Object} changes - an object that gives a boolean for each HSV channel, indicating whether ot not that channel has changed
  */
  update: function update(color, changes) {
    var opts = this._opts;
    var hsv = color.hsv;
    // If the V channel has changed, redraw the wheel UI with the new value
    if (changes.v) {
      this.draw(hsv.v);
    }
    // If the H or S channel has changed, move the marker to the right position
    if (changes.h || changes.s) {
      // convert the hue value to radians, since we'll use it as an angle
      var hueAngle = hsv.h * (PI / 180);
      // convert the saturation value to a distance between the center of the ring and the edge
      var dist = hsv.s / 100 * opts.rMax;
      // Move the marker based on the angle and distance
      this.marker.move(opts.cX + dist * Math.cos(hueAngle), opts.cY + dist * Math.sin(hueAngle));
    }
  },

  /**
    * @desc Takes a point at (x, y) and returns HSV values based on this input -- use this to update a color from mouse input
    * @param {Number} x - point x coordinate
    * @param {Number} y - point y coordinate
    * @return {Object} - new HSV color values (some channels may be missing)
  */
  input: function input(x, y) {
    var opts = this._opts,
        cX = opts.cX,
        cY = opts.cY,
        radius = opts.r,
        rangeMax = opts.rMax;

    // Angle in radians, anticlockwise starting at 12 o'clock
    var angle = Math.atan2(x - cX, y - cY),

    // Calculate the hue by converting the angle to radians, and normalising the angle to 3 o'clock
    hue = 360 - (round(angle * (180 / PI)) + 270) % 360,

    // Find the point's distance from the center of the wheel
    // This is used to show the saturation level
    dist = Math.min(sqrt(pow(cX - x, 2) + pow(cY - y, 2)), rangeMax);

    // Return just the H and S channels, the wheel element doesn't do anything with the L channel
    return {
      h: hue,
      s: round(100 / rangeMax * dist)
    };
  },

  /**
    * @desc Check if a point at (x, y) is inside this element
    * @param {Number} x - point x coordinate
    * @param {Number} y - point y coordinate
    * @return {Boolean} - true if the point is a "hit", else false
  */
  checkHit: function checkHit(x, y) {
    var opts = this._opts;

    // Check if the point is within the hue ring by comparing the point's distance from the centre to the ring's radius
    // If the distance is smaller than the radius, then we have a hit
    var dx = abs(x - opts.cX),
        dy = abs(y - opts.cY);
    return sqrt(dx * dx + dy * dy) < opts.r;
  }
};

module.exports = wheel;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _colorPicker = __webpack_require__(7);

var _colorPicker2 = _interopRequireDefault(_colorPicker);

var _color = __webpack_require__(1);

var _color2 = _interopRequireDefault(_color);

var _stylesheet = __webpack_require__(2);

var _stylesheet2 = _interopRequireDefault(_stylesheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  Color: _color2.default,
  ColorPicker: _colorPicker2.default,
  Stylesheet: _stylesheet2.default,
  // for backwards compat
  ColorWheel: _colorPicker2.default
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=iro.js.map