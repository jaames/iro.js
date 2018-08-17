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
  return [
    parsed[1],
    parsed[3] == "%" ? val1 / 100 * maxValues[0] : val1,
    parsed[5] == "%" ? val2 / 100 * maxValues[1] : val2,
    parsed[7] == "%" ? val3 / 100 * maxValues[2] : val3,
    parseFloat(parsed[8]) || undefined
  ];
};

/**
  * @desc convert object / string input to color if necessary
  * @param {Object | String | color} value - color instance, object (hsv, hsl or rgb), string (hsl, rgb, hex)
  * @return {color} color instance
*/
function getColor(value) {
  return value instanceof color ? value : new color(value);
};

/**
  * @desc clamp value between min and max
  * @param {Number} value
  * @param {Number} min
  * @param {Number} max
  * @return {Number}
*/
function clamp(value, min, max) {
  return value <= min ? min : value >= max ? max : value;
};

/**
  * @desc compare values between two objects, returns a object representing changes with true/false values
  * @param {Object} a
  * @param {Object} b
  * @return {Object}
*/
function compareObjs(a, b) {
  var changes = {};
  for (var key in a) changes[key] = b[key] != a[key];
  return changes;
};

export default class color {
  /**
    * @constructor color object
    * @param {Object | String | color} value - color instance, object (hsv, hsl or rgb), string (hsl, rgb, hex)
  */
  constructor(value) {
    // The watch callback function for this color will be stored here
    this._onChange = false;
    // The default color value
    this._value = {h: undefined, s: undefined, v: undefined};
    if (value) this.set(value);
  }

  /**
    * @desc mix two colors
    * @param {Object | String | color} color1 - color instance, object (hsv, hsl or rgb), string (hsl, rgb, hex)
    * @param {Object | String | color} color2 - color instance, object (hsv, hsl or rgb), string (hsl, rgb, hex)
    * @param {Number} weight - closer to 0 = more color1, closer to 100 = more color2
    * @return {color} color instance
  */
  static mix(color1, color2, weight) {
    var rgb1 = getColor(color1).rgb,
        rgb2 = getColor(color2).rgb;
    weight = clamp((weight / 100 || 0.5), 0, 1);
    return new color({
      r: floor(rgb1.r + (rgb2.r - rgb1.r) * weight),
      g: floor(rgb1.g + (rgb2.g - rgb1.g) * weight),
      b: floor(rgb1.b + (rgb2.b - rgb1.b) * weight),
    });
  }

  /**
    * @desc lighten color by amount
    * @param {Object | String | color} color - color instance, object (hsv, hsl or rgb), string (hsl, rgb, hex)
    * @param {Number} amount
    * @return {color} color instance
  */
  static lighten(color, amount) {
    var col = getColor(color),
        hsv = col.hsv;
    hsv.v = clamp(hsv.v + amount, 0, 100);
    col.hsv = hsv;
    return col;
  }

  /**
    * @desc darken color by amount
    * @param {Object | String | color} color - color instance, object (hsv, hsl or rgb), string (hsl, rgb, hex)
    * @param {Number} amount
    * @return {color} color instance
  */
  static darken(color, amount) {
    var col = getColor(color),
        hsv = col.hsv;
    hsv.v = clamp(hsv.v - amount, 0, 100);
    col.hsv = hsv;
    return col;
  }

  /**
    * @desc convert hsv object to rgb
    * @param {Object} hsv - hsv object
    * @return {Object} rgb object
  */
  static hsv2Rgb(hsv) {
    var r, g, b, i, f, p, q, t;
    var h = hsv.h/360, s = hsv.s/100, v = hsv.v/100;
    i = floor(h * 6);
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

  /**
    * @desc convert rgb object to hsv
    * @param {Object} rgb - rgb object
    * @return {Object} hsv object
  */
  static rgb2Hsv(rgb) {
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
      h: hue * 360,
      s: max == 0 ? 0 : (delta / max) * 100,
      v: max * 100
    };
  }

  /**
    * @desc convert hsv object to hsl
    * @param {Object} hsv - hsv object
    * @return {Object} hsl object
  */
  static hsv2Hsl(hsv) {
    var s = hsv.s / 100,
        v = hsv.v / 100;
    var l = 0.5 * v * (2 - s);
    s = v * s / (1 - Math.abs(2 * l - 1));
    return {
      h: hsv.h,
      s: s * 100 || 0,
      l: l * 100
    };
  }

  /**
    * @desc convert hsl object to hsv
    * @param {Object} hsl - hsl object
    * @return {Object} hsv object
  */
  static hsl2Hsv(hsl) {
    var s = hsl.s / 100,
    l = hsl.l / 100;
    l *= 2;
    s *= (l <= 1) ? l : 2 - l;
    return {
      h: hsl.h,
      s: ((2 * s) / (l + s)) * 100,
      v: ((l + s) / 2) * 100
    };
  }

  /**
    * @desc convert hsl object to string
    * @param {Object} hsl - hsl object
    * @return {Object} hsl string
  */
  static hsl2Str(hsl) {
    return "hsl" + (hsl.a ? "a" : "") + "(" + hsl.h + ", " + hsl.s + "%, " + hsl.l + "%" + (hsl.a ? ", " + hsl.a : "") + ")";
  }

  /**
    * @desc convert rgb object to string
    * @param {Object} rgb - rgb object
    * @return {Object} rgb string
  */
  static rgb2Str(rgb) {
    return "rgb" + (rgb.a ? "a" : "") + "(" + rgb.r + ", " + rgb.g + ", " + rgb.b + (rgb.a ? ", " + rgb.a : "") + ")";
  }

  /**
    * @desc convert rgb object to hex string
    * @param {Object} rgb - rgb object
    * @return {Object} hex string
  */
  static rgb2Hex(rgb) {
    var str = "#";
    str += rgb.r.toString(16).padStart(2, "0");
    str += rgb.g.toString(16).padStart(2, "0");
    str += rgb.b.toString(16).padStart(2, "0");
    return str;
  }

  /**
    * @desc parse hex string
    * @param {String} str - color string
    * @return {Object} rgb object
  */
  static parseHexStr(hex) {
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
  }

  /**
    * @desc parse hsl string
    * @param {String} str - color string
    * @return {Object} hsl object
  */
  static parseHslStr(str) {
    var parsed = parseColorStr(str, [360, 100, 100]);
    return {
      h: parsed[2],
      s: parsed[3],
      l: parsed[4]
    };
  }

  /**
    * @desc parse rgb string
    * @param {String} str - color string
    * @return {Object} rgb object
  */
  static parseRgbStr(str) {
    var parsed = parseColorStr(str, [255, 255, 255]);
    return {
      r: parsed[1],
      g: parsed[2],
      b: parsed[3]
    };
  }

  get hsv() {
    // _value is cloned to allow changes to be made to the values before passing them back
    var v = this._value;
    return {h: v.h, s: v.s, v: v.v};
  }

  set hsv(newValue) {
    // If this color is being watched for changes we need to compare the new and old values to check the difference
    // Otherwise we can just be lazy
    if (this._onChange) {
      var oldValue = this._value;
      for (var channel in oldValue) {
        if (!newValue.hasOwnProperty(channel)) newValue[channel] = oldValue[channel];
      }
      var changes = compareObjs(oldValue, newValue);
      // Update the old value
      this._value = newValue;
      // If the value has changed, call hook callback
      if (changes.h || changes.s || changes.v) this._onChange(this, changes);
    } else {
      this._value = newValue;
    }
  }

  get rgb() {
    var rgb = color.hsv2Rgb(this._value);
    return {
      r: round(rgb.r),
      g: round(rgb.g),
      b: round(rgb.b),
    };
  }

  set rgb(value) {
    this.hsv = color.rgb2Hsv(value);
  }

  get hsl() {
    var hsl = color.hsv2Hsl(this._value);
    return {
      h: round(hsl.h),
      s: round(hsl.s),
      l: round(hsl.l),
    };
  }

  set hsl(value) {
    this.hsv = color.hsl2Hsv(value);
  }

  get rgbString() {
    return color.rgb2Str(this.rgb);
  }

  set rgbString(value) {
    this.rgb = color.parseRgbStr(value);
  }

  get hexString() {
    return color.rgb2Hex(this.rgb);
  }

  set hexString(value) {
    this.rgb = color.parseHexStr(value);
  }

  get hslString() {
    return color.hsl2Str(this.hsl);
  }

  set hslString(value) {
    this.hsl = color.parseHslStr(value);
  }

  /**
    * @desc set the color from any valid value
    * @param {Object | String | color} value - color instance, object (hsv, hsl or rgb), string (hsl, rgb, hex)
  */
  set(value) {
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
  }

  /**
    * @desc shortcut to set a specific channel value
    * @param {String} model - hsv | hsl | rgb
    * @param {String} channel - individual channel to set, for example if model = hsl, chanel = h | s | l
    * @param {Number} value - new value for the channel
  */
  setChannel(model, channel, value) {
    var v = this[model];
    v[channel] = value;
    this[model] = v;
  }

  /**
    * @desc make new color instance with the same value as this one
    * @return {color}
  */
  clone() {
    return new color(this);
  }

  /**
    * @desc compare this color against another, returns a object representing changes with true/false values
    * @param {Object | String | color} color - color to compare against
    * @param {String} model - hsv | hsl | rgb
    * @return {Object}
  */
  compare(color, model) {
    model = model || "hsv";
    return compareObjs(this[model], getColor(color)[model]);
  }

  /**
    * @desc mix a color into this one
    * @param {Object | String | color} color - color instance, object (hsv, hsl or rgb), string (hsl, rgb, hex)
    * @param {Number} weight - closer to 0 = more current color, closer to 100 = more new color
  */
  mix(color, weight) {
    this.hsv = mix(this, color, weight).hsv;
  }

  /**
    * @desc lighten color by amount
    * @param {Number} amount
  */
  lighten(amount) {
    lighten(this, amount);
  }

  /**
    * @desc darken color by amount
    * @param {Number} amount
  */
  darken(amount) {
    darken(this, amount);
  }
}