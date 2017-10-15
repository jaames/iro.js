var round = Math.round;

function hsvToRgb(hsv) {
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
}

function rgbToHsv(rgb) {
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
      hue = (b - r) / delta + 2
      break;
    case b:
      hue = (r - g) / delta + 4;
      break;
  }
  hue /= 6;
  return {
    h: round(hue * 360),
    s: round(max === 0 ? 0 : (delta / max) * 100),
    v: round(max * 100)
  };
}

function rgbToString(rgb) {
  return "rgb" + (rgb.a ? "a" : "") + "(" + rgb.r + ", " + rgb.g + ", " + rgb.b + (rgb.a ? ", " + rgb.a : "") + ")";
}

function parseRgbString(str) {
  var parsed = str.match(/(rgba?)\((\d+)(?:\D+?)(\d+)(?:\D+?)(\d+)(?:\D+?)?([0-9\.]+?)?\)/i);
  return {
    r: parseInt(parsed[2]),
    g: parseInt(parsed[3]),
    b: parseInt(parsed[4])
  };
}

function rgbToHex(rgb) {
  var r = rgb.r,
      g = rgb.g,
      b = rgb.b;
  // If each RGB channel's value is a multiple of 17, we can use HEX shorthand notation
  var useShorthand = (r % 17 == 0) && (g % 17 == 0) && (b % 17 == 0),
  // If we're using shorthand notation, divide each channel by 17
  divider      = useShorthand ? 17 : 1,
  // bitLength of each channel (for example, F is 4 bits long while FF is 8 bits long)
  bitLength    = useShorthand ? 4 : 8,
  // Target length of the string (ie "#FFF" or "#FFFFFF")
  strLength    = useShorthand ? 4 : 7,
  // Combine the channels together into a single integer
  int          = (r / divider) << (bitLength * 2) | (g / divider) << bitLength | (b / divider),
  // Convert that integer to a hex string
  str          = int.toString(16);
  // Add right amount of left-padding
  return "#" + (new Array(strLength - str.length).join("0")) + str;  
}

function parseHexString(hex) {
  // Strip any "#" characters
  hex = hex.replace(/#/g, '');
  // Prefix the hex string with "0x" which indicates a number in hex notation, then convert to an integer
  var int         = parseInt("0x" + hex),
      // If the length of the input is only 3, then it is a shorthand hex color
      isShorthand = hex.length == 3,
      // bitMask for isolating each channel
      bitMask     = isShorthand ? 0xF : 0xFF,
      // bitLength of each channel (for example, F is 4 bits long while FF is 8 bits long)
      bitLength   = isShorthand ? 4 : 8,
      // If we're using shorthand notation, multiply each channel by 17
      multiplier  = isShorthand ? 17 : 1;

  return {
    r: ((int >> (bitLength * 2)) & bitMask) * multiplier,
    g: ((int >> bitLength) & bitMask) * multiplier,
    b: (int & bitMask) * multiplier,
  };
}

function hsvToHsl(hsv) {
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

function hslToHsv(hsl) {
  var s = hsl.s / 100,
  l = hsl.l / 100;
  l *= 2;
  s *= (l <= 1) ? l : 2 - l;
  return {
    h: hsl.h,
    s: round(((2 * s) / (l + s)) * 100),
    v: round(((l + s) / 2) * 100)
  };
}

function hslToString(hsl) {
  return "hsl" + (hsl.a ? "a" : "") + "(" + hsl.h + ", " + hsl.s + "%, " + hsl.l + "%" + (hsl.a ? ", " + hsl.a : "") + ")";
}

function parseHslString(str) {
  var parsed = str.match(/(hsla?)\((\d+)(?:\D+?)(\d+)(?:\D+?)(\d+)(?:\D+?)?([0-9\.]+?)?\)/i);
  return {
    h: parseInt(parsed[2]),
    s: parseInt(parsed[3]),
    l: parseInt(parsed[4])
  };
}

/**
    @constructor color object
    @param {String} str (optional) CSS color string to use as the start color for this element
  */
const color = function(str) {
  // The watch callback function for this color will be stored here
  this._onChange = false;
  // The default color value
  this._value = {h: undefined, s: undefined, v: undefined};
  if (str) this.fromString(str);
}

color.hsvToRgb = hsvToRgb;
color.rgbToHsv = rgbToHsv;
color.hsvToHsl = hsvToHsl;
color.hslToHsv = hslToHsv;
color.hslToString = hslToString;
color.rgbToString = rgbToString;
color.rgbToHex = rgbToHex;
color.parseHexString = parseHexString;
color.parseHslString = parseHslString;
color.parseRgbString = parseRgbString;

color.prototype = {
  constructor: color,

  /**
    * @desc Set the color from a CSS string
    * @param {String} str - HEX, rgb, or hsl color string
  */
  fromString: function(str) {
    if (/^rgb/.test(str)) {
      this.rgbString = str
    }
    else if (/^hsl/.test(str)) {
      this.hslString = str;
    }
    else if (/^#[0-9A-Fa-f]/.test(str)) {
      this.hexString = str;
    }
  },

  /**
    * @desc Set a callback function that gets called whenever the selected color changes
    * @param {Function} callback The watch callback
    * @param {Boolean} callImmediately set to true if you want to call the callback as soon as it is added
  */
  watch: function(callback, callImmediately) {
    this._onChange = callback;
    if (callImmediately) this.forceUpdate();
  },

  /**
    * @desc Remove the watch callback
  */
  unwatch: function() {
    this.watch(false);
  },

  /**
    * @desc Force an update
  */
  forceUpdate: function() {
    var value = this._value;
    this._onChange(value, value, {h: true, s: true, v: true});
  }
}

Object.defineProperties(color.prototype, {
  hsv: {
    get: function () {
      return this._value
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
      var callback = this._onChange;
      if ((changes.h || changes.s || changes.v) && ("function" == typeof callback)) callback(newValue, oldValue, changes);
    },
  },
  rgb: {
    get: function() {
      return hsvToRgb(this._value);
    },
    set: function(value) {
      this.hsv = rgbToHsv(value);
    }
  },
  hsl: {
    get: function() {
      return hsvToHsl(this._value);
    },
    set: function(value) {
      this.hsv = hslToHsv(value);
    }
  },
  rgbString: {
    get: function() {
      return rgbToString(this.rgb);
    },
    set: function(value) {
      this.rgb = parseRgbString(value);
    }
  },
  hexString: {
    get: function() {
      return rgbToHex(this.rgb);
    },
    set: function(value) {
      this.rgb = parseHexString(value);
    }
  },
  hslString: {
    get: function() {
      return hslToString(this.hsl);
    },
    set: function(value) {
      this.hsl = color.parseHslString(value);
    }
  }
});

module.exports = color;