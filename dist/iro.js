/*!
 * iro.js
 * ----------------
 * Author: James Daniel (github.com/jaames | rakujira.jp)
 * Last updated: Sat Oct 14 2017
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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var round = Math.round;

module.exports = function () {
  /**
    @constructor color object
    @param {String} str (optional) CSS color string to use as the start color for this element
  */
  function color(str) {
    _classCallCheck(this, color);

    // The watch callback function for this color will be stored here
    this._onChange = false;
    // The default color value
    this._value = { h: undefined, s: undefined, v: undefined };
    if (str) this.fromString(str);
  }

  _createClass(color, [{
    key: "fromString",


    /**
      * @desc Set the color from a CSS string
      * @param {String} str - HEX, rgb, or hsl color string
    */
    value: function fromString(str) {
      if (/^rgb/.test(str)) {
        this.rgbString = str;
      } else if (/^hsl/.test(str)) {
        this.hslString = str;
      } else if (/^#[0-9A-Fa-f]/.test(str)) {
        this.hexString = str;
      }
    }

    /**
      * @desc Set a callback function that gets called whenever the selected color changes
      * @param {Function} callback The watch callback
      * @param {Boolean} callImmediately set to true if you want to call the callback as soon as it is added
    */

  }, {
    key: "watch",
    value: function watch(callback, callImmediately) {
      this._onChange = callback;
      if (callImmediately) this.forceUpdate();
    }

    /**
      * @desc Remove the watch callback
    */

  }, {
    key: "unwatch",
    value: function unwatch() {
      this.watch(false);
    }

    /**
      * @desc Force an update
    */

  }, {
    key: "forceUpdate",
    value: function forceUpdate() {
      var value = this._value;
      this._onChange(value, value, { h: true, s: true, v: true });
    }
  }, {
    key: "hsv",
    get: function get() {
      return this._value;
    },
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
    }
  }, {
    key: "rgb",
    get: function get() {
      return color.hsvToRgb(this._value);
    },
    set: function set(value) {
      this.hsv = color.rgbToHsv(value);
    }
  }, {
    key: "rgbString",
    get: function get() {
      return color.rgbToString(this.rgb);
    },
    set: function set(value) {
      this.rgb = color.parseRgbString(value);
    }
  }, {
    key: "hexString",
    get: function get() {
      return color.rgbToHex(this.rgb);
    },
    set: function set(hex) {
      this.rgb = color.parseHexString(hex);
    }
  }, {
    key: "hsl",
    get: function get() {
      return color.hsvToHsl(this._value);
    },
    set: function set(value) {
      this.hsv = color.hslToHsv(value);
    }
  }, {
    key: "hslString",
    get: function get() {
      return color.hslToString(this.hsl);
    },
    set: function set(value) {
      this.hsl = color.parseRgbString(value);
    }
  }], [{
    key: "hsvToRgb",
    value: function hsvToRgb(hsv) {
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
    }
  }, {
    key: "rgbToHsv",
    value: function rgbToHsv(rgb) {
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
  }, {
    key: "rgbToString",
    value: function rgbToString(rgb) {
      return "rgb" + (rgb.a ? "a" : "") + "(" + rgb.r + ", " + rgb.g + ", " + rgb.b + (rgb.a ? ", " + rgb.a : "") + ")";
    }
  }, {
    key: "parseRgbString",
    value: function parseRgbString(str) {
      var parsed = str.match(/(rgba?)\((\d+)(?:\D+?)(\d+)(?:\D+?)(\d+)(?:\D+?)?([0-9\.]+?)?\)/i);
      return {
        r: parseInt(parsed[2]),
        g: parseInt(parsed[3]),
        b: parseInt(parsed[4])
      };
    }
  }, {
    key: "rgbToHex",
    value: function rgbToHex(rgb) {
      r = rgb.r, g = rgb.g, b = rgb.b;
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
    }
  }, {
    key: "parseHexString",
    value: function parseHexString(hex) {
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

      return {
        r: (int >> bitLength * 2 & bitMask) * multiplier,
        g: (int >> bitLength & bitMask) * multiplier,
        b: (int & bitMask) * multiplier
      };
    }
  }, {
    key: "hsvToHsl",
    value: function hsvToHsl(hsv) {
      var s = hsv.s / 100,
          v = hsv.v / 100;
      var p = (2 - s) * v;
      s = s == 0 ? 0 : s * v / (p < 1 ? p : 2 - p);
      return {
        h: hsv.h,
        s: round(s * 100),
        l: round(p * 50)
      };
    }
  }, {
    key: "hslToHsv",
    value: function hslToHsv(hsl) {
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
  }, {
    key: "hslToString",
    value: function hslToString(hsl) {
      return "hsl" + (hsl.a ? "a" : "") + "(" + hsl.h + ", " + hsl.s + "%, " + hsl.l + "%" + (hsl.a ? ", " + hsl.a : "") + ")";
    }
  }, {
    key: "parseHslString",
    value: function parseHslString(str) {
      var parsed = str.match(/(hsla?)\((\d+)(?:\D+?)(\d+)(?:\D+?)(\d+)(?:\D+?)?([0-9\.]+?)?\)/i);
      return {
        h: parseInt(parsed[2]),
        s: parseInt(parsed[3]),
        l: parseInt(parsed[4])
      };
    }
  }]);

  return color;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  /**
    @constructor stylesheet writer
  */
  function _class() {
    _classCallCheck(this, _class);

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
  }

  _createClass(_class, [{
    key: "setRule",


    /**
     * @desc Set a specific rule for a given selector
     * @param {String} selector - the CSS selector for this rule (e.g. "body", ".class", "#id")
     * @param {String} property - the CSS property to set (e.g. "background-color", "font-family", "z-index")
     * @param {String} value    - the new value for the rule (e.g. "rgb(255, 255, 255)", "Helvetica", "99")
    */
    value: function setRule(selector, property, value) {
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
    }

    /**
      * @desc Get an object representing the current css styles
      * @return {Object} css object
    */

  }, {
    key: "enabled",
    set: function set(value) {
      this.sheet.disabled = !value;
    },
    get: function get() {
      return !this.sheet.disabled;
    }
  }, {
    key: "css",
    get: function get() {
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
    }

    /**
      * @desc Get the stylesheet text
      * @return {String} css text
    */

  }, {
    key: "cssText",
    get: function get() {
      var map = this.map;
      var ret = [];
      for (var selector in map) {
        ret.push(selector.replace(/,\W/g, ",\n") + " {\n\t" + map[selector].cssText.replace(/;\W/g, ";\n\t") + "\n}");
      }
      return ret.join("\n");
    }
  }]);

  return _class;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// sniff useragent string to check if the user is running IE
var IS_IE = /msie|trident/.test(window.navigator.userAgent.toLowerCase());
// css class prefix for this element
var CLASS_PREFIX = "iro__marker";

module.exports = function () {
  /**
    * @constructor marker UI
    * @param {Object} ctx - canvas 2d context to draw on
    * @param {Object} opts - options
  */
  function _class(svg, opts) {
    _classCallCheck(this, _class);

    var baseGroup = svg.g({
      class: CLASS_PREFIX
    });
    baseGroup.circle(0, 0, opts.r, {
      class: CLASS_PREFIX + "__outer",
      fill: "none",
      strokeWidth: 5,
      stroke: "#000"
    });
    baseGroup.circle(0, 0, opts.r, {
      class: CLASS_PREFIX + "__inner",
      fill: "none",
      strokeWidth: 2,
      stroke: "#fff"
    });
    this.g = baseGroup;
  }

  /**
    * @desc move markerpoint to centerpoint (x, y) and redraw
    * @param {Number} x - point x coordinate
    * @param {Number} y - point y coordinate
  */


  _createClass(_class, [{
    key: "move",
    value: function move(x, y) {
      // older internet explorer versions dont implement SVG transforms properly, instead we have to force them
      // TODO: move this functionality to the SVG lib
      if (IS_IE) {
        this.g.setAttrs({ "transform": "translate(" + x + "," + y + ")" });
      } else {
        this.g.setTransform("translate", [x, y]);
      }
    }
  }]);

  return _class;
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wheel = __webpack_require__(7);

var _wheel2 = _interopRequireDefault(_wheel);

var _slider = __webpack_require__(5);

var _slider2 = _interopRequireDefault(_slider);

var _dom = __webpack_require__(8);

var _dom2 = _interopRequireDefault(_dom);

var _svg = __webpack_require__(6);

var _svg2 = _interopRequireDefault(_svg);

var _color = __webpack_require__(0);

var _color2 = _interopRequireDefault(_color);

var _stylesheet = __webpack_require__(1);

var _stylesheet2 = _interopRequireDefault(_stylesheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

module.exports = function () {
  /**
    @constructor color wheel object
    @param {ElementOrString} el - a DOM element or the CSS selector for a DOM element to use as a container for the UI
    @param {Object} opts - options for this instance
  */
  function _class(el, opts) {
    var _this = this;

    _classCallCheck(this, _class);

    opts = opts || {};
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
      _this._init(el, opts);
    });
  }

  /**
    * @desc Set a callback function that gets called whenever the selected color changes
    * @param {Function} callback The watch callback
    * @param {Boolean} callImmediately set to true if you want to call the callback as soon as it is added
  */


  _createClass(_class, [{
    key: "watch",
    value: function watch(callback, callImmediately) {
      this.on("color:change", callback);
      this._onChange = callback;
      if (callImmediately) callback(this.color);
    }

    /**
      * @desc Remove the watch callback
    */

  }, {
    key: "unwatch",
    value: function unwatch() {
      this.off("color:change", this._onChange);
    }

    /**
      * @desc Set a callback function for an event
      * @param {String} eventType The name of the event to listen to, pass "*" to listen to all events
      * @param {Function} callback The watch callback
    */

  }, {
    key: "on",
    value: function on(eventType, callback) {
      var events = this._events;
      (events[eventType] || (events[eventType] = [])).push(callback);
    }

    /**
      * @desc Remove a callback function for an event added with on()
      * @param {String} eventType The name of the event
      * @param {Function} callback The watch callback to remove from the event
    */

  }, {
    key: "off",
    value: function off(eventType, callback) {
      var eventList = this._events[eventType];
      if (eventList) evenList.splice(eventList.indexOf(callback), 1);
    }

    /**
      * @desc Emit an event
      * @param {String} eventType The name of the event to emit
      * @param {Object} data data to pass to all the callback functions
    */

  }, {
    key: "emit",
    value: function emit(eventType, data) {
      var events = this._events;
      (events[eventType] || []).concat(events["*"] || []).map(function (callback) {
        callback(data);
      });
    }
  }, {
    key: "_init",
    value: function _init(el, opts) {
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
      _dom2.default.listen(svgRoot.el, ["mousedown", "touchstart"], this._mouseDown.bind(this));
    }

    /**
      * @desc Get the local-space X and Y pointer position from an input event
      * @param {Event} e A mouse or touch event
      * @return {Object} x and y coordinates from the top-left of the UI
      * @access protected
    */

  }, {
    key: "_getLocalPoint",
    value: function _getLocalPoint(e) {
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
    }

    /**
      * @desc Handle a pointer input at local-space point (x, y)
      * @param {Event} e A mouse or touch event
      * @return {Object} x and y coordinates from the top-left of the UI
      * @access protected
    */

  }, {
    key: "_handleInput",
    value: function _handleInput(x, y) {
      // Use the active UI element to handle translating the input to a change in the color
      this.color.hsv = this._mouseTarget.input(x, y);
    }

    /**
      * @desc mousedown event handler
      * @param {Event} e A mouse or touch event
      * @access protected
    */

  }, {
    key: "_mouseDown",
    value: function _mouseDown(e) {
      var _this2 = this;

      // Get the local-space position of the mouse input
      var point = this._getLocalPoint(e),
          x = point.x,
          y = point.y;

      // Loop through each UI element and check if the point "hits" it
      this.ui.forEach(function (uiElement) {
        // If the element is hit, this means the user has clicked the element and is trying to interact with it
        if (uiElement.checkHit(x, y)) {
          // Prevent default event behaviour, like scrolling
          e.preventDefault();
          // Set a reference to this colorWheel instance so that the global event handlers know about it
          activeColorWheel = _this2;
          // Set an internal reference to the uiElement being interacted with, for other internal event handlers
          _this2._mouseTarget = uiElement;
          // Emit input start event
          _this2.emit("input:start");
          // Finally, use the position to update the picked color
          _this2._handleInput(x, y);
        }
      });
    }

    /**
      * @desc mousemose event handler
      * @param {Event} e A mouse or touch event
      * @access protected
    */

  }, {
    key: "_mouseMove",
    value: function _mouseMove(e) {
      // If there is an active colorWheel (set in _mouseDown) then update the input as the user interacts with it
      if (this == activeColorWheel) {
        // Prevent default event behaviour, like scrolling
        e.preventDefault();
        // Get the local-space position of the mouse input
        var point = this._getLocalPoint(e);
        // Use the position to update the picker color
        this._handleInput(point.x, point.y);
      }
    }

    /**
      * @desc update the selected color
      * @param {Object} newValue - the new HSV values
      * @param {Object} oldValue - the old HSV values
      * @param {Object} changes - booleans for each HSV channel: true if the new value is different to the old value, else false
      * @access protected
    */

  }, {
    key: "_update",
    value: function _update(newValue, oldValue, changes) {
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
  }]);

  return _class;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _colorPicker = __webpack_require__(3);

var _colorPicker2 = _interopRequireDefault(_colorPicker);

var _color = __webpack_require__(0);

var _color2 = _interopRequireDefault(_color);

var _stylesheet = __webpack_require__(1);

var _stylesheet2 = _interopRequireDefault(_stylesheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  Color: _color2.default,
  ColorPicker: _colorPicker2.default,
  Stylesheet: _stylesheet2.default
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _marker = __webpack_require__(2);

var _marker2 = _interopRequireDefault(_marker);

var _color = __webpack_require__(0);

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// css class prefix for this element
var CLASS_PREFIX = "iro__slider";

module.exports = function () {
  /**
    * @constructor slider UI
  */
  function _class(svg, opts) {
    _classCallCheck(this, _class);

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

    this.type = "slider";
    this._opts = opts;

    var gradient = svg.gradient("linear", {
      0: { color: "#000" },
      100: { color: "#fff" }
    });

    this._gradient = gradient;

    var radius = r + borderWidth / 2;

    var baseGroup = svg.g({
      class: CLASS_PREFIX
    });

    baseGroup.insert("rect", {
      class: CLASS_PREFIX + "__value",
      rx: radius,
      ry: radius,
      x: x - borderWidth / 2,
      y: y - borderWidth / 2,
      width: w + borderWidth,
      height: h + borderWidth,
      fill: gradient.url,
      strokeWidth: borderWidth,
      stroke: opts.border.color
    });

    this.marker = new _marker2.default(baseGroup, opts.marker);
  }

  /**
    * @desc updates this element to represent a new color value
    * @param {Object} color - an iroColor object with the new color value
    * @param {Object} changes - an object that gives a boolean for each HSV channel, indicating whether ot not that channel has changed
  */


  _createClass(_class, [{
    key: "update",
    value: function update(color, changes) {
      var opts = this._opts;
      var range = opts.range;
      var hsv = color.hsv;
      var hsl = _color2.default.hsvToHsl({ h: hsv.h, s: hsv.s, v: 100 });
      if (opts.sliderType == "v") {
        if (changes.h || changes.s) {
          this._gradient.stops[1].setAttrs({ stopColor: "hsl(" + hsl.h + "," + hsl.s + "%," + hsl.l + "%)" });
        }
        if (changes.v) {
          var percent = hsv.v / 100;
          this.marker.move(range.min + percent * range.w, opts.y + opts.h / 2);
        }
      }
    }

    /**
      * @desc Takes a point at (x, y) and returns HSV values based on this input -- use this to update a color from mouse input
      * @param {Number} x - point x coordinate
      * @param {Number} y - point y coordinate
      * @return {Object} - new HSV color values (some channels may be missing)
    */

  }, {
    key: "input",
    value: function input(x, y) {
      var opts = this._opts;
      var range = opts.range;
      var dist = Math.max(Math.min(x, range.max), range.min) - range.min;
      return {
        v: Math.round(100 / range.w * dist)
      };
    }

    /**
      * @desc Check if a point at (x, y) is inside this element
      * @param {Number} x - point x coordinate
      * @param {Number} y - point y coordinate
      * @return {Boolean} - true if the point is a "hit", else false
    */

  }, {
    key: "checkHit",
    value: function checkHit(x, y) {
      var opts = this._opts;
      return x > opts.x && x < opts.x + opts.w && y > opts.y && y < opts.y + opts.h;
    }
  }]);

  return _class;
}();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Quick references to reused math functions
var PI = Math.PI,
    cos = Math.cos,
    sin = Math.sin;

var GRADIENT_INDEX = 0;
var GRADIENT_SUFFIX = "Gradient";
var SVG_NAMESPACE = "http://www.w3.org/2000/svg";
var SVG_ATTRIBUTE_SHORTHANDS = {
  class: "class",
  stroke: "stroke",
  strokeWidth: "stroke-width",
  fill: "fill",
  opacity: "opacity",
  offset: "offset",
  stopColor: "stop-color",
  stopOpacity: "stop-opacity"
};
var SVG_TRANSFORM_SHORTHANDS = {
  translate: "setTranslate",
  scale: "setScale",
  rotate: "setRotate"
};

var svgElement = function () {
  function svgElement(root, parent, type, attrs) {
    _classCallCheck(this, svgElement);

    var el = document.createElementNS(SVG_NAMESPACE, type);
    this.el = el;
    this.setAttrs(attrs);
    (parent.el || parent).appendChild(el);
    this._root = root;
    this._svgTransforms = {};
    this._transformList = el.transform ? el.transform.baseVal : false;
  }

  _createClass(svgElement, [{
    key: "insert",
    value: function insert(type, attrs) {
      return new svgElement(this._root, this, type, attrs);
    }
  }, {
    key: "g",
    value: function g(attrs) {
      return this.insert("g", attrs);
    }
  }, {
    key: "arc",
    value: function arc(cx, cy, radius, startAngle, endAngle, attrs) {
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
    }
  }, {
    key: "circle",
    value: function circle(cx, cy, radius, attrs) {
      attrs = attrs || {};
      attrs.cx = cx;
      attrs.cy = cy;
      attrs.r = radius;
      return this.insert("circle", attrs);
    }
  }, {
    key: "setTransform",
    value: function setTransform(type, args) {
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
    }
  }, {
    key: "setAttrs",
    value: function setAttrs(attrs) {
      for (var attr in attrs || {}) {
        var name = attr in SVG_ATTRIBUTE_SHORTHANDS ? SVG_ATTRIBUTE_SHORTHANDS[attr] : attr;
        this.el.setAttribute(name, attrs[attr]);
      }
    }
  }]);

  return svgElement;
}();

;

var svgGradient = function svgGradient(root, type, stops) {
  _classCallCheck(this, svgGradient);

  var stopElements = [];
  var gradient = root._defs.insert(type + GRADIENT_SUFFIX, {
    id: "iro" + GRADIENT_SUFFIX + GRADIENT_INDEX++
  });
  for (var offset in stops) {
    var stop = stops[offset];
    stopElements.push(gradient.insert("stop", {
      offset: offset + "%",
      stopColor: stop.color,
      stopOpacity: stop.opacity === undefined ? 1 : stop.opacity
    }));
  }
  this.el = gradient.el;
  this.url = "url(#" + gradient.el.id + ")";
  this.stops = stopElements;
};

;

module.exports = function (_svgElement) {
  _inherits(_class, _svgElement);

  function _class(parent, width, height) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, null, parent, "svg", { width: width, height: height, style: "display:block;overflow:hidden;" }));

    _this._root = _this;
    _this._defs = _this.insert("defs");
    return _this;
  }

  _createClass(_class, [{
    key: "gradient",
    value: function gradient(type, stops) {
      return new svgGradient(this, type, stops);
    }
  }]);

  return _class;
}(svgElement);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _marker = __webpack_require__(2);

var _marker2 = _interopRequireDefault(_marker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// css class prefix for this element
var CLASS_PREFIX = "iro__wheel";
// Quick references to reused math functions
var PI = Math.PI,
    sqrt = Math.sqrt,
    abs = Math.abs,
    round = Math.round;

module.exports = function () {
  /**
    * @constructor hue wheel UI
  */
  function _class(svg, opts) {
    _classCallCheck(this, _class);

    this._opts = opts;
    this.type = "wheel";

    var cY = opts.cY,
        cX = opts.cX,
        r = opts.r,
        border = opts.border;

    var gradient = svg.gradient("radial", {
      0: {
        color: "#fff"
      },
      100: {
        color: "#fff",
        opacity: 0
      }
    });

    var baseGroup = svg.g({
      class: CLASS_PREFIX
    });

    baseGroup.circle(cX, cY, r + border.w / 2, {
      class: CLASS_PREFIX + "__border",
      fill: "#fff",
      stroke: border.color,
      strokeWidth: border.w
    });

    var ringGroup = baseGroup.g({
      class: CLASS_PREFIX + "__hue",
      strokeWidth: r,
      fill: "none"
    });

    for (var hue = 0; hue < 360; hue++) {
      ringGroup.arc(cX, cY, r / 2, hue - 0.5, hue + 1.5, {
        stroke: "hsl(" + hue + ",100%,50%)"
      });
    }

    baseGroup.circle(cX, cY, r, {
      class: CLASS_PREFIX + "__saturation",
      fill: gradient.url
    });

    this._lightness = baseGroup.circle(cX, cY, r, {
      class: CLASS_PREFIX + "__lightness"
    });

    this.marker = new _marker2.default(baseGroup, opts.marker);
  }

  /**
    * @desc updates this element to represent a new color value
    * @param {Object} color - an iroColor object with the new color value
    * @param {Object} changes - an object that gives a boolean for each HSV channel, indicating whether ot not that channel has changed
  */


  _createClass(_class, [{
    key: "update",
    value: function update(color, changes) {
      var opts = this._opts;
      var hsv = color.hsv;
      // If the V channel has changed, redraw the wheel UI with the new value
      if (changes.v) {
        this._lightness.setAttrs({ opacity: (1 - hsv.v / 100).toFixed(2) });
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
    }

    /**
      * @desc Takes a point at (x, y) and returns HSV values based on this input -- use this to update a color from mouse input
      * @param {Number} x - point x coordinate
      * @param {Number} y - point y coordinate
      * @return {Object} - new HSV color values (some channels may be missing)
    */

  }, {
    key: "input",
    value: function input(x, y) {
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
    }

    /**
      * @desc Check if a point at (x, y) is inside this element
      * @param {Number} x - point x coordinate
      * @param {Number} y - point y coordinate
      * @return {Boolean} - true if the point is a "hit", else false
    */

  }, {
    key: "checkHit",
    value: function checkHit(x, y) {
      var opts = this._opts;

      // Check if the point is within the hue ring by comparing the point's distance from the centre to the ring's radius
      // If the distance is smaller than the radius, then we have a hit
      var dx = abs(x - opts.cX),
          dy = abs(y - opts.cY);
      return sqrt(dx * dx + dy * dy) < opts.r;
    }
  }]);

  return _class;
}();

/***/ }),
/* 8 */
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
    console.log(callback);
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