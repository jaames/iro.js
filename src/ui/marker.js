// sniff useragent string to check if the user is running IE
var IS_IE = /msie|trident/.test(window.navigator.userAgent.toLowerCase());
// css class prefix for this element
var CLASS_PREFIX = "iro__marker";

 /**
  * @constructor marker UI
  * @param {Object} ctx - canvas 2d context to draw on
  * @param {Object} opts - options
*/
const marker = function (svg, opts) {
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
};

marker.prototype = {
  constructor: marker,

  /**
    * @desc move markerpoint to centerpoint (x, y) and redraw
    * @param {Number} x - point x coordinate
    * @param {Number} y - point y coordinate
  */
  move: function(x, y) {
    // older internet explorer versions dont implement SVG transforms properly, instead we have to force them
    // TODO: move this functionality to the SVG lib
    if (IS_IE) {
      this.g.setAttrs({"transform": "translate(" + x + "," + y + ")"});
    } else {
      this.g.setTransform("translate", [x, y]);
    }
  }
};

module.exports = marker;