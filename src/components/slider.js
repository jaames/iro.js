import handle from "./handle";
import base from "./base";
import iroColor from "../color";

// css class prefix for this element
var CLASS_PREFIX = "iro__slider";

export default class slider extends base {
  /**
    * @constructor slider UI
    * @param {svgRoot} svg - svgRoot object
    * @param {Object} opts - options
  */
  constructor(parent, opts) {
    super(parent, CLASS_PREFIX);
    var svg = parent.svg;
    var r = opts.r,
    w = opts.w,
    h = opts.h,
    x = opts.x,
    y = opts.y,
    borderWidth = opts.border.w;
    // "range" limits how far the slider's marker can travel, and where it stops and starts along the X axis
    opts.range = {
      min: r,
      max: w - r,
      w: w - (r * 2)
    };
    opts.sliderType = opts.sliderType || "v";
    this.type = "slider";
    this._opts = opts;
    var baseGroup = this.g;
    var radius = r + borderWidth / 2;
    var rect = baseGroup.insert("rect", {
      class: CLASS_PREFIX + "__value",
      rx: radius,
      ry: radius,
      x: x - borderWidth / 2,
      y: y - borderWidth / 2,
      width: w + borderWidth,
      height: h + borderWidth,
      strokeWidth: borderWidth,
      stroke: opts.border.color,
    });
    rect.setGradient("fill", svg.gradient("linear", {
      0: {color: "#000"},
      100: {color: "#fff"}
    }));
    this._gradient = rect.gradient;
    this.handle = new handle(baseGroup, opts.marker);
  }

  /**
    * @desc updates this element to represent a new color value
    * @param {Object} color - an iroColor object with the new color value
    * @param {Object} changes - an object that gives a boolean for each HSV channel, indicating whether ot not that channel has changed
  */
  update(color, changes) {
    var opts = this._opts;
    var range = opts.range;
    var hsv = color.hsv;
    var hsl = iroColor.hsv2Hsl({h: hsv.h, s: hsv.s, v: 100});
    if (opts.sliderType == "v") {
      if (changes.h || changes.s) {
        this._gradient.stops[1].setAttrs({stopColor: "hsl(" + hsl.h + "," + hsl.s + "%," + hsl.l + "%)"});
      }
      if (changes.v) {
        var percent = (hsv.v / 100);
        this.handle.move((opts.x + opts.r) + (percent * range.w), opts.y + (opts.h / 2));
      }
    }
  }

  /**
    * @desc Takes a point at (x, y) and returns HSV values based on this input -- use this to update a color from mouse input
    * @param {Number} x - point x coordinate
    * @param {Number} y - point y coordinate
    * @param {String} type - input type, START, MOVE, END
    * @return {Object} - new HSV color values (some channels may be missing)
  */
  input(x, y, type) {
    var opts = this._opts;
    var range = opts.range;
    var dist = Math.max(Math.min(x, range.max), range.min) - range.min;
    return {
      v: Math.round((100 / range.w) * dist),
    };
  }
}