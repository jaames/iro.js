import { parseUnit, parseHexInt, intToHex } from './util/colorUtils';

// Some regular expressions for rgb() and hsl() Colors are borrowed from tinyColor
// https://github.com/bgrins/TinyColor

// https://www.w3.org/TR/css3-values/#integers
const CSS_INTEGER = `[-\\+]?\\d+%?`;
// http://www.w3.org/TR/css3-values/#number-value
const CSS_NUMBER = `[-\\+]?\\d*\\.\\d+%?`;
// Allow positive/negative integer/number. Don't capture the either/or, just the entire outcome
const CSS_UNIT = `(?:${CSS_INTEGER})|(?:${CSS_NUMBER})`;

// Parse function params
// Parens and commas are optional, and this also allows for whitespace between numbers
const PERMISSIVE_MATCH_3 = `[\\s|\\(]+(${ CSS_UNIT })[,|\\s]+(${ CSS_UNIT })[,|\\s]+(${ CSS_UNIT })\\s*\\)?`;
const PERMISSIVE_MATCH_4 = `[\\s|\\(]+(${ CSS_UNIT })[,|\\s]+(${ CSS_UNIT })[,|\\s]+(${ CSS_UNIT })[,|\\s]+(${ CSS_UNIT })\\s*\\)?`;

// Regex patterns for functional colors
const REGEX_FUNCTIONAL_RGB = new RegExp(`rgb${PERMISSIVE_MATCH_3}`);
const REGEX_FUNCTIONAL_RGBA = new RegExp(`rgba${PERMISSIVE_MATCH_4}`);
const REGEX_FUNCTIONAL_HSL = new RegExp(`hsl${PERMISSIVE_MATCH_3}`);
const REGEX_FUNCTIONAL_HSLA = new RegExp(`hsla${PERMISSIVE_MATCH_4}`);

const HEX_START = `^(?:#?|0x?)`;
const HEX_INT_SINGLE = `([0-9a-fA-F]{1})`;
const HEX_INT_DOUBLE = `([0-9a-fA-F]{2})`;
const REGEX_HEX_3 = new RegExp(`${ HEX_START }${ HEX_INT_SINGLE }${ HEX_INT_SINGLE }${ HEX_INT_SINGLE }$`);
const REGEX_HEX_4 = new RegExp(`${ HEX_START }${ HEX_INT_SINGLE }${ HEX_INT_SINGLE }${ HEX_INT_SINGLE }${ HEX_INT_SINGLE }$`);
const REGEX_HEX_6 = new RegExp(`${ HEX_START }${ HEX_INT_DOUBLE }${ HEX_INT_DOUBLE }${ HEX_INT_DOUBLE }$`);
const REGEX_HEX_8 = new RegExp(`${ HEX_START }${ HEX_INT_DOUBLE }${ HEX_INT_DOUBLE }${ HEX_INT_DOUBLE }${ HEX_INT_DOUBLE }$`);

export default class Color {
  /**
    * @constructor Color object
    * @param {Object | String | Color} value - Color instance, object (hsv, hsl or rgb), string (hsl, rgb, hex)
  */
  constructor(value) {
    // The watch callback function for this Color will be stored here
    this._onChange = false;
    // The default Color value
    this._value = {h: 0, s: 0, v: 0, a: 0};
    if (value) this.set(value);
  }

  /**
    * @desc set the Color from any valid value
    * @param {Object | String | Color} value - Color instance, object (hsv, hsl or rgb), string (hsl, rgb, hex)
  */
  set(value) {
    const isString = typeof value === 'string';
    const isObject = typeof value === 'object';
    if ((isString) && (/^(?:#?|0x?)[0-6a-fA-F]{3,8}$/.test(value))) {
      this.hexString = value;
    }
    else if ((isString) && (/^rgba?/.test(value))) {
      this.rgbString = value;
    }
    else if ((isString) && (/^hsla?/.test(value))) {
      this.hslString = value;
    }
    else if ((isObject) && (value instanceof Color)) {
      this.hsv = value.hsv;
    }
    else if ((isObject) && ('r' in value) && ('g' in value) && ('b' in value)) {
      this.rgb = value;
    }
    else if ((isObject) && ('h' in value) && ('s' in value) && ('v' in value)) {
      this.hsv = value;
    }
    else if ((isObject) && ('h' in value) && ('s' in value) && ('l' in value)) {
      this.hsl = value;
    }
    else {
      throw new Error('invalid color value');
    }
  }

  /**
    * @desc shortcut to set a specific channel value
    * @param {String} format - hsv | hsl | rgb
    * @param {String} channel - individual channel to set, for example if model = hsl, chanel = h | s | l
    * @param {Number} value - new value for the channel
  */
  setChannel(format, channel, value) {
    this[format] = {...this[format], [channel]: value};
  }

  /**
    * @desc make new Color instance with the same value as this one
    * @return {Color}
  */
  clone() {
    return new Color(this);
  }

  /**
    * @desc convert hsv object to rgb
    * @param {Object} hsv hsv object
    * @return {Object} rgb object
  */
  static hsvToRgb(hsv) {
    var r, g, b, i, f, p, q, t;
    var h = hsv.h/360, s = hsv.s/100, v = hsv.v/100;
    i =Math.floor(h * 6);
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
    return {r:Math.round(r * 255), g:Math.round(g * 255), b:Math.round(b * 255)};
  }

  /**
    * @desc convert rgb object to hsv
    * @param {Object} rgb - rgb object
    * @return {Object} hsv object
  */
  static rgbToHsv(rgb) {
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
    }
  }

  /**
    * @desc convert hsv object to hsl
    * @param {Object} hsv - hsv object
    * @return {Object} hsl object
  */
  static hsvToHsl(hsv) {
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
  static hslToHsv(hsl) {
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

  get hsv() {
    // _value is cloned to allow changes to be made to the values before passing them back
    const value = this._value;
    return {h: value.h, s: value.s, v: value.v, a: value.a};
  }

  set hsv(newValue) {
    // If this Color is being watched for changes we need to compare the new and old values to check the difference
    // Otherwise we can just be lazy
    if (this._onChange) {
      const oldValue = this._value;
      newValue = { ...oldValue, ...newValue };
      let changes = {};
      for (let key in oldValue) changes[key] = newValue[key] != oldValue[key];
      // Update the old value
      this._value = newValue;
      // If the value has changed, call hook callback
      if (changes.h || changes.s || changes.v || changes.a) this._onChange(this, changes);
    } else {
      this._value = newValue;
    }
  }

  get rgb() {
    const {r, g, b} = Color.hsvToRgb(this._value);
    return {
      r:Math.round(r),
      g:Math.round(g),
      b:Math.round(b),
    };
  }

  set rgb(value) {
    this.hsv = Color.rgbToHsv(value);
  }

  get hsl() {
    const {h, s, l} = Color.hsvToHsl(this._value);
    return {
      h:Math.round(h),
      s:Math.round(s),
      l:Math.round(l),
    };
  }

  set hsl(value) {
    this.hsv = Color.hslToHsv(value);
  }

  get rgbString() {
    const rgb = this.rgb;
    return `rgb${rgb.a ? 'a' : ''}(${rgb.r}, ${rgb.g}, ${rgb.b}${rgb.a ? ', ' + rgb.a : ''})`;
  }

  set rgbString(value) {
    let match;
    let r, g, b, a = 1;
    if (match = REGEX_FUNCTIONAL_RGB.exec(value)) {
      r = parseUnit(match[1], 255);
      g = parseUnit(match[2], 255);
      b = parseUnit(match[3], 255);
    }
    else if (match = REGEX_FUNCTIONAL_RGBA.exec(value)) {
      r = parseUnit(match[1], 255);
      g = parseUnit(match[2], 255);
      b = parseUnit(match[3], 255);
      a = parseUnit(match[4], 1);
    }
    if (match) {
      this.rgb = {r, g, b, a};
    } 
    else {
      throw new Error('invalid rgb string');
    }
  }

  get hexString() {
    const rgb = this.rgb;
    return `#${ intToHex(rgb.r) }${ intToHex(rgb.g) }${ intToHex(rgb.b) }`;
  }

  set hexString(value) {
    let match;
    let r, g, b, a = 255;
    if (match = REGEX_HEX_3.exec(value)) {
      r = parseHexInt(match[1]) * 17;
      g = parseHexInt(match[2]) * 17;
      b = parseHexInt(match[3]) * 17;
    }
    else if (match = REGEX_HEX_4.exec(value)) {
      r = parseHexInt(match[1]) * 17;
      g = parseHexInt(match[2]) * 17;
      b = parseHexInt(match[3]) * 17;
      a = parseHexInt(match[4]) * 17;
    }
    else if (match = REGEX_HEX_6.exec(value)) {
      r = parseHexInt(match[1]);
      g = parseHexInt(match[2]);
      b = parseHexInt(match[3]);
    }
    else if (match = REGEX_HEX_8.exec(value)) {
      r = parseHexInt(match[1]);
      g = parseHexInt(match[2]);
      b = parseHexInt(match[3]);
      a = parseHexInt(match[4]);
    }
    if (match) {
      this.rgb = {r, g, b, a: a / 255};
    }
    else {
      throw new Error('invalid hex string');
    }
  }

  get hslString() {
    const hsl = this.hsl;
    return `hsl${hsl.a ? 'a' : ''}(${hsl.h}, ${hsl.s}%, ${hsl.l}%${hsl.a ? ', ' + hsl.a : ''})`;
  }

  set hslString(value) {
    let match;
    let h, s, l, a = 1;
    if (match = REGEX_FUNCTIONAL_HSL.exec(value)) {
      h = parseUnit(match[1], 360);
      s = parseUnit(match[2], 100);
      l = parseUnit(match[3], 100);
    }
    else if (match = REGEX_FUNCTIONAL_HSLA.exec(value)) {
      h = parseUnit(match[1], 360);
      s = parseUnit(match[2], 100);
      l = parseUnit(match[3], 100);
      a = parseUnit(match[4], 1);
    }
    if (match) {
      this.hsl = {h, s, l, a};
    } 
    else {
      throw new Error('invalid hsl string');
    }
  }
}