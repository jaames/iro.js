// css class prefix for this element
var CLASS_PREFIX = "iro__marker";

export default class marker {
   /**
    * @constructor marker UI
    * @param {svgRoot} svg - svgRoot object
    * @param {Object} opts - options
  */
  constructor(svg, opts) {
    var baseGroup = svg.g({
      class: CLASS_PREFIX
    });
    baseGroup.circle(0, 0, opts.r, {
      class: CLASS_PREFIX + "__outer",
      fill: "none",
      strokeWidth: 5,
      stroke: "#000",
    });
    baseGroup.circle(0, 0, opts.r, {
      class: CLASS_PREFIX + "__inner",
      fill: "none",
      strokeWidth: 2,
      stroke: "#fff",
    });
    this.g = baseGroup;
  }

  /**
    * @desc move marker to centerpoint (x, y) and redraw
    * @param {Number} x - point x coordinate
    * @param {Number} y - point y coordinate
  */
  move(x, y) {
    this.g.setTransform("translate", [x, y]);
  }
}