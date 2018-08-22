// css class prefix for this element
var CLASS_PREFIX = "iro__handle";


export default class handle {
  /**
    * @constructor ui handle
    * @param {svgRoot} svg - svgRoot object
    * @param {Object} props - options
  */
  constructor(svg, props) {
    var baseGroup = svg.svg({
      class: CLASS_PREFIX,
      style: "overflow:visible"
    });
    baseGroup.circle(0, 0, props.r, {
      class: CLASS_PREFIX + "__outer",
      fill: "none",
      "stroke-width": 5,
      stroke: "#000",
    });
    baseGroup.circle(0, 0, props.r, {
      class: CLASS_PREFIX + "__inner",
      fill: "none",
      "stroke-width": 2,
      stroke: "#fff",
    });
    this.root = baseGroup;
  }

  /**
    * @desc move handle to centerpoint (x, y) and redraw
    * @param {Number} x - point x coordinate
    * @param {Number} y - point y coordinate
  */
  move(x, y) {
    this.root.setAttrs({x, y});
  }
}