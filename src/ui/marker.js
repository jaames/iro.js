import dom from "util/dom";

/**
  * @constructor marker UI
  * @param {Object} ctx - canvas 2d context to draw on
  * @param {Object} opts - options
*/
let marker = function (svg, opts) {
  this.opts = opts;
  this._rings = [];
  var width = [5, 2];
  ["#000", "#fff"].map((color, index) => {
    var el = dom.append(svg, dom.create("circle", "SVG"));
    dom.setAttr(el, {
      r: opts.r,
      style: "fill:none;stroke-width:" + width[index] + ";stroke:" + color
    });
    this._rings.push(el)
  });

};

marker.prototype = {
  /**
    * @desc move markerpoint to centerpoint (x, y) and redraw
    * @param {Number} x - point x coordinate
    * @param {Number} y - point y coordinate
  */
  move: function (x, y) {
    this._rings.forEach((ring) => {
      dom.setAttr(ring, {
        cx: x,
        cy: y
      });
    });

  }
};

module.exports = marker;
