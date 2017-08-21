/**
  * @constructor marker UI
  * @param {Object} ctx - canvas 2d context to draw on
  * @param {Object} opts - options
*/
let marker = function (svg, opts) {
  var group = svg.g();
  [[5, "#000"], [2, "#fff"]].map((ring) => {
    svg.circle(0, 0, opts.r, group, {
      f: "none",
      sw: ring[0],
      s: ring[1],
    });
  });
  this._el = group;
};

marker.prototype = {
  /**
    * @desc move markerpoint to centerpoint (x, y) and redraw
    * @param {Number} x - point x coordinate
    * @param {Number} y - point y coordinate
  */
  move: function (x, y) {
    this._el.setAttribute("transform", "translate(" + x + " " + y + ")");
  }
};

module.exports = marker;
