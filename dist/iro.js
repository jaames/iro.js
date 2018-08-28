/*!
 * iro.js v3.5.1
 * 2016-2018 James Daniel
 * Released under the MIT License
 * github.com/jaames/iro.js
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.iro = factory());
}(this, (function () { 'use strict';

  // css class prefix for this element
  var CLASS_PREFIX = "iro__marker";
  var marker = function marker(svg, opts) {
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
  };
  /**
    * @desc move marker to centerpoint (x, y) and redraw
    * @param {Number} x - point x coordinate
    * @param {Number} y - point y coordinate
  */


  marker.prototype.move = function move (x, y) {
    this.g.setTransform("translate", [x, y]);
  };

  var CLASS_PREFIX$1 = "iro__wheel"; // Quick references to reused math functions

  var PI = Math.PI,
      sqrt = Math.sqrt,
      abs = Math.abs,
      round = Math.round;
  var wheel = function wheel(svg, opts) {
    this._opts = opts;
    this.type = "wheel";
    var cY = opts.cY,
        cX = opts.cX,
        r = opts.r,
        border = opts.border;
    var baseGroup = svg.g({
      class: CLASS_PREFIX$1
    });
    baseGroup.circle(cX, cY, r + border.w / 2, {
      class: CLASS_PREFIX$1 + "__border",
      fill: "#fff",
      stroke: border.color,
      strokeWidth: border.w
    });
    var ringGroup = baseGroup.g({
      class: CLASS_PREFIX$1 + "__hue",
      strokeWidth: r,
      fill: "none"
    });

    for (var hue = 0; hue < 360; hue++) {
      ringGroup.arc(cX, cY, r / 2, hue, hue + 1.5, {
        stroke: "hsl(" + (opts.anticlockwise ? 360 - hue : hue) + ",100%,50%)"
      });
    }

    var saturation = baseGroup.circle(cX, cY, r, {
      class: CLASS_PREFIX$1 + "__saturation"
    });
    saturation.setGradient("fill", svg.gradient("radial", {
      0: {
        color: "#fff"
      },
      100: {
        color: "#fff",
        opacity: 0
      }
    }));
    this._lightness = baseGroup.circle(cX, cY, r, {
      class: CLASS_PREFIX$1 + "__lightness",
      opacity: 0
    });
    this.marker = new marker(baseGroup, opts.marker);
  };
  /**
    * @desc updates this element to represent a new color value
    * @param {Object} color - an iroColor object with the new color value
    * @param {Object} changes - an object that gives a boolean for each HSV channel, indicating whether ot not that channel has changed
  */


  wheel.prototype.update = function update (color, changes) {
    var opts = this._opts;
    var hsv = color.hsv; // If the V channel has changed, redraw the wheel UI with the new value

    if (changes.v && opts.lightness) {
      this._lightness.setAttrs({
        opacity: (1 - hsv.v / 100).toFixed(2)
      });
    } // If the H or S channel has changed, move the marker to the right position


    if (changes.h || changes.s) {
      // convert the hue value to radians, since we'll use it as an angle
      var hueAngle = (opts.anticlockwise ? 360 - hsv.h : hsv.h) * (PI / 180); // convert the saturation value to a distance between the center of the ring and the edge

      var dist = hsv.s / 100 * opts.rMax; // Move the marker based on the angle and distance

      this.marker.move(opts.cX + dist * Math.cos(hueAngle), opts.cY + dist * Math.sin(hueAngle));
    }
  };
  /**
    * @desc Takes a point at (x, y) and returns HSV values based on this input -- use this to update a color from mouse input
    * @param {Number} x - point x coordinate
    * @param {Number} y - point y coordinate
    * @return {Object} - new HSV color values (some channels may be missing)
  */


  wheel.prototype.input = function input (x, y) {
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
    hue = opts.anticlockwise ? 360 - hue : hue; // Return just the H and S channels, the wheel element doesn't do anything with the L channel

    return {
      h: hue,
      s: round(100 / rangeMax * dist)
    };
  };
  /**
    * @desc Check if a point at (x, y) is inside this element
    * @param {Number} x - point x coordinate
    * @param {Number} y - point y coordinate
    * @return {Boolean} - true if the point is a "hit", else false
  */


  wheel.prototype.checkHit = function checkHit (x, y) {
    var opts = this._opts; // Check if the point is within the hue ring by comparing the point's distance from the centre to the ring's radius
    // If the distance is smaller than the radius, then we have a hit

    var dx = abs(x - opts.cX),
        dy = abs(y - opts.cY);
    return sqrt(dx * dx + dy * dy) < opts.r;
  };

  var round$1 = Math.round;
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
    var h = hsv.h / 360,
        s = hsv.s / 100,
        v = hsv.v / 100;
    i = floor(h * 6);
    f = h * 6 - i;
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
      r: round$1(r * 255),
      g: round$1(g * 255),
      b: round$1(b * 255)
    };
  };
  /**
    * @desc convert rgb object to hsv
    * @param {Object} rgb - rgb object
    * @return {Object} hsv object
  */


  color.rgb2Hsv = function rgb2Hsv (rgb) {
    // Modified from https://github.com/bgrins/TinyColor/blob/master/tinycolor.js#L446
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
    * @param {String} str - color string
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
      r: round$1(rgb.r),
      g: round$1(rgb.g),
      b: round$1(rgb.b)
    };
  };

  prototypeAccessors.rgb.set = function (value) {
    this.hsv = color.rgb2Hsv(value);
  };

  prototypeAccessors.hsl.get = function () {
    var hsl = color.hsv2Hsl(this._value);
    return {
      h: round$1(hsl.h),
      s: round$1(hsl.s),
      l: round$1(hsl.l)
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
        this.hsv = color.hsv;
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


  color.prototype.mix = function mix$1 (color, weight) {
    this.hsv = mix(this, color, weight).hsv;
  };
  /**
    * @desc lighten color by amount
    * @param {Number} amount
  */


  color.prototype.lighten = function lighten$1 (amount) {
    lighten(this, amount);
  };
  /**
    * @desc darken color by amount
    * @param {Number} amount
  */


  color.prototype.darken = function darken$1 (amount) {
    darken(this, amount);
  };

  Object.defineProperties( color.prototype, prototypeAccessors );

  var CLASS_PREFIX$2 = "iro__slider";
  var slider = function slider(svg, opts) {
    var r = opts.r,
        w = opts.w,
        h = opts.h,
        x = opts.x,
        y = opts.y,
        borderWidth = opts.border.w; // "range" limits how far the slider's marker can travel, and where it stops and starts along the X axis

    opts.range = {
      min: x + r,
      max: x + w - r,
      w: w - r * 2
    };
    opts.sliderType = opts.sliderType || "v";
    this.type = "slider";
    this._opts = opts;
    var radius = r + borderWidth / 2;
    var baseGroup = svg.g({
      class: CLASS_PREFIX$2
    });
    var rect = baseGroup.insert("rect", {
      class: CLASS_PREFIX$2 + "__value",
      rx: radius,
      ry: radius,
      x: x - borderWidth / 2,
      y: y - borderWidth / 2,
      width: w + borderWidth,
      height: h + borderWidth,
      strokeWidth: borderWidth,
      stroke: opts.border.color
    });
    rect.setGradient("fill", svg.gradient("linear", {
      0: {
        color: "#000"
      },
      100: {
        color: "#fff"
      }
    }));
    this._gradient = rect.gradient;
    this.marker = new marker(baseGroup, opts.marker);
  };
  /**
    * @desc updates this element to represent a new color value
    * @param {Object} color - an iroColor object with the new color value
    * @param {Object} changes - an object that gives a boolean for each HSV channel, indicating whether ot not that channel has changed
  */


  slider.prototype.update = function update (color$$1, changes) {
    var opts = this._opts;
    var range = opts.range;
    var hsv = color$$1.hsv;
    var hsl = color.hsv2Hsl({
      h: hsv.h,
      s: hsv.s,
      v: 100
    });

    if (opts.sliderType == "v") {
      if (changes.h || changes.s) {
        this._gradient.stops[1].setAttrs({
          stopColor: "hsl(" + hsl.h + "," + hsl.s + "%," + hsl.l + "%)"
        });
      }

      if (changes.v) {
        var percent = hsv.v / 100;
        this.marker.move(range.min + percent * range.w, opts.y + opts.h / 2);
      }
    }
  };
  /**
    * @desc Takes a point at (x, y) and returns HSV values based on this input -- use this to update a color from mouse input
    * @param {Number} x - point x coordinate
    * @param {Number} y - point y coordinate
    * @return {Object} - new HSV color values (some channels may be missing)
  */


  slider.prototype.input = function input (x, y) {
    var opts = this._opts;
    var range = opts.range;
    var dist = Math.max(Math.min(x, range.max), range.min) - range.min;
    return {
      v: Math.round(100 / range.w * dist)
    };
  };
  /**
    * @desc Check if a point at (x, y) is inside this element
    * @param {Number} x - point x coordinate
    * @param {Number} y - point y coordinate
    * @return {Boolean} - true if the point is a "hit", else false
  */


  slider.prototype.checkHit = function checkHit (x, y) {
    var opts = this._opts;
    return x > opts.x && x < opts.x + opts.w && y > opts.y && y < opts.y + opts.h;
  };

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
  }; // TODO: figure out why these aren't being compressed properly?

  var SVG_TRANSFORM_SHORTHANDS = {
    translate: "setTranslate",
    scale: "setScale",
    rotate: "setRotate"
  }; // sniff useragent string to check if the user is running IE, Edge or Safari

  var ua = window.navigator.userAgent.toLowerCase();
  var IS_IE = /msie|trident|edge/.test(ua);
  var IS_SAFARI = /^((?!chrome|android).)*safari/i.test(ua);

  var svgElement = function svgElement(root, parent, type, attrs) {
    var el = document.createElementNS(SVG_NAMESPACE, type);
    this.el = el;
    this.setAttrs(attrs);
    (parent.el || parent).appendChild(el);
    this._root = root;
    this._svgTransforms = {};
    this._transformList = el.transform ? el.transform.baseVal : false;
  };
  /**
    * @desc insert a new svgElement
    * @param {String} type - element tag name
    * @param {Object} attrs - element attributes
  */


  svgElement.prototype.insert = function insert (type, attrs) {
    return new svgElement(this._root, this, type, attrs);
  };
  /**
    * @desc shorthand to insert a new group svgElement
    * @param {Object} attrs - element attributes
  */


  svgElement.prototype.g = function g (attrs) {
    return this.insert("g", attrs);
  };
  /**
    * @desc shorthand to insert a new arc svgElement
    * @param {Number} cx - arc center x
    * @param {Number} cy - arc center y
    * @param {Number} radius - arc radius
    * @param {Number} startAngle - arc start angle (in degrees)
    * @param {Number} endAngle - arc end angle (in degrees)
    * @param {Object} attrs - element attributes
  */


  svgElement.prototype.arc = function arc (cx, cy, radius, startAngle, endAngle, attrs) {
    var largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    startAngle *= Math.PI / 180;
    endAngle *= Math.PI / 180;
    var x1 = cx + radius * Math.cos(endAngle),
        y1 = cy + radius * Math.sin(endAngle),
        x2 = cx + radius * Math.cos(startAngle),
        y2 = cy + radius * Math.sin(startAngle);
    attrs = attrs || {};
    attrs.d = ["M", x1, y1, "A", radius, radius, 0, largeArcFlag, 0, x2, y2].join(" ");
    return this.insert("path", attrs);
  };
  /**
    * @desc shorthand to insert a new circle svgElement
    * @param {Number} cx - circle center x
    * @param {Number} cy - circle center y
    * @param {Number} radius - circle radius
    * @param {Object} attrs - element attributes
  */


  svgElement.prototype.circle = function circle (cx, cy, radius, attrs) {
    attrs = attrs || {};
    attrs.cx = cx;
    attrs.cy = cy;
    attrs.r = radius;
    return this.insert("circle", attrs);
  };
  /**
    * @desc set a rotate/translate/scale transform on this element
    * @param {String} type - transform (rotate | translate | scale)
    * @param {Array} args - transform values
  */


  svgElement.prototype.setTransform = function setTransform (type, args) {
    if (!IS_IE) {
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
    } else {
      // Microsoft still can't make a web browser that actually works, as such, Edge + IE dont implement SVG transforms properly.
      // We have to force them instead... geez
      this.setAttrs({
        "transform": type + "(" + args.join(", ") + ")"
      });
    }
  };
  /**
    * @desc set attributes on this element
    * @param {Object} attrs - element attributes
  */


  svgElement.prototype.setAttrs = function setAttrs (attrs) {
      var this$1 = this;

    for (var attr in attrs) {
      var name = attr in SVG_ATTRIBUTE_SHORTHANDS ? SVG_ATTRIBUTE_SHORTHANDS[attr] : attr;
      this$1.el.setAttribute(name, attrs[attr]);
    }
  };

  svgElement.prototype.setGradient = function setGradient (attr, gradient) {
    var attrs = {};
    attrs[attr] = gradient.getUrl();
    gradient._refs[attr] = this;
    this.gradient = gradient;
    this.setAttrs(attrs);
  };

  var svgGradient = function svgGradient(root, type, stops) {
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
    this.stops = stopElements;
    this._refs = {};
  };

  svgGradient.prototype.getUrl = function getUrl (base) {
    var root = IS_SAFARI ? base || window.location.href : "";
    return "url(" + root + "#" + this.el.id + ")";
  };

  var svgRoot = (function (svgElement) {
    function svgRoot(parent, width, height, display) {
      svgElement.call(this, null, parent, "svg", {
        width: width,
        height: height,
        style: "display:" + (display || "block") + ";touch-action:none"
      });
      this._root = this;
      this._defs = this.insert("defs");
      this._gradients = [];
    }

    if ( svgElement ) svgRoot.__proto__ = svgElement;
    svgRoot.prototype = Object.create( svgElement && svgElement.prototype );
    svgRoot.prototype.constructor = svgRoot;

    svgRoot.prototype.gradient = function gradient (type, stops) {
      var gradient = new svgGradient(this, type, stops);

      this._gradients.push(gradient);

      return gradient;
    };

    svgRoot.prototype.updateUrls = function updateUrls (base) {
      if (IS_SAFARI) {
        var gradients = this._gradients;

        for (var i = 0; i < gradients.length; i++) {
          for (var key in gradients[i]._refs) {
            var attrs = {};
            attrs[key] = gradients[i].getUrl(base);

            gradients[i]._refs[key].setAttrs(attrs);
          }
        }
      }
    };

    return svgRoot;
  }(svgElement));

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

  prototypeAccessors$1.enabled.get = function () {
    return !this.sheet.disabled;
  };

  prototypeAccessors$1.enabled.set = function (value) {
    this.sheet.disabled = !value;
  }; // TODO: consider removing cssText + css properties since i don't tink they're that useful


  prototypeAccessors$1.cssText.get = function () {
    var map = this.map;
    var ret = [];

    for (var selector in map) {
      ret.push(selector.replace(/,\W/g, ",\n") + " {\n\t" + map[selector].cssText.replace(/;\W/g, ";\n\t") + "\n}");
    }

    return ret.join("\n");
  };

  prototypeAccessors$1.css.get = function () {
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
  };
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

  Object.defineProperties( stylesheet.prototype, prototypeAccessors$1 );

  var EVENT_MOUSEDOWN = "mousedown",
        EVENT_MOUSEMOVE = "mousemove",
        EVENT_MOUSEUP = "mouseup",
        EVENT_TOUCHSTART = "touchstart",
        EVENT_TOUCHMOVE = "touchmove",
        EVENT_TOUCHEND = "touchend",
        EVENT_READYSTATE_CHANGE = "readystatechange",
        READYSTATE_COMPLETE = "complete";
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
  /**
    * @desc call fn callback when the page document is ready
    * @param {Function} callback callback function to be called
  */

  function whenReady(callback) {
    if (document.readyState == READYSTATE_COMPLETE) {
      callback();
    } else {
      listen(document, [EVENT_READYSTATE_CHANGE], function stateChange(e) {
        if (document.readyState == READYSTATE_COMPLETE) {
          callback();
          unlisten(document, [EVENT_READYSTATE_CHANGE], stateChange);
        }
      });
    }
  }
  var colorPicker = function colorPicker(el, opts) {
    var this$1 = this;

    opts = opts || {}; // event storage for `on` and `off`

    this._events = {};
    this._mouseTarget = false;
    this._colorChangeActive = false;
    this.css = opts.css || opts.styles || undefined; // Wait for the document to be ready, then mount the UI

    whenReady(function () {
      this$1._mount(el, opts);
    });
  };
  /**
    * @desc mount the color picker UI into the DOM
    * @param {Element | String} el - a DOM element or the CSS selector for a DOM element to use as a container for the UI
    * @param {Object} opts - options for this instance
    * @access protected
  */


  colorPicker.prototype._mount = function _mount (el, opts) {
      var this$1 = this;

    // If `el` is a string, use it to select an Element, else assume it's an element
    el = "string" == typeof el ? document.querySelector(el) : el; // Find the width and height for the UI
    // If not defined in the options, try the HTML width + height attributes of the wrapper, else default to 320

    var width = opts.width || parseInt(el.width) || 320;
    var height = opts.height || parseInt(el.height) || 320; // Calculate layout variables

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
    }; // Create UI elements

    this.el = el;
    this.svg = new svgRoot(el, width, height, opts.display);
    this.ui = [new wheel(this.svg, {
      cX: leftMargin + bodyWidth / 2,
      cY: bodyWidth / 2,
      r: wheelRadius,
      rMax: wheelRadius - (markerRadius + padding),
      marker: marker,
      border: borderStyles,
      lightness: opts.wheelLightness == undefined ? true : opts.wheelLightness,
      anticlockwise: opts.anticlockwise
    }), new slider(this.svg, {
      sliderType: "v",
      x: leftMargin + borderWidth,
      y: bodyWidth + sliderMargin,
      w: bodyWidth - borderWidth * 2,
      h: sliderHeight - borderWidth * 2,
      r: sliderHeight / 2 - borderWidth,
      marker: marker,
      border: borderStyles
    })]; // Create an iroStyleSheet for this colorWheel's CSS overrides

    this.stylesheet = new stylesheet(); // Create an iroColor to store this colorWheel's selected color

    this.color = new color(); // Whenever the selected color changes, trigger a colorWheel update too

    this.color._onChange = this._update.bind(this);
    this.color.set(opts.color || opts.defaultValue || "#fff"); // Hacky workaround for a couple of Safari SVG url bugs
    // See https://github.com/jaames/iro.js/issues/18
    // TODO: perhaps make this a seperate plugin, it's hacky and takes up more space than I'm happy with

    this.on("history:stateChange", function (base) {
      this$1.svg.updateUrls(base);
    }); // Listen to events

    listen(this.svg.el, [EVENT_MOUSEDOWN, EVENT_TOUCHSTART], this, {
      passive: false
    });
    this.emit("mount", this);
  };
  /**
    * @desc update the selected color
    * @param {Object} color - an iroColor object with the new color value
    * @param {Object} changes - booleans for each HSV channel: true if the new value is different to the old value, else false
    * @access protected
  */


  colorPicker.prototype._update = function _update (color$$1, changes) {
      var this$1 = this;

    var rgb = color$$1.rgbString;
    var css = this.css; // Loop through each UI element and update it

    for (var i = 0; i < this.ui.length; i++) {
      this$1.ui[i].update(color$$1, changes);
    } // Update the stylesheet too


    for (var selector in css) {
      var properties = css[selector];

      for (var prop in properties) {
        this$1.stylesheet.setRule(selector, prop, rgb);
      }
    } // Prevent infinite loops if the color is set inside a `color:change` callback


    if (!this._colorChangeActive) {
      // While _colorChangeActive = true, this event cannot be fired
      this._colorChangeActive = true;
      this.emit("color:change", color$$1, changes);
      this._colorChangeActive = false;
    }
  };
  /**
    * @desc Set a callback function for an event
    * @param {String} eventType Name of the event to listen to, pass "*" to listen to all events
    * @param {Function} callback Event callback
  */


  colorPicker.prototype.on = function on (eventType, callback) {
    var events = this._events;
    (events[eventType] || (events[eventType] = [])).push(callback);
  };
  /**
    * @desc Remove a callback function for an event added with on()
    * @param {String} eventType The name of the event
    * @param {Function} callback The watch callback to remove from the event
  */


  colorPicker.prototype.off = function off (eventType, callback) {
    var eventList = this._events[eventType];
    if (eventList) { eventList.splice(eventList.indexOf(callback), 1); }
  };
  /**
    * @desc Emit an event
    * @param {String} eventType The name of the event to emit
    * @param {Array} args array of args to pass to callbacks
  */


  colorPicker.prototype.emit = function emit (eventType) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

    var events = this._events,
        callbackList = (events[eventType] || []).concat(events["*"] || []);

    for (var i = 0; i < callbackList.length; i++) {
      callbackList[i].apply(null, args);
    }
  };
  /**
    * @desc DOM event handler
    * @param {Event} e DOM event (currently either mouse or touch events)
  */


  colorPicker.prototype.handleEvent = function handleEvent (e) {
      var this$1 = this;

    // Detect if the event is a touch event by checking if it has the `touches` property
    // If it is a touch event, use the first touch input
    var point = e.touches ? e.changedTouches[0] : e,
        // Get the screen position of the UI
    rect = this.svg.el.getBoundingClientRect(),
        // Convert the screen-space pointer position to local-space
    x = point.clientX - rect.left,
        y = point.clientY - rect.top;

    switch (e.type) {
      case EVENT_MOUSEDOWN:
      case EVENT_TOUCHSTART:
        // Loop through each UI element and check if the point "hits" it
        for (var i = 0; i < this.ui.length; i++) {
          var uiElement = this$1.ui[i]; // If the element is hit, this means the user has clicked the element and is trying to interact with it

          if (uiElement.checkHit(x, y)) {
            // Set an internal reference to the uiElement being interacted with, for other internal event handlers
            this$1._mouseTarget = uiElement; // Attach event listeners

            listen(document, [EVENT_MOUSEMOVE, EVENT_TOUCHMOVE, EVENT_MOUSEUP, EVENT_TOUCHEND], this$1, {
              passive: false
            }); // Emit input start event

            this$1.emit("input:start", this$1.color); // Finally, use the position to update the picked color

            this$1.color.hsv = this$1._mouseTarget.input(x, y);
          }
        }

        break;

      case EVENT_MOUSEMOVE:
      case EVENT_TOUCHMOVE:
        // Use the position to update the picker color
        this.color.hsv = this._mouseTarget.input(x, y);
        break;

      case EVENT_MOUSEUP:
      case EVENT_TOUCHEND:
        this._mouseTarget = false;
        this.emit("input:end", this.color);
        unlisten(document, [EVENT_MOUSEMOVE, EVENT_TOUCHMOVE, EVENT_MOUSEUP, EVENT_TOUCHEND], this);
        break;
    }

    if (this._mouseTarget) {
      e.preventDefault();
    }
  };

  var iro = {
    Color: color,
    ColorPicker: colorPicker,
    Stylesheet: stylesheet,
    version: "3.5.1"
  };

  return iro;

})));
