/*!
 * iro.js v4.0.0-alpha
 * 2016-2018 James Daniel
 * Released under the MIT License
 * github.com/jaames/iro.js
 */

import { Component, h, render } from 'preact';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/**
  * @desc listen to one or more events on an element
  * @param {Element} el target element
  * @param {Array} eventList the events to listen to
  * @param {Function} callback the event callback function
  * @param {Object} params params to pass to addEventListener
*/

function listen(el, eventList, callback, params) {
  if ( params === void 0 ) params = {};

  for (var i = 0; i < eventList.length; i++) {
    el.addEventListener(eventList[i], callback, params);
  }
}
/**
* @desc remove an event listener on an element
* @param {Element} el target element
* @param {Array} eventList the events to remove
* @param {Function} callback the event callback function
*/

function unlisten(el, eventList, callback) {
  for (var i = 0; i < eventList.length; i++) {
    el.removeEventListener(eventList[i], callback);
  }
}

var EVENT_MOUSEDOWN = "mousedown",
      EVENT_MOUSEMOVE = "mousemove",
      EVENT_MOUSEUP = "mouseup",
      EVENT_TOUCHSTART = "touchstart",
      EVENT_TOUCHMOVE = "touchmove",
      EVENT_TOUCHEND = "touchend";
var IroComponent = (function (Component$$1) {
  function IroComponent () {
    Component$$1.apply(this, arguments);
  }
}

  if ( Component$$1 ) IroComponent.__proto__ = Component$$1;
  IroComponent.prototype = Object.create( Component$$1 && Component$$1.prototype );
  IroComponent.prototype.constructor = IroComponent;

  IroComponent.prototype.componentDidMount = function componentDidMount () {
    if (this.root) { listen(this.root, [EVENT_MOUSEDOWN, EVENT_TOUCHSTART], this, {
      passive: false
    }); }
  };

  IroComponent.prototype.componentWillUnmount = function componentWillUnmount () {
    if (this.root) { unlisten(this.root, [EVENT_MOUSEDOWN, EVENT_TOUCHSTART], this); }
  };

  IroComponent.prototype.handleEvent = function handleEvent (e) {
    var ref = this;
    var root = ref.root; // Detect if the event is a touch event by checking if it has the `touches` property
    // If it is a touch event, use the first touch input

    e.preventDefault();
    var point = e.touches ? e.changedTouches[0] : e;
    var x = point.clientX;
    var y = point.clientY; // Get the screen position of the component

    var rect = root.getBoundingClientRect();
    var hsv;

    switch (e.type) {
      case EVENT_MOUSEDOWN:
      case EVENT_TOUCHSTART:
        listen(document, [EVENT_MOUSEMOVE, EVENT_TOUCHMOVE, EVENT_MOUSEUP, EVENT_TOUCHEND], this, {
          passive: false
        });
        hsv = this.input(x, y, rect, "START"); // parent.emit("input:start", parent.color);

        break;

      case EVENT_MOUSEMOVE:
      case EVENT_TOUCHMOVE:
        // Use the position to update the picker color
        hsv = this.input(x, y, rect, "MOVE");
        break;

      case EVENT_MOUSEUP:
      case EVENT_TOUCHEND:
        hsv = this.input(x, y, rect, "END"); // parent.emit("input:end", parent.color);

        unlisten(document, [EVENT_MOUSEMOVE, EVENT_TOUCHMOVE, EVENT_MOUSEUP, EVENT_TOUCHEND], this);
        break;
    } // if (hsv) parent.color.hsv = hsv;

  };

  IroComponent.prototype.input = function input (x, y, rect, type) {};

  return IroComponent;
}(Component));

function IroMarker(props) {
  return h("svg", {
    class: "iro__marker",
    x: props.x,
    y: props.y,
    overflow: "visible"
  }, h("circle", {
    class: "iro__marker__outer",
    x: 0,
    y: 0,
    r: props.r,
    fill: "none",
    "stroke-width": 5,
    stroke: "#000"
  }), h("circle", {
    class: "iro__marker__inner",
    x: 0,
    y: 0,
    r: props.r,
    fill: "none",
    "stroke-width": 7,
    stroke: "#fff"
  }));
}
IroMarker.defaultProps = {
  x: 0,
  y: 0,
  r: 8
};

function arcPath(cx, cy, radius, startAngle, endAngle) {
  var largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  startAngle *= Math.PI / 180;
  endAngle *= Math.PI / 180;
  var x1 = cx + radius * Math.cos(endAngle);
  var y1 = cy + radius * Math.sin(endAngle);
  var x2 = cx + radius * Math.cos(startAngle);
  var y2 = cy + radius * Math.sin(startAngle);
  return ["M", x1, y1, "A", radius, radius, 0, largeArcFlag, 0, x2, y2].join(" ");
}

var IroWheel = (function (IroComponent$$1) {
  function IroWheel () {
    IroComponent$$1.apply(this, arguments);
  }

  if ( IroComponent$$1 ) IroWheel.__proto__ = IroComponent$$1;
  IroWheel.prototype = Object.create( IroComponent$$1 && IroComponent$$1.prototype );
  IroWheel.prototype.constructor = IroWheel;

  IroWheel.prototype.render = function render$$1 (props) {
    var this$1 = this;

    var hsv = props.hsv;
    var markerAngle = (props.anticlockwise ? 360 - hsv.h : hsv.h) * (Math.PI / 180);
    var markerDist = hsv.s / 100 * props.rMax;
    var radius = props.radius;
    var cX = 50;
    var cY = 50;
    return h("svg", {
      class: "iro__wheel",
      x: props.x,
      y: props.y,
      ref: function (el) { return this$1.root = el; }
    }, h("defs", null, h("radialGradient", {
      id: "iroGradient2"
    }, h("stop", {
      offset: "0%",
      "stop-color": "#fff"
    }), h("stop", {
      offset: "100%",
      "stop-color": "#fff",
      "stop-opacity": 0
    }))), h("circle", {
      class: "iro__wheel__border",
      cx: cX,
      cy: cY,
      r: radius,
      fill: "none",
      stroke: props.borderColor,
      "stroke-width": props.borderWidth,
      "vector-effect": "non-scaling-stroke"
    }), h("g", {
      class: "__hue",
      "stroke-width": radius / 2,
      fill: "none"
    }, new Array(360).fill(0).map(function (_, hue) { return h("path", {
      key: hue,
      d: arcPath(cX, cY, radius, hue, hue + 1.5),
      stroke: ("hsl(" + (props.anticlockwise ? 360 - hue : hue) + ", 100%, 50%)")
    }); })), h("circle", {
      class: "iro__wheel__saturation",
      cx: cX,
      cy: cY,
      r: radius,
      fill: "url(#iroGradient2)"
    }), h("circle", {
      class: "iro__wheel__lightness",
      cx: cX,
      cy: cY,
      r: radius,
      fill: "#000",
      opacity: 1 - hsv.v / 100
    }), h(IroMarker, {
      r: props.markerRadius,
      x: cX + markerDist * Math.cos(markerAngle),
      y: cY + markerDist * Math.sin(markerAngle)
    }));
  };
  /**
    * @desc Takes a point at (x, y) and returns HSV values based on this input -- use this to update a color from mouse input
    * @param {Number} x - point x coordinate
    * @param {Number} y - point y coordinate
    * @return {Object} - new HSV color values (some channels may be missing)
  */


  IroWheel.prototype.input = function input (x, y, rect, type) {
    var props = this.props;
    var rangeMax = 100;
    var cX = rect.width / 2;
    var cY = rect.height / 2;
    x = cX - (x - rect.left);
    y = cY - (y - rect.top);
    var angle = Math.atan2(y, x); // Calculate the hue by converting the angle to radians

    var hue = Math.round(angle * (180 / Math.PI)) + 180; // Find the point's distance from the center of the wheel
    // This is used to show the saturation level

    var dist = Math.min(Math.sqrt(x * x + y * y), rangeMax);
    hue = props.anticlockwise ? 360 - hue : hue; // Return just the H and S channels, the wheel element doesn't do anything with the L channel

    return {
      h: hue,
      s: Math.round(100 / rangeMax * dist)
    };
  };

  return IroWheel;
}(IroComponent));

var round = Math.round;
var floor = Math.floor;
/**
  * @desc generic parser for hsl / rgb / etc string
  * @param {String} str - color string
  * @param {Array} maxValues - max values for each channel (used for calculating percent-based values)
  * @return {Array} type (rgb | rgba | hsl | hsla) values for each channel
*/

function parseColorStr(str, maxValues) {
  var parsed = str.match(/(\S+)\((\d+)(%?)(?:\D+?)(\d+)(%?)(?:\D+?)(\d+)(%?)(?:\D+?)?([0-9\.]+?)?\)/i),
      val1 = parseInt(parsed[2]),
      val2 = parseInt(parsed[4]),
      val3 = parseInt(parsed[6]);
  return [parsed[1], parsed[3] == "%" ? val1 / 100 * maxValues[0] : val1, parsed[5] == "%" ? val2 / 100 * maxValues[1] : val2, parsed[7] == "%" ? val3 / 100 * maxValues[2] : val3, parseFloat(parsed[8]) || undefined];
}
/**
  * @desc convert object / string input to color if necessary
  * @param {Object | String | color} value - color instance, object (hsv, hsl or rgb), string (hsl, rgb, hex)
  * @return {color} color instance
*/

function getColor(value) {
  return value instanceof color ? value : new color(value);
}
/**
  * @desc clamp value between min and max
  * @param {Number} value
  * @param {Number} min
  * @param {Number} max
  * @return {Number}
*/

function clamp(value, min, max) {
  return value <= min ? min : value >= max ? max : value;
}
/**
  * @desc compare values between two objects, returns a object representing changes with true/false values
  * @param {Object} a
  * @param {Object} b
  * @return {Object}
*/

function compareObjs(a, b) {
  var changes = {};

  for (var key in a) { changes[key] = b[key] != a[key]; }

  return changes;
}
var color = function color(value) {
  // The watch callback function for this color will be stored here
  this._onChange = false; // The default color value

  this._value = {
    h: undefined,
    s: undefined,
    v: undefined
  };
  if (value) { this.set(value); }
};

var prototypeAccessors = { hsv: { configurable: true },rgb: { configurable: true },hsl: { configurable: true },rgbString: { configurable: true },hexString: { configurable: true },hslString: { configurable: true } };
/**
  * @desc mix two colors
  * @param {Object | String | color} color1 - color instance, object (hsv, hsl or rgb), string (hsl, rgb, hex)
  * @param {Object | String | color} color2 - color instance, object (hsv, hsl or rgb), string (hsl, rgb, hex)
  * @param {Number} weight - closer to 0 = more color1, closer to 100 = more color2
  * @return {color} color instance
*/


color.mix = function mix (color1, color2, weight) {
  var rgb1 = getColor(color1).rgb,
      rgb2 = getColor(color2).rgb;
  weight = clamp(weight / 100 || 0.5, 0, 1);
  return new color({
    r: floor(rgb1.r + (rgb2.r - rgb1.r) * weight),
    g: floor(rgb1.g + (rgb2.g - rgb1.g) * weight),
    b: floor(rgb1.b + (rgb2.b - rgb1.b) * weight)
  });
};
/**
  * @desc lighten color by amount
  * @param {Object | String | color} color - color instance, object (hsv, hsl or rgb), string (hsl, rgb, hex)
  * @param {Number} amount
  * @return {color} color instance
*/


color.lighten = function lighten (color, amount) {
  var col = getColor(color),
      hsv = col.hsv;
  hsv.v = clamp(hsv.v + amount, 0, 100);
  col.hsv = hsv;
  return col;
};
/**
  * @desc darken color by amount
  * @param {Object | String | color} color - color instance, object (hsv, hsl or rgb), string (hsl, rgb, hex)
  * @param {Number} amount
  * @return {color} color instance
*/


color.darken = function darken (color, amount) {
  var col = getColor(color),
      hsv = col.hsv;
  hsv.v = clamp(hsv.v - amount, 0, 100);
  col.hsv = hsv;
  return col;
};
/**
  * @desc convert hsv object to rgb
  * @param {Object} hsv - hsv object
  * @return {Object} rgb object
*/


color.hsv2Rgb = function hsv2Rgb (hsv) {
  var r, g, b, i, f, p, q, t;
  var h$$1 = hsv.h / 360,
      s = hsv.s / 100,
      v = hsv.v / 100;
  i = floor(h$$1 * 6);
  f = h$$1 * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v, g = t, b = p;
      break;

    case 1:
      r = q, g = v, b = p;
      break;

    case 2:
      r = p, g = v, b = t;
      break;

    case 3:
      r = p, g = q, b = v;
      break;

    case 4:
      r = t, g = p, b = v;
      break;

    case 5:
      r = v, g = p, b = q;
      break;
  }

  return {
    r: round(r * 255),
    g: round(g * 255),
    b: round(b * 255)
  };
};
/**
  * @desc convert rgb object to hsv
  * @param {Object} rgb - rgb object
  * @return {Object} hsv object
*/


color.rgb2Hsv = function rgb2Hsv (rgb) {
  var r = rgb.r / 255,
      g = rgb.g / 255,
      b = rgb.b / 255,
      max = Math.max(r, g, b),
      min = Math.min(r, g, b),
      delta = max - min,
      hue;

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
    h: hue * 360,
    s: max == 0 ? 0 : delta / max * 100,
    v: max * 100
  };
};
/**
  * @desc convert hsv object to hsl
  * @param {Object} hsv - hsv object
  * @return {Object} hsl object
*/


color.hsv2Hsl = function hsv2Hsl (hsv) {
  var s = hsv.s / 100,
      v = hsv.v / 100;
  var l = 0.5 * v * (2 - s);
  s = v * s / (1 - Math.abs(2 * l - 1));
  return {
    h: hsv.h,
    s: s * 100 || 0,
    l: l * 100
  };
};
/**
  * @desc convert hsl object to hsv
  * @param {Object} hsl - hsl object
  * @return {Object} hsv object
*/


color.hsl2Hsv = function hsl2Hsv (hsl) {
  var s = hsl.s / 100,
      l = hsl.l / 100;
  l *= 2;
  s *= l <= 1 ? l : 2 - l;
  return {
    h: hsl.h,
    s: 2 * s / (l + s) * 100,
    v: (l + s) / 2 * 100
  };
};
/**
  * @desc convert hsl object to string
  * @param {Object} hsl - hsl object
  * @return {Object} hsl string
*/


color.hsl2Str = function hsl2Str (hsl) {
  return "hsl" + (hsl.a ? "a" : "") + "(" + hsl.h + ", " + hsl.s + "%, " + hsl.l + "%" + (hsl.a ? ", " + hsl.a : "") + ")";
};
/**
  * @desc convert rgb object to string
  * @param {Object} rgb - rgb object
  * @return {Object} rgb string
*/


color.rgb2Str = function rgb2Str (rgb) {
  return "rgb" + (rgb.a ? "a" : "") + "(" + rgb.r + ", " + rgb.g + ", " + rgb.b + (rgb.a ? ", " + rgb.a : "") + ")";
};
/**
  * @desc convert rgb object to hex string
  * @param {Object} rgb - rgb object
  * @return {Object} hex string
*/


color.rgb2Hex = function rgb2Hex (rgb) {
  var str = "#";
  str += rgb.r.toString(16).padStart(2, "0");
  str += rgb.g.toString(16).padStart(2, "0");
  str += rgb.b.toString(16).padStart(2, "0");
  return str;
};
/**
  * @desc parse hex string
  * @param {String} hex - color string
  * @return {Object} rgb object
*/


color.parseHexStr = function parseHexStr (hex) {
  // Strip any "#" characters
  hex = hex.replace("#", ""); // Prefix the hex string with "0x" which indicates a number in hex notation, then convert to an integer

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
};
/**
  * @desc parse hsl string
  * @param {String} str - color string
  * @return {Object} hsl object
*/


color.parseHslStr = function parseHslStr (str) {
  var parsed = parseColorStr(str, [360, 100, 100]);
  return {
    h: parsed[2],
    s: parsed[3],
    l: parsed[4]
  };
};
/**
  * @desc parse rgb string
  * @param {String} str - color string
  * @return {Object} rgb object
*/


color.parseRgbStr = function parseRgbStr (str) {
  var parsed = parseColorStr(str, [255, 255, 255]);
  return {
    r: parsed[1],
    g: parsed[2],
    b: parsed[3]
  };
};

prototypeAccessors.hsv.get = function () {
  // _value is cloned to allow changes to be made to the values before passing them back
  var v = this._value;
  return {
    h: v.h,
    s: v.s,
    v: v.v
  };
};

prototypeAccessors.hsv.set = function (newValue) {
  // If this color is being watched for changes we need to compare the new and old values to check the difference
  // Otherwise we can just be lazy
  if (this._onChange) {
    var oldValue = this._value;

    for (var channel in oldValue) {
      if (!newValue.hasOwnProperty(channel)) { newValue[channel] = oldValue[channel]; }
    }

    var changes = compareObjs(oldValue, newValue); // Update the old value

    this._value = newValue; // If the value has changed, call hook callback

    if (changes.h || changes.s || changes.v) { this._onChange(this, changes); }
  } else {
    this._value = newValue;
  }
};

prototypeAccessors.rgb.get = function () {
  var rgb = color.hsv2Rgb(this._value);
  return {
    r: round(rgb.r),
    g: round(rgb.g),
    b: round(rgb.b)
  };
};

prototypeAccessors.rgb.set = function (value) {
  this.hsv = color.rgb2Hsv(value);
};

prototypeAccessors.hsl.get = function () {
  var hsl = color.hsv2Hsl(this._value);
  return {
    h: round(hsl.h),
    s: round(hsl.s),
    l: round(hsl.l)
  };
};

prototypeAccessors.hsl.set = function (value) {
  this.hsv = color.hsl2Hsv(value);
};

prototypeAccessors.rgbString.get = function () {
  return color.rgb2Str(this.rgb);
};

prototypeAccessors.rgbString.set = function (value) {
  this.rgb = color.parseRgbStr(value);
};

prototypeAccessors.hexString.get = function () {
  return color.rgb2Hex(this.rgb);
};

prototypeAccessors.hexString.set = function (value) {
  this.rgb = color.parseHexStr(value);
};

prototypeAccessors.hslString.get = function () {
  return color.hsl2Str(this.hsl);
};

prototypeAccessors.hslString.set = function (value) {
  this.hsl = color.parseHslStr(value);
};
/**
  * @desc set the color from any valid value
  * @param {Object | String | color} value - color instance, object (hsv, hsl or rgb), string (hsl, rgb, hex)
*/


color.prototype.set = function set (value) {
  if (typeof value == "object") {
    if (value instanceof color) {
      this.hsv = color._value;
    } else if ("r" in value) {
      this.rgb = value;
    } else if ("v" in value) {
      this.hsv = value;
    } else if ("l" in value) {
      this.hsl = value;
    }
  } else if (typeof value == "string") {
    if (/^rgb/.test(value)) {
      this.rgbString = value;
    } else if (/^hsl/.test(value)) {
      this.hslString = value;
    } else if (/^#[0-9A-Fa-f]/.test(value)) {
      this.hexString = value;
    }
  }
};
/**
  * @desc shortcut to set a specific channel value
  * @param {String} model - hsv | hsl | rgb
  * @param {String} channel - individual channel to set, for example if model = hsl, chanel = h | s | l
  * @param {Number} value - new value for the channel
*/


color.prototype.setChannel = function setChannel (model, channel, value) {
  var v = this[model];
  v[channel] = value;
  this[model] = v;
};
/**
  * @desc make new color instance with the same value as this one
  * @return {color}
*/


color.prototype.clone = function clone () {
  return new color(this);
};
/**
  * @desc compare this color against another, returns a object representing changes with true/false values
  * @param {Object | String | color} color - color to compare against
  * @param {String} model - hsv | hsl | rgb
  * @return {Object}
*/


color.prototype.compare = function compare (color, model) {
  model = model || "hsv";
  return compareObjs(this[model], getColor(color)[model]);
};
/**
  * @desc mix a color into this one
  * @param {Object | String | color} color - color instance, object (hsv, hsl or rgb), string (hsl, rgb, hex)
  * @param {Number} weight - closer to 0 = more current color, closer to 100 = more new color
*/


color.prototype.mix = function mix (color, weight) {
  this.hsv = color.mix(this, color, weight).hsv;
};
/**
  * @desc lighten color by amount
  * @param {Number} amount
*/


color.prototype.lighten = function lighten (amount) {
  color.lighten(this, amount);
};
/**
  * @desc darken color by amount
  * @param {Number} amount
*/


color.prototype.darken = function darken (amount) {
  color.darken(this, amount);
};

Object.defineProperties( color.prototype, prototypeAccessors );

var IroSlider = (function (IroComponent$$1) {
  function IroSlider () {
    IroComponent$$1.apply(this, arguments);
  }

  if ( IroComponent$$1 ) IroSlider.__proto__ = IroComponent$$1;
  IroSlider.prototype = Object.create( IroComponent$$1 && IroComponent$$1.prototype );
  IroSlider.prototype.constructor = IroSlider;

  IroSlider.prototype.render = function render$$1 (props) {
    var this$1 = this;

    var width = 300;
    var height = props.sliderHeight;
    var hsv = props.hsv;
    var hsl = color.hsv2Hsl({
      h: hsv.h,
      s: hsv.s,
      v: 100
    });
    return h("svg", {
      class: "iro__slider",
      x: props.x,
      y: props.y,
      ref: function (el) { return this$1.root = el; }
    }, h("defs", null, h("linearGradient", {
      id: "iroGradient1"
    }, h("stop", {
      offset: "0%",
      "stop-color": "#000"
    }), h("stop", {
      offset: "100%",
      "stop-color": ("hsl(" + (hsl.h) + ", " + (hsl.s) + "%, " + (hsl.v) + "%)")
    }))), h("rect", {
      class: "iro__slider__value",
      rx: height / 2,
      ry: height / 2,
      x: 0,
      y: 0,
      width: width,
      height: height,
      "stroke-width": props.borderWidth,
      stroke: props.borderColor,
      fill: "url(#iroGradient1)",
      vectorEffect: "non-scaling-stroke"
    }), h(IroMarker, {
      r: props.markerRadius,
      x: hsv.v / 100 * width,
      y: height / 2
    }));
  };
  /**
    * @desc Takes a point at (x, y) and returns HSV values based on this input -- use this to update a color from mouse input
    * @param {Number} x - point x coordinate
    * @param {Number} y - point y coordinate
    * @return {Object} - new HSV color values (some channels may be missing)
  */


  IroSlider.prototype.input = function input (x, y, rect, type) {
    x = x - rect.left;
    y = y - rect.top;
    var opts = this.props;
    var range = opts.width;
    var dist = Math.max(Math.min(x, range.max), range.min) - range.min;
    return {
      v: Math.round(100 / range.w * dist)
    };
  };

  return IroSlider;
}(IroComponent));

var stylesheet = function stylesheet() {
  // Create a new style element
  var style = document.createElement("style");
  document.head.appendChild(style); // Webkit apparently requires a text node to be inserted into the style element
  // (according to https://davidwalsh.name/add-rules-stylesheets)

  style.appendChild(document.createTextNode(""));
  this.style = style; // Create a reference to the style element's CSSStyleSheet object
  // CSSStyleSheet API: https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet

  var sheet = style.sheet;
  this.sheet = sheet; // Get a reference to the sheet's CSSRuleList object
  // CSSRuleList API: https://developer.mozilla.org/en-US/docs/Web/API/CSSRuleList

  this.rules = sheet.rules || sheet.cssRules; // We'll store references to all the CSSStyleDeclaration objects that we change here, keyed by the CSS selector they belong to
  // CSSStyleDeclaration API: https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration

  this.map = {};
};

var prototypeAccessors$1 = { enabled: { configurable: true },cssText: { configurable: true },css: { configurable: true } };
/**
  * @desc Set a specific rule for a given selector
  * @param {String} selector - the CSS selector for this rule (e.g. "body", ".class", "#id")
  * @param {String} property - the CSS property to set (e.g. "background-color", "font-family", "z-index")
  * @param {String} value  - the new value for the rule (e.g. "rgb(255, 255, 255)", "Helvetica", "99")
*/


stylesheet.prototype.setRule = function setRule (selector, property, value) {
  var sheet = this.sheet;
  var rules = sheet.rules || sheet.cssRules;
  var map = this.map; // Convert property from camelCase to snake-case

  property = property.replace(/([A-Z])/g, function ($1) {
    return "-" + $1.toLowerCase();
  });

  if (!map.hasOwnProperty(selector)) {
    // If the selector hasn't been used yet we want to insert the rule at the end of the CSSRuleList, so we use its length as the index value
    var index = rules.length; // Prepare the rule declaration text, since both insertRule and addRule take this format

    var declaration = property + ": " + value; // Insert the new rule into the stylesheet

    try {
      // Some browsers only support insertRule, others only support addRule, so we have to use both
      sheet.insertRule(selector + " {" + declaration + ";}", index);
    } catch (e) {
      sheet.addRule(selector, declaration, index);
    } finally {
      // Because safari is perhaps the worst browser in all of history, we have to remind it to keep the sheet rules up-to-date
      rules = sheet.rules || sheet.cssRules; // Add our newly inserted rule's CSSStyleDeclaration object to the internal map

      map[selector] = rules[index].style;
    }
  } else {
    map[selector].setProperty(property, value);
  }
};

prototypeAccessors$1.enabled.get = function () {
  return !this.sheet.disabled;
};

var ColorPicker = (function (Component$$1) {
  function ColorPicker(props) {
    Component$$1.call(this, props);
    this._events = {};
    this._colorChangeActive = false;
    this.css = props.css || props.styles || undefined;
    this.color = new color(props.color);
    this.state = {
      hsv: {
        h: 0,
        s: 0,
        v: 0
      }
    };
    this.components = [IroWheel, IroSlider];
  }

  if ( Component$$1 ) ColorPicker.__proto__ = Component$$1;
  ColorPicker.prototype = Object.create( Component$$1 && Component$$1.prototype );
  ColorPicker.prototype.constructor = ColorPicker;

  ColorPicker.prototype.componentDidMount = function componentDidMount () {
    // Create an iroStyleSheet for this colorWheel's CSS overrides
    this.stylesheet = new stylesheet();
    this.emit("mount", this);
  };

  ColorPicker.prototype.componentWillUnmount = function componentWillUnmount () {};
  /**
    * @desc update the selected color
    * @param {Object} hsv - new hsv value
    * @access protected
  */


  ColorPicker.prototype.setHsv = function setHsv (hsv, changes) {
    var this$1 = this;

    this.color.hsv = hsv;
    this.setState({
      hsv: hsv
    });
    var rgb = this.color.rgbString;
    var css = this.css;

    for (var selector in css) {
      var properties = css[selector];

      for (var prop in properties) {
        this$1.stylesheet.setRule(selector, prop, rgb);
      }
    } // Prevent infinite loops if the color is set inside a `color:change` callback


    if (!this._colorChangeActive) {
      // While _colorChangeActive = true, this event cannot be fired
      this._colorChangeActive = true;
      this.emit("color:change", this.color);
      this._colorChangeActive = false;
    }
  };
  /**
    * @desc Set a callback function for an event
    * @param {String} eventType Name of the event to listen to, pass "*" to listen to all events
    * @param {Function} callback Event callback
  */


  ColorPicker.prototype.on = function on (eventType, callback) {
    var events = this._events;
    (events[eventType] || (events[eventType] = [])).push(callback);
  };
  /**
    * @desc Remove a callback function for an event added with on()
    * @param {String} eventType The name of the event
    * @param {Function} callback The watch callback to remove from the event
  */


  ColorPicker.prototype.off = function off (eventType, callback) {
    var eventList = this._events[eventType];
    if (eventList) { eventList.splice(eventList.indexOf(callback), 1); }
  };
  /**
    * @desc Emit an event
    * @param {String} eventType The name of the event to emit
    * @param {Array} args array of args to pass to callbacks
  */


  ColorPicker.prototype.emit = function emit (eventType) {
    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

    var events = this._events,
        callbackList = (events[eventType] || []).concat(events["*"] || []);

    for (var i = 0; i < callbackList.length; i++) {
      callbackList[i].apply(null, args);
    }
  };

  ColorPicker.prototype.render = function render$$1 (props, state) {
    var this$1 = this;

    return h("svg", {
      class: "iro__svg",
      width: props.width,
      height: props.height,
      viewBox: ("0 0 " + (props.width) + " " + (props.height)),
      style: {
        "display": props.display || "block",
        "touch-action": "none"
      },
      ref: function (el) { return this$1.el = el; }
    }, h("defs", null), h(IroWheel, _extends({
      hsv: state.hsv,
      x: 0,
      y: 0,
      radius: 100,
      rMax: 100,
      onChange: function () {
        console.log('aaa');
      }
    }, props)));
  };

  return ColorPicker;
}(Component));
ColorPicker.defaultProps = {
  width: 300,
  height: 300,
  markerRadius: 8,
  borderColor: "#fff",
  borderWidth: 0,
  anticlockwise: false,
  sliderHeight: 24,
  sliderMargin: 8
};

var index = {
  Color: color,
  ColorPicker: function (el, props) {
    return render(h(ColorPicker, null), document.querySelector(el))._component;
  },
  Stylesheet: stylesheet,
  ui: {
    Marker: IroMarker,
    Slider: IroSlider,
    Wheel: IroWheel
  },
  version: "4.0.0-alpha"
};

export default index;
