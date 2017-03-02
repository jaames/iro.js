import gradient from "./lib/gradient.js";
import marker from "./marker.js";

let wheel = function (layers, opts) {
  this.ctx = layers.main.ctx;
  this.opts = opts;
  this.marker = new marker(layers.over.ctx, opts.marker);
};

wheel.prototype = {
  draw: function (value) {
    var ctx = this.ctx;
    var opts = this.opts;
    var x = opts.cX,
        y = opts.cY,
        radius = opts.r;
    ctx.clearRect(x - radius, y - radius, radius * 2, radius * 2);
    var segmentAngle = (2 * Math.PI) / 360;
    ctx.lineWidth = radius;
    for (var hue = 0, segment = 0; hue < 360; hue++, segment += segmentAngle) {
      ctx.strokeStyle = "hsl(" + hue + ", 100%, " + value / 2 + "%)";
      ctx.beginPath();
      ctx.arc(x, y, radius / 2, segment - 0.01, segment + segmentAngle + 0.01);
      ctx.stroke();
    }
    ctx.fillStyle = gradient.radial(ctx, x, y, 0, opts.rMax, [
      {at: 0, color: "hsla(0, 0%, " + value + "%, 1)"},
      {at: 1, color: "hsla(0, 0%, " + value + "%, 0)"},
    ]);
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  },
  set: function (color) {
    var opts = this.opts;
    this.draw(color.v);
    var hueAngle = color.h * (Math.PI/180);
    var dist = (color.s / 100) * opts.rMax;
    this.marker.move(opts.cX + dist * Math.cos(hueAngle), opts.cY + dist * Math.sin(hueAngle));
  },
  checkHit: function (x, y) {
    var opts = this.opts;
    var dx = Math.abs(x - opts.cX),
        dy = Math.abs(y - opts.cY);
    return Math.sqrt(dx * dx + dy * dy) < opts.r;
  }
};

module.exports = wheel;
