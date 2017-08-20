import gradient from "ui/gradient";
import marker from "ui/marker";
import dom from "util/dom";
import hslString from "colorModels/hslString";

/**
  * @constructor slider UI
*/
let slider = function (ctx, svg, opts) {
  this._ctx = ctx;
  opts.x1 = opts.x;
  opts.y1 = opts.y;
  opts.x2 = opts.x + opts.w;
  opts.y2 = opts.y + opts.h;
  // "range" limits how far the slider's marker can travel, and where it stops and starts along the X axis
  opts.range = {
    min: opts.x + opts.r,
    max: opts.x2 - opts.r,
    w: opts.w - (opts.r * 2)
  };
  opts.sliderType = opts.sliderType || "v";
  this.type = "slider";
  this._opts = opts;
  var borderWidth = opts.border.w;
  var radius = opts.r + borderWidth / 2;

  var defs = dom.appendNew(svg, "defs", {}, "SVG");

  var gradient = dom.appendNew(defs, "linearGradient", {
    "id": "slidergradient"
  }, "SVG");

  var stop1 = dom.appendNew(gradient, "stop", {
    "offset": "0%",
    "stop-color": "#000",
  }, "SVG");

  var stop2 = dom.appendNew(gradient, "stop", {
    "offset": "100%",
    "stop-color": "#fff",
  }, "SVG");

  this.stop2 = stop2;

  if (borderWidth > 0) {
    dom.appendNew(svg, "rect", {
      "rx": radius,
      "ry": radius,
      "x": opts.x - borderWidth / 2,
      "y": opts.y - borderWidth / 2,
      "width": opts.w + borderWidth,
      "height": opts.h + borderWidth,
      "fill": "url(#slidergradient)",
      "stroke-width": borderWidth,
      "stroke": opts.border.color,
    }, "SVG");
  }


  this.marker = new marker(svg, opts.marker);
};

slider.prototype = {
  /**
    * @desc redraw this UI element
  */
  draw: function (hsv) {
    dom.setAttr(this.stop2, {"stop-color": hslString.fromHsv({h: hsv.h, s: hsv.s, v: 100})});
    // var ctx = this._ctx;
    // var opts = this._opts;
    // var x1 = opts.x1,
    //     y1 = opts.y1,
    //     x2 = opts.x2,
    //     y2 = opts.y2,
    //     w = opts.w,
    //     h = opts.h,
    //     r = opts.r;
    //
    // // Clear the existing UI
    // ctx.clearRect(x1, y1, w, h);
    //
    // // Draw a rounded rect
    // // Modified from http://stackoverflow.com/a/7838871
    // ctx.beginPath();
    // ctx.moveTo(x1 + r, y1);
    // ctx.arcTo(x2, y1, x2, y2, r);
    // ctx.arcTo(x2, y2, x1, y2, r);
    // ctx.arcTo(x1, y2, x1, y1, r);
    // ctx.arcTo(x1, y1, x2, y1, r);
    // ctx.closePath();
    //
    // // I plan to have different slider "types" in the future
    // // (I'd like to add a transparency slider at some point, for example)
    // var fill;
    //
    // // For now the only type is "V", meaning this slider adjusts the HSV V channel
    // if (opts.sliderType == "v") {
    //   fill = gradient.linear(ctx, x1, y1, x2, y2, {
    //     0: "#000",
    //     1: ,
    //   });
    // }
    //
    // // Draw gradient
    // ctx.fillStyle = fill;
    // ctx.fill();
  },

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
        this.draw(hsv);
      }
      if (changes.v) {
        var percent = (hsv.v / 100);
        this.marker.move(range.min + (percent * range.w), opts.y1 + (opts.h / 2));
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
    return (x > opts.x1) && (x < opts.x2) && (y > opts.y1) && (y < opts.y2);
  }
};

module.exports = slider;
