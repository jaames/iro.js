import dom from "util/dom";

/**
  * @constructor marker UI
  * @param {Object} ctx - canvas 2d context to draw on
  * @param {Object} opts - options
*/
let marker = function (svg, opts) {
  this._el = dom.appendNew(svg, "g", {}, "SVG");
  [[5, "#000"], [2, "#fff"]].map((ring) => {
    dom.appendNew(this._el, "circle", {
      "r": opts.r,
      "fill": "none",
      "stroke-width": ring[0],
      "stroke": ring[1],
      "cy": 0,
      "cx": 0,
    }, "SVG");
  });
};

marker.prototype = {
  /**
    * @desc move markerpoint to centerpoint (x, y) and redraw
    * @param {Number} x - point x coordinate
    * @param {Number} y - point y coordinate
  */
  move: function (x, y) {
    dom.setAttr(this._el, {
      transform: "translate(" + x + " " + y + ")"
    });
  }
};

module.exports = marker;
