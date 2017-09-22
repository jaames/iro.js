// sniff useragent string to check if the user is running IE
var IS_IE = /msie|trident/.test(window.navigator.userAgent.toLowerCase());

/**
  * @constructor marker UI
  * @param {Object} ctx - canvas 2d context to draw on
  * @param {Object} opts - options
*/
let marker = function (svg, opts) {
  var baseGroup = svg.g();
  baseGroup.circle(0, 0, opts.r, {
    f: "none",
    sw: 5,
    s: "#000",
  });
  baseGroup.circle(0, 0, opts.r, {
    f: "none",
    sw: 2,
    s: "#fff",
  });
  this.g = baseGroup;
};

marker.prototype = {
  /**
    * @desc move markerpoint to centerpoint (x, y) and redraw
    * @param {Number} x - point x coordinate
    * @param {Number} y - point y coordinate
  */
  move: function (x, y) {
    // older internet explorer versions dont implement SVG transforms properly, instead we have to force them
    // TODO: move this functionality to the SVG lib
    if (IS_IE) {
      this.g.setAttrs({"transform": "translate(" + x + "," + y + ")"});
    } else {
      this.g.setTransform("t", [x, y]);
    }
  }
};

module.exports = marker;
