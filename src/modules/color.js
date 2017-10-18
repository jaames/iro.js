var round = Math.round,
    floor = Math.floor;

function hsv2Rgb(hsv) {
  var r, g, b, i, f, p, q, t;
  var h = hsv.h/360, s = hsv.s/100, v = hsv.v/100;
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }
  return {r: round(r * 255), g: round(g * 255), b: round(b * 255)};
};

function rgb2Hsv(rgb) {
  // Modified from https://github.com/bgrins/TinyColor/blob/master/tinycolor.js#L446
  var r = rgb.r / 255,
      g = rgb.g / 255,
      b = rgb.b / 255,
      max = Math.max(r, g, b),
      min = Math.min(r, g, b),
      delta = max - min,
      hue;
  switch (max) {
    case min: hue = 0; break;
    case r: hue = (g - b) / delta + (g < b ? 6 : 0); break;
    case g: hue = (b - r) / delta + 2; break;
    case b: hue = (r - g) / delta + 4; break;
  }
  hue /= 6;
  return {
    h: round(hue * 360),
    s: round(max == 0 ? 0 : (delta / max) * 100),
    v: round(max * 100)
  };
};

function hsv2Hsl(hsv) {
  var s = hsv.s / 100,
  v = hsv.v / 100;
  var p = (2 - s) * v;
  s = s == 0 ? 0 : s * v / (p < 1 ? p : 2 - p);
  return {
    h: hsv.h,
    s: round(s * 100),
    l: round(p * 50)
  };
};

function hsl2Hsv(hsl) {
  var s = hsl.s / 100,
  l = hsl.l / 100;
  l *= 2;
  s *= (l <= 1) ? l : 2 - l;
  return {
    h: hsl.h,
    s: round(((2 * s) / (l + s)) * 100),
    v: round(((l + s) / 2) * 100)
  };
};

function rgb2Str(rgb) {
  return "rgb" + (rgb.a ? "a" : "") + "(" + rgb.r + ", " + rgb.g + ", " + rgb.b + (rgb.a ? ", " + rgb.a : "") + ")";
};

function hsl2Str(hsl) {
  return "hsl" + (hsl.a ? "a" : "") + "(" + hsl.h + ", " + hsl.s + "%, " + hsl.l + "%" + (hsl.a ? ", " + hsl.a : "") + ")";
};

function rgb2Hex(rgb) {
  var r = rgb.r,
      g = rgb.g,
      b = rgb.b;
  // If each RGB channel's value is a multiple of 17, we can use HEX shorthand notation
  var useShorthand = (r % 17 == 0) && (g % 17 == 0) && (b % 17 == 0),
      // If we're using shorthand notation, divide each channel by 17
      divider = useShorthand ? 17 : 1,
      // bitLength of each channel (for example, F is 4 bits long while FF is 8 bits long)
      bitLength = useShorthand ? 4 : 8,
      // Target length of the string (ie "#FFF" or "#FFFFFF")
      strLength = useShorthand ? 4 : 7,
      // Combine the channels together into a single integer
      int = (r / divider) << (bitLength * 2) | (g / divider) << bitLength | (b / divider),
      // Convert that integer to a hex string
      str = int.toString(16);
      // Add right amount of left-padding
      return "#" + (new Array(strLength - str.length).join("0")) + str;  
};

function parseColorStr(str, maxValues) {
  var parsed = str.match(/(\S+)\((\d+)(%?)(?:\D+?)(\d+)(%?)(?:\D+?)(\d+)(%?)(?:\D+?)?([0-9\.]+?)?\)/i),
      val1 = parseInt(parsed[2]),
      val2 = parseInt(parsed[4]),
      val3 = parseInt(parsed[6]);
  return [
    parsed[1],
    parsed[3] == "%" ? val1 / 100 * maxValues[0] : val1,
    parsed[5] == "%" ? val2 / 100 * maxValues[1] : val2,
    parsed[7] == "%" ? val3 / 100 * maxValues[2] : val3,
    parseFloat(parsed[8]) || undefined
  ];
};

function parseRgbStr(str) {
  var parsed = parseColorStr(str, [255, 255, 255]);
  return {
    r: parsed[1],
    g: parsed[2],
    b: parsed[3]
  };
};

function parseHslStr(str) {
  var parsed = parseColorStr(str, [360, 100, 100]);
  return {
    h: parsed[2],
    s: parsed[3],
    l: parsed[4]
  };
};

function parseHexStr(hex) {
  // Strip any "#" characters
  hex = hex.replace("#", "");
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
    r: ((int >> (bitLength * 2)) & bitMask) * multiplier,
    g: ((int >> bitLength) & bitMask) * multiplier,
    b: (int & bitMask) * multiplier,
  };
};

/**
  * @constructor color object
  * @param {String} str (optional) CSS color string to use as the start color for this element
*/
const color = function(value) {
  // The watch callback function for this color will be stored here
  this._onChange = false;
  // The default color value
  this._value = {h: undefined, s: undefined, v: undefined};
  if (value) this.set(value);
};

color.hsv2Rgb = hsv2Rgb;
color.rgb2Hsv = rgb2Hsv;
color.hsv2Hsl = hsv2Hsl;
color.hsl2Hsv = hsl2Hsv;
color.hsl2Str = hsl2Str;
color.rgb2Str = rgb2Str;
color.rgb2Hex = rgb2Hex;
color.parseHexStr = parseHexStr;
color.parseHslStr = parseHslStr;
color.parseRgbStr = parseRgbStr;

color.prototype = {
  constructor: color,

  /**
    * @desc set the color from any valid value
    * @param {Object \ String} value - hsv, hsl or rgb object, ot any valid hsl, rgb or hex string
  */
  set: function(value) {
    if (typeof value == "object") {
      if ("r" in value) {
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
  }
};

Object.defineProperties(color.prototype, {
  hsv: {
    get: function () {
      // _value is cloned to allow changes to be made to the values before passing them back
      var v = this._value;
      return {h: v.h, s: v.s, v: v.v};
    },
    set: function (newValue) {
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
      if (this._onChange && (changes.h || changes.s || changes.v)) this._onChange(this, changes);
    },
  },
  rgb: {
    get: function() {
      return hsv2Rgb(this._value);
    },
    set: function(value) {
      this.hsv = rgb2Hsv(value);
    }
  },
  hsl: {
    get: function() {
      return hsv2Hsl(this._value);
    },
    set: function(value) {
      this.hsv = hsl2Hsv(value);
    }
  },
  rgbString: {
    get: function() {
      return rgb2Str(this.rgb);
    },
    set: function(value) {
      this.rgb = parseRgbStr(value);
    }
  },
  hexString: {
    get: function() {
      return rgb2Hex(this.rgb);
    },
    set: function(value) {
      this.rgb = parseHexStr(value);
    }
  },
  hslString: {
    get: function() {
      return hsl2Str(this.hsl);
    },
    set: function(value) {
      this.hsl = color.parseHslStr(value);
    }
  }
});

module.exports = color;