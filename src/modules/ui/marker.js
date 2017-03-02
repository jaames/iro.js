let marker = function (ctx, opts) {
  this.ctx = ctx;
  this.opts = opts;
};

marker.prototype = {
  _ring: function (x, y, color, lineWidth) {
    var ctx = this.ctx;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.arc(x, y, this.opts.r, 0, 2 * Math.PI);
    ctx.stroke();
  },
  draw: function (x, y) {
    this._ring(x, y, "#333", 4);
    this._ring(x, y, "#fff", 2);
  },
  move: function (x, y) {
    //var ctx = this.ctx;
    //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.draw(x, y);
  }
};

export default marker;
