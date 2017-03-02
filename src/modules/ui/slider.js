import gradient from "./lib/gradient.js";
import marker from "./marker.js";

let slider = function (layers, opts) {
  this.ctx = layers.main.ctx;
  opts.x1 = opts.x;
  opts.y1 = opts.y;
  opts.x2 = opts.x + opts.w;
  opts.y2 = opts.y + opts.h;
  opts.range = {
    min: opts.x + opts.r,
    max: opts.x2 - opts.r,
    w: opts.w - (opts.r * 2)
  };
  switch (opts.type) {
    case "v":
      var fill = gradient.linear(this.ctx, opts.x1, opts.y1, opts.x2, opts.y2, [
        {at: 0, color: "#000"},
        {at: 1, color: "#fff"},
      ]);
      break;
    default:
      var fill = null;
  };
  this.type = opts.type;
  this.marker = new marker(layers.over.ctx, opts.marker);
  opts.fill = fill;
  this.opts = opts;
};

slider.prototype = {
  draw: function () {
    var ctx = this.ctx;
    var opts = this.opts;
    var x1 = opts.x1,
        y1 = opts.y1,
        x2 = opts.x2,
        y2 = opts.y2,
        w = opts.w,
        h = opts.h,
        r = opts.r;
    ctx.clearRect(x1, y1, w, h);
    ctx.beginPath();
    ctx.moveTo(x1 + r, y1);
    ctx.arcTo(x2, y1, x2, y2, r);
    ctx.arcTo(x2, y2, x1, y2, r);
    ctx.arcTo(x1, y2, x1, y1, r);
    ctx.arcTo(x1, y1, x2, y1, r);
    ctx.closePath();
    if (opts.fill) {
      ctx.fillStyle = opts.fill;
      ctx.fill();
    }
  },
  set: function (color) {
    var opts = this.opts;
    var range = opts.range;
    this.draw();
    var markerX = 0,
        markerY = opts.y1 + (opts.h / 2);
    switch (this.type) {
      case "v":
        markerX = range.min + ((color.v / 100) * range.w);
        break;
      default:
        break;
    }
    this.marker.move(markerX, markerY);
  },
  checkHit: function (x, y) {
    return (x > this.x1) && (x < this.x2) && (y > this.y1) && (y < this.y2);
  }
};

export default slider;
