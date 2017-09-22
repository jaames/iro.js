/*!
 * iro.js
 * ----------------
 * Author: James Daniel (github.com/jaames | rakujira.jp)
 * Last updated: Fri Sep 22 2017
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
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	__webpack_require__.p = "/test";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
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

var _hslString = __webpack_require__(4);

var _hslString2 = _interopRequireDefault(_hslString);

var _rgbString = __webpack_require__(8);

var _rgbString2 = _interopRequireDefault(_rgbString);

var _hexString = __webpack_require__(7);

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
      changes[channel] = newValue[channel] != oldValue[channel];
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


/**
  @constructor stylesheet writer
  @param {Object} overrides - an object representing the CSS rules that this stylesheet updates
*/
var stylesheet = function stylesheet(overrides) {
  // Create a new style element
  var style = document.createElement("style");
  document.head.appendChild(style);
  // Webkit apparently requires a text node to be inserted into the style element
  // (according to https://davidwalsh.name/add-rules-stylesheets)
  style.appendChild(document.createTextNode(""));
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
    this.enable();
  },
  enable: function enable() {
    this.sheet.disabled = false;
  },

  /**
    * @desc Turns the stylesheet "off", preventing the styles from being rendered
  */
  off: function off() {
    this.disable();
  },
  disable: function disable() {
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
    var s = hsl.s / 100,
        l = hsl.l / 100;
    l *= 2;
    s *= l <= 1 ? l : 2 - l;
    return {
      h: hsl.h,
      s: round(2 * s / (l + s) * 100),
      v: round((l + s) / 2 * 100)
    };
  }
};

/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// sniff useragent string to check if the user is running IE
var IS_IE = /msie|trident/.test(window.navigator.userAgent.toLowerCase());

/**
  * @constructor marker UI
  * @param {Object} ctx - canvas 2d context to draw on
  * @param {Object} opts - options
*/
var marker = function marker(svg, opts) {
  var baseGroup = svg.g();
  baseGroup.circle(0, 0, opts.r, {
    f: "none",
    sw: 5,
    s: "#000"
  });
  baseGroup.circle(0, 0, opts.r, {
    f: "none",
    sw: 2,
    s: "#fff"
  });
  this.g = baseGroup;
};

marker.prototype = {
  /**
    * @desc move markerpoint to centerpoint (x, y) and redraw
    * @param {Number} x - point x coordinate
    * @param {Number} y - point y coordinate
  */
  move: function move(x, y) {
    // older internet explorer versions dont implement SVG transforms properly, instead we have to force them
    // TODO: move this functionality to the SVG lib
    if (IS_IE) {
      this.g.setAttrs({ "transform": "translate(" + x + "," + y + ")" });
    } else {
      this.g.setTransform("t", [x, y]);
    }
  }
};

module.exports = marker;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _wheel = __webpack_require__(12);

var _wheel2 = _interopRequireDefault(_wheel);

var _slider = __webpack_require__(10);

var _slider2 = _interopRequireDefault(_slider);

var _dom = __webpack_require__(13);

var _dom2 = _interopRequireDefault(_dom);

var _svg = __webpack_require__(11);

var _svg2 = _interopRequireDefault(_svg);

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
var colorWheel = function colorWheel(el, opts) {
  if (!(this instanceof colorWheel)) return new colorWheel(el, opts);
  // event storage for `on` and `off`
  this._events = {};
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
    el = "string" == typeof el ? document.querySelector(el) : el;
    // Find the width and height for the UI
    // If not defined in the options, try the HTML width + height attributes of the wrapper, else default to 320
    var width = opts.width || parseInt(el.width) || 320;
    var height = opts.height || parseInt(el.height) || 320;

    var svgRoot = new _svg2.default(el, width, height);

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
      color: opts.borderColor || "#fff"
    };
    // Create UI elements
    this.ui = [new _wheel2.default(svgRoot, {
      cX: leftMargin + bodyWidth / 2,
      cY: bodyWidth / 2,
      r: wheelRadius,
      rMax: wheelRadius - (markerRadius + padding),
      marker: marker,
      border: borderStyles
    }), new _slider2.default(svgRoot, {
      sliderType: "v",
      x: leftMargin + borderWidth,
      y: bodyWidth + sliderMargin,
      w: bodyWidth - borderWidth * 2,
      h: sliderHeight - borderWidth * 2,
      r: sliderHeight / 2 - borderWidth,
      marker: marker,
      border: borderStyles
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
    this.on("color:change", callback);
    this._onChange = callback;
    if (callImmediately) callback(this.color);
  },

  /**
    * @desc Remove the watch callback
  */
  unwatch: function unwatch() {
    this.off("color:change", this._onChange);
  },

  /**
    * @desc Set a callback function for an event
    * @param {String} eventType The name of the event to listen to, pass "*" to listen to all events
    * @param {Function} callback The watch callback
  */
  on: function on(eventType, callback) {
    var events = this._events;
    (events[eventType] || (events[eventType] = [])).push(callback);
  },

  /**
    * @desc Remove a callback function for an event added with on()
    * @param {String} eventType The name of the event
    * @param {Function} callback The watch callback to remove from the event
  */
  off: function off(eventType, callback) {
    var eventList = this._events[eventType];
    if (eventList) evenList.splice(eventList.indexOf(callback), 1);
  },

  /**
    * @desc Emit an event
    * @param {String} eventType The name of the event to emit
    * @param {Object} data data to pass to all the callback functions
  */
  emit: function emit(eventType, data) {
    var events = this._events;
    (events[eventType] || []).concat(events["*"] || []).map(function (callback) {
      callback(data);
    });
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
    rect = this.el.getBoundingClientRect();
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
    // Get the local-space position of the mouse input
    var point = this._getLocalPoint(e),
        x = point.x,
        y = point.y;

    // Loop through each UI element and check if the point "hits" it
    for (var i = 0; i < this.ui.length; i++) {
      var uiElement = this.ui[i];
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
    }
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
    // Call the color change event
    this.emit("color:change", color);
  }
};

module.exports = colorWheel;

/***/ }),
/* 7 */
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
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _colorPicker = __webpack_require__(6);

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

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _marker = __webpack_require__(5);

var _marker2 = _interopRequireDefault(_marker);

var _hslString = __webpack_require__(4);

var _hslString2 = _interopRequireDefault(_hslString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
  * @constructor slider UI
*/
var slider = function slider(svg, opts) {

  var r = opts.r,
      w = opts.w,
      h = opts.h,
      x = opts.x,
      y = opts.y,
      borderWidth = opts.border.w;

  // "range" limits how far the slider's marker can travel, and where it stops and starts along the X axis
  opts.range = {
    min: x + r,
    max: x + w - r,
    w: w - r * 2
  };

  opts.sliderType = opts.sliderType || "v";

  var gradient = svg.gradient("linear", {
    0: { c: "#000" },
    100: { c: "#fff" }
  });

  var radius = r + borderWidth / 2;

  var baseGroup = svg.g();

  baseGroup.insert("rect", {
    rx: radius,
    ry: radius,
    x: x - borderWidth / 2,
    y: y - borderWidth / 2,
    width: w + borderWidth,
    height: h + borderWidth,
    f: gradient.url,
    sw: borderWidth,
    s: opts.border.color
  });

  this.type = "slider";
  this._opts = opts;
  this._gradient = gradient;
  this.marker = new _marker2.default(baseGroup, opts.marker);
};

slider.prototype = {

  /**
    * @desc updates this element to represent a new color value
    * @param {Object} color - an iroColor object with the new color value
    * @param {Object} changes - an object that gives a boolean for each HSV channel, indicating whether ot not that channel has changed
  */
  update: function update(color, changes) {
    var opts = this._opts;
    var range = opts.range;
    var hsv = color.hsv;
    if (opts.sliderType == "v") {
      if (changes.h || changes.s) {
        this._gradient.stops[1].setAttrs({ sc: _hslString2.default.fromHsv({ h: hsv.h, s: hsv.s, v: 100 }) });
      }
      if (changes.v) {
        var percent = hsv.v / 100;
        this.marker.move(range.min + percent * range.w, opts.y + opts.h / 2);
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
    return x > opts.x && x < opts.x + opts.w && y > opts.y && y < opts.y + opts.h;
  }
};

module.exports = slider;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Quick references to reused math functions
var PI = Math.PI,
    cos = Math.cos,
    sin = Math.sin;

var GRADIENT_INDEX = 0;
var GRADIENT_SUFFIX = "Gradient";
var SVG_NAMESPACE = "http://www.w3.org/2000/svg";
var SVG_ATTRIBUTE_SHORTHANDS = {
  s: "stroke",
  sw: "stroke-width",
  f: "fill",
  o: "opacity",
  os: "offset",
  sc: "stop-color",
  so: "stop-opacity"
};
var SVG_TRANSFORM_SHORTHANDS = {
  t: "setTranslate",
  s: "setScale",
  r: "setRotate"
};

var svgElement = function svgElement(root, parent, type, attrs) {
  var el = document.createElementNS(SVG_NAMESPACE, type);
  this.el = el;
  this.setAttrs(attrs);
  (parent.el || parent).appendChild(el);
  this._root = root;
  this._svgTransforms = {};
  this._transformList = el.transform ? el.transform.baseVal : false;
};

svgElement.prototype = {
  insert: function insert(type, attrs) {
    return new svgElement(this._root, this, type, attrs);
  },

  g: function g(attrs) {
    return this.insert("g", attrs);
  },

  arc: function arc(cx, cy, radius, startAngle, endAngle, attrs) {
    var largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    startAngle *= PI / 180;
    endAngle *= PI / 180;
    var x1 = cx + radius * cos(endAngle),
        y1 = cy + radius * sin(endAngle),
        x2 = cx + radius * cos(startAngle),
        y2 = cy + radius * sin(startAngle);
    attrs = attrs || {};
    attrs.d = ["M", x1, y1, "A", radius, radius, 0, largeArcFlag, 0, x2, y2].join(" ");
    return this.insert("path", attrs);
  },

  circle: function circle(cx, cy, radius, attrs) {
    attrs = attrs || {};
    attrs.cx = cx;
    attrs.cy = cy;
    attrs.r = radius;
    return this.insert("circle", attrs);
  },

  setTransform: function setTransform(type, args) {
    var transform, transformFn;
    var svgTransforms = this._svgTransforms;
    if (!svgTransforms[type]) {
      transform = this._root.el.createSVGTransform();
      svgTransforms[type] = transform;
      this._transformList.appendItem(transform);
    } else {
      transform = svgTransforms[type];
    }
    transformFn = type in SVG_TRANSFORM_SHORTHANDS ? SVG_TRANSFORM_SHORTHANDS[type] : type;
    transform[transformFn].apply(transform, args);
  },

  setAttrs: function setAttrs(attrs) {
    for (var attr in attrs || {}) {
      var name = attr in SVG_ATTRIBUTE_SHORTHANDS ? SVG_ATTRIBUTE_SHORTHANDS[attr] : attr;
      this.el.setAttribute(name, attrs[attr]);
    }
  }
};

var svgGradient = function svgGradient(root, type, stops) {
  var stopElements = [];
  var gradient = root._defs.insert(type + GRADIENT_SUFFIX, {
    id: "iro" + GRADIENT_SUFFIX + GRADIENT_INDEX++
  });
  for (var offset in stops) {
    var stop = stops[offset];
    stopElements.push(gradient.insert("stop", {
      os: offset + "%",
      sc: stop.c,
      so: stop.o === undefined ? 1 : stop.o
    }));
  }
  this.el = gradient.el;
  this.url = "url(#" + gradient.el.id + ")";
  this.stops = stopElements;
};

var svgRoot = function svgRoot(parent, width, height) {
  svgElement.call(this, this, parent, "svg", { width: width, height: height });
  this._defs = this.insert("defs");
};

svgRoot.prototype = Object.create(svgElement.prototype);
svgRoot.prototype.constructor = svgRoot;
svgRoot.prototype.gradient = function (type, stops) {
  return new svgGradient(this, type, stops);
};

module.exports = svgRoot;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _marker = __webpack_require__(5);

var _marker2 = _interopRequireDefault(_marker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Quick references to reused math functions
var PI = Math.PI,
    sqrt = Math.sqrt,
    abs = Math.abs,
    round = Math.round;

/**
  * @constructor hue wheel UI
*/
var wheel = function wheel(svg, opts) {
  this._opts = opts;
  this.type = "wheel";

  var cY = opts.cY,
      cX = opts.cX,
      r = opts.r,
      border = opts.border;

  var gradient = svg.gradient("radial", {
    0: { c: "#fff" },
    100: { c: "#fff", o: 0 }
  });

  var baseGroup = svg.g();

  var ringGroup = baseGroup.g({
    sw: r,
    f: "none"
  });

  for (var hue = 0; hue < 360; hue++) {
    ringGroup.arc(cX, cY, r / 2, hue - 0.5, hue + 1.5, {
      s: "hsl(" + hue + ",100%,50%)"
    });
  }

  baseGroup.circle(cX, cY, r + border.w / 2, {
    f: gradient.url,
    s: border.color,
    sw: border.w
  });

  this._lightness = baseGroup.circle(cX, cY, r);

  this.marker = new _marker2.default(baseGroup, opts.marker);
};

wheel.prototype = {
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
      this._lightness.setAttrs({ o: (1 - hsv.v / 100).toFixed(2) });
      // this.draw(hsv.v);
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
        rangeMax = opts.rMax,
        _x = opts.cX - x,
        _y = opts.cY - y;

    var angle = Math.atan2(_y, _x),

    // Calculate the hue by converting the angle to radians
    hue = round(angle * (180 / PI)) + 180,

    // Find the point's distance from the center of the wheel
    // This is used to show the saturation level
    dist = Math.min(sqrt(_x * _x + _y * _y), rangeMax);

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


// Quick reference to the document object and some strings since we usethem more than once
var doc = document,
    READYSTATE_COMPLETE = "complete",
    READYSTATE_CHANGE = "readystatechange";

module.exports = {
  /**
   * @desc listen to one or more events on an element
   * @param {Element} el target element
   * @param {ArrayOrString} eventList the events to listen to
   * @param {Function} callback the event callback function
  */
  listen: function listen(el, eventList, callback) {
    for (var i = 0; i < eventList.length; i++) {
      el.addEventListener(eventList[i], callback);
    }
  },

  /**
   * @desc remove an event listener on an element
   * @param {Element} el target element
   * @param {ArrayOrString} eventList the events to remove
   * @param {Function} callback the event callback function
  */
  unlisten: function unlisten(el, eventList, callback) {
    for (var i = 0; i < eventList.length; i++) {
      el.removeEventListener(eventList[i], callback);
    }
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
      _this.listen(doc, [READYSTATE_CHANGE], function stateChange(e) {
        if (doc.readyState == READYSTATE_COMPLETE) {
          callback();
          _this.unlisten(doc, [READYSTATE_CHANGE], stateChange);
        }
      });
    }
  }
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=iro.js.map