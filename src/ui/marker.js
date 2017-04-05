/**
  * @constructor marker UI
  * @param {Object} ctx - canvas 2d context to draw on
  * @param {Object} opts - options
*/
let marker = function (ctx, opts) {
  this.opts = opts;
  this._ctx = ctx;
  this._last = false;
};

marker.prototype = {
  /**
    * @desc Draw a ring (only used internally)
    * @param {Number} x - centerpoint x coordinate
    * @param {Number} y - centerpoint y coordinate
    * @param {String} color - css color of the ring
    * @param {Number} lineWidth - width of the ring stroke
    * @private
  */
  _ring: function (x, y, color, lineWidth) {
    var ctx = this._ctx;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.arc(x, y, this.opts.r, 0, 2 * Math.PI);
    ctx.stroke();
  },

  /**
    * @desc move markerpoint to centerpoint (x, y) and redraw
    * @param {Number} x - point x coordinate
    * @param {Number} y - point y coordinate
  */
  move: function (x, y) {
    // Get the current position
    var last = this._last;
    var radius = (this.opts.r + 4);
    // Clear the current marker
    if (last) this._ctx.clearRect(last.x - radius, last.y - radius, radius * 2, radius * 2);
    // Redraw at the new coordinates
    this._ring(x, y, "#333", 4);
    this._ring(x, y, "#fff", 2);
    // Update the position
    this._last = {x, y};
  }
};

module.exports = marker;
