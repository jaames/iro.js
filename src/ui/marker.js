import dom from "util/dom";

/**
  * @constructor marker UI
  * @param {Object} ctx - canvas 2d context to draw on
  * @param {Object} opts - options
*/
let marker = function (svg, opts) {
  this._rings = [];
  [["#000", 5], ["#fff", 2]].map((ring) => {
    this._rings.push(dom.appendNew(svg, "circle", {
      r: this.opts.r,
      style: "fill:none;stroke-width:"+ ring[0] + ";stroke:" + ring[1]
    }, "SVG"));
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
