module.exports = {
  from: function (hsv) {
    var r, g, b, i, f, p, q, t;
    var h = hsv.h/360, s = hsv.s/100, v = hsv.v/100;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
      case 0: r = v, g = t, b = p; break;
      case 1: r = q, g = v, b = p; break;
      case 2: r = p, g = v, b = t; break;
      case 3: r = p, g = q, b = v; break;
      case 4: r = t, g = p, b = v; break;
      case 5: r = v, g = p, b = q; break;
    }
    return {r: ~~(r * 255), g: ~~(g * 255), b: ~~(b * 255)};
  },
  // https://github.com/qix-/color-convert/blob/master/conversions.js#L97
  to: function (rgb) {
    var r = rgb.r,
        g = rgb.g,
        b = rgb.b;

    var max = Math.max(r, g, b),
        min = Math.min(r, g, b),
        delta = max - min;

    var hue;

    switch (max) {
      case min:
        hue = 0;
        break;
      case r:
        hue = (g - b) / delta;
        break;
      case g:
        hue = 2 + (b - r) / delta;
        break;
      case b:
        hue = 4 + (r - g) / delta;
        break;
    }

    hue *= 60;
    hue = hue > 360 ? 360 : hue < 0 ? hue += 360 : 0;

    return {
      h: ~~hue,
      s: max == 0 ? 0 : (delta / max * 1000) / 10,
      v: ((max / 255) * 1000) / 10
    };
  }
};
