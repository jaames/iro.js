import hsl from "../colorModels/hsl.js";
import rgb from "../colorModels/rgb.js";
import hslString from "../colorModels/hslString.js";
import rgbString from "../colorModels/rgbString.js";
import hexString from "../colorModels/hexString.js";

const colorModels = {
  hsl,
  rgb,
  hslString,
  rgbString,
  hexString,
  hex: hexString
};

/**
  @constructor color object
  @param {String} str (optional) CSS color string to use as the start color for this element
*/
let color = function (str) {
  if (!(this instanceof color)) return new color(str);
  // The watch callback function for this color will be stored here
  this._onChange = false;
  // The default color value
  this._value = {h: undefined, s: undefined, v: undefined};
  // We use Object.defineProperties for color models, which means we can call functions as they're set / get
  var props = {
    hsv: {
      set: this.set,
      get: this.get
    }
  };
  // Loop through each external color model and set getter/setter functions for it
  // TODO: improve this... I'm sure this can be shorter than it is right now
  props = Object.keys(colorModels).reduce((props, model) => {
    props[model] = {
      set: function (value) {
        this.hsv = colorModels[model].to(value);
      },
      get: function () {
        return colorModels[model].from(this.hsv);
      },
    };
    return props;
  }, props);
  Object.defineProperties(this, props);
  if (str) this.fromString(str);
};

color.prototype = {
  /**
    * @desc Set a callback function that gets called whenever the selected color changes
    * @param {Function} callback The watch callback
    * @param {Boolean} callImmediately set to true if you want to call the callback as soon as it is added
  */
  watch: function (callback, callImmediately) {
    this._onChange = callback;
    var value = this._value;
    if (callImmediately) callback(value, value, {h: true, s: true, v: true});
  },

  /**
    * @desc Remove the watch callback
  */
  unwatch: function () {
    this.watch(false);
  },

  /**
    * @desc Set the color from a HSV value
    * @param {Object} newValue - HSV object
  */
  set: function (newValue) {
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
    if ((changes.h || changes.s || changes.v) && ("function" == typeof callback)) callback(newValue, oldValue, changes);
  },

  /**
    * @desc Get the HSV value
    * @return HSV object
  */
  get: function () {
    return this._value;
  },

  /**
    * @desc Set the color from a CSS string
    * @param {String} str - HEX, rgb, or hsl color string
  */
  fromString: function (str) {
    if (/^rgb/.test(str)) {
      this.rgbString = str
    }
    else if (/^hsl/.test(str)) {
      this.hslString = str;
    }
    else if (/^#[0-9A-Fa-f]/.test(str)) {
      this.hexString = str;
    }
  }
};

module.exports = color;
