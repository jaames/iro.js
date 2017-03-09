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
  this.marker = new marker(layers.over.ctx, opts.marker);
  this.opts = opts;
  this.draw();
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
    var fill;
    if (opts.type == "v") {
      fill = gradient.linear(ctx, x1, y1, x2, y2, [
        {at: 0, color: "#000"},
        {at: 1, color: "#fff"},
      ]);
    }
    // else if (ops.type == "a") {
    //
    // }
    ctx.fillStyle = fill;
    ctx.fill();
  },
  set: function (color, changes) {
    var opts = this.opts;
    var range = opts.range;
    if (changes.v && opts.type == "v") {
      var percent = (color.v / 100);
      this.marker.move(range.min + (percent * range.w), opts.y1 + (opts.h / 2));
    }
  },
  input: function (x, y) {
    var opts = this.opts;
    var range = opts.range;
    var dist = Math.max(Math.min(x, range.max), range.min) - range.min;
    return {
      v: ~~((100 / range.w) * dist),
    };
  },
  checkHit: function (x, y) {
    var opts = this.opts;
    return (x > opts.x1) && (x < opts.x2) && (y > opts.y1) && (y < opts.y2);
  }
};

module.exports = slider;
