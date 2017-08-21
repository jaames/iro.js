import marker from "ui/marker";
import hslString from "colorModels/hslString";

/**
  * @constructor slider UI
*/
let slider = function (svg, opts) {

  var r = opts.r,
      w = opts.w,
      h = opts.h,
      x = opts.x,
      y = opts.y,
      borderWidth = opts.border.w;

  // "range" limits how far the slider's marker can travel, and where it stops and starts along the X axis
  opts.range = {
    min: x + r,
    max: (x + w) - r,
    w: w - (r * 2)
  };

  opts.sliderType = opts.sliderType || "v";

  var gradient = svg.gradient("linear", {
    0: {c: "#000"},
    100: {c: "#fff"}
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
    s: opts.border.color,
  });

  this.type = "slider";
  this._opts = opts;
  this._gradient = gradient;
  this.marker = new marker(svg, opts.marker);
};

slider.prototype = {

  /**
    * @desc updates this element to represent a new color value
    * @param {Object} color - an iroColor object with the new color value
    * @param {Object} changes - an object that gives a boolean for each HSV channel, indicating whether ot not that channel has changed
  */
  update: function (color, changes) {
    var opts = this._opts;
    var range = opts.range;
    var hsv = color.hsv;
    if (opts.sliderType == "v") {
      if (changes.h || changes.s) {
        this._gradient.stops[1].setAttrs({sc: hslString.fromHsv({h: hsv.h, s: hsv.s, v: 100})});
      }
      if (changes.v) {
        var percent = (hsv.v / 100);
        this.marker.move(range.min + (percent * range.w), opts.y + (opts.h / 2));
      }
    }
  },

  /**
    * @desc Takes a point at (x, y) and returns HSV values based on this input -- use this to update a color from mouse input
    * @param {Number} x - point x coordinate
    * @param {Number} y - point y coordinate
    * @return {Object} - new HSV color values (some channels may be missing)
  */
  input: function (x, y) {
    var opts = this._opts;
    var range = opts.range;
    var dist = Math.max(Math.min(x, range.max), range.min) - range.min;
    return {
      v: Math.round((100 / range.w) * dist),
    };
  },

  /**
    * @desc Check if a point at (x, y) is inside this element
    * @param {Number} x - point x coordinate
    * @param {Number} y - point y coordinate
    * @return {Boolean} - true if the point is a "hit", else false
  */
  checkHit: function (x, y) {
    var opts = this._opts;
    return (x > opts.x) && (x < opts.x + opts.w) && (y > opts.y) && (y < opts.y + opts.h);
  }
};

module.exports = slider;
