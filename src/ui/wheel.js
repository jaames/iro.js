import gradient from "./gradient.js";
import marker from "./marker.js";
import hsl from "../colorModels/hsl.js";

const PI = Math.PI;

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
    var color = hsl.from({h: hue, s: 100, v: value});

    ctx.clearRect(x - radius, y - radius, radius * 2, radius * 2);

    var segmentAngle = (2 * PI) / 360;
    ctx.lineWidth = radius;

    for (var hue = 0, segment = 0; hue < 360; hue++, segment += segmentAngle) {
      ctx.strokeStyle = "hsl(" + hue + "," + color.s + "%," + color.l + "%)";
      ctx.beginPath();
      ctx.arc(x, y, radius / 2, segment - 0.01, segment + segmentAngle + 0.01);
      ctx.stroke();
    }

    ctx.fillStyle = gradient.radial(ctx, x, y, 0, opts.rMax, [
      {at: 0, color: "hsla(0,0%," + value + "%,1)" },
      {at: 1, color: "hsla(0,0%," + value + "%,0)" },
    ]);
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  },
  set: function (color, changes) {
    var opts = this.opts;
    if (changes.v) {
      this.draw(color.v);
    }
    if (changes.h || changes.s) {
      var hueAngle = color.h * (PI/180);
      var dist = (color.s / 100) * opts.rMax;
      this.marker.move(opts.cX + dist * Math.cos(hueAngle), opts.cY + dist * Math.sin(hueAngle));
    }
  },
  input: function (x, y) {
    var opts = this.opts;
    var cX = opts.cX,
        cY = opts.cY,
        radius = opts.r,
        rangeMax = opts.rMax;
    // angle in radians, anticlockwise starting at 12 o'clock
    var angle = Math.atan2(x - cX, y - cY);
    // hue in degrees, clockwise from 3 o'clock
    var hue = 360 - ~~(((angle * (180 / PI)) + 270) % 360);
    // distance from center
    var dist = Math.min(Math.sqrt(Math.pow(cX-x, 2) + Math.pow(cY-y, 2)), rangeMax);
    return {
      h: hue,
      s: ~~((100 / rangeMax) * dist)
    };
  },
  checkHit: function (x, y) {
    var opts = this.opts;
    var dx = Math.abs(x - opts.cX),
        dy = Math.abs(y - opts.cY);
    return Math.sqrt(dx * dx + dy * dy) < opts.r;
  }
};

module.exports = wheel;
